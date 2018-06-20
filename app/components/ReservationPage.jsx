import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import firebase from '@firebase/app';
import firestore from '../server.js';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	container: {
		display: 'flex',
		flexDirection: 'column'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
	},
	button: {
		margin: theme.spacing.unit,
	}
});		

class ReservationPage extends React.Component {
  
	constructor(props){
		super(props);
		this.state = { 
			barberList: {},
			selectedBarber: { id: "", name: ""},
			reservationDate: "",
			reservationTime: "",
			clientName: "",
			clientPhone: "",
			barberServices: "",
			selectedService: ""
		},
		this.handleChange = this.handleChange.bind(this)
	}


	componentDidMount() {

    // get all barbers
    var barbers = {};
    firestore.collection("Barbers").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) =>  {        
        barbers[doc.id] = doc.data().name;
      });
      this.setState({ barberList: barbers });
		});
	}

  handleSubmit(event){
		event.preventDefault();    
		
		var resDate = this.state.reservationDate.replace(/-/g, "");
    var barberName = this.state.selectedBarber.name;
    var clientName = this.state.clientName;
    var clientPhone = this.state.clientPhone;
    var service = this.state.selectedService;
    var duration = "30min";
    var favourite = true;
    var slot = this.state.reservationTime
    var status = "waiting";

    // add new reservation in the database
    firestore.collection("Reservations").add({
        barberName: barberName,
        clientName: clientName,
        clientPhone: clientPhone,
        service: service,
        duration: duration,
        favourite: favourite,
				slot: slot,
				date: resDate,
        status: status
    }).then((doc) => {
				var resID = doc.id;
				var availability = {};
        availability[resID] = slot;
				var newResDate = firestore.collection("Barbers").doc(this.state.selectedBarber.id).collection("Availability").doc(resDate.toString());
				// add reserved slot in barber's availability date document
        newResDate.set({
					availability
				}, { merge: true }).then(() => {
            // check if customer already exists in the database
            firestore.collection("Clients").where("clientPhone", "==", clientPhone).get().then((querySnapshot) => {
                if (querySnapshot.size > 0){
                    querySnapshot.forEach(function (doc) {
                        console.log(resID);
                        // add the new reservation document in the collection of reservation documents
                        firestore.collection("Clients").doc(doc.id).collection("reservations").doc(resID).set({
                            barberName: barberName,
                            service: service,
                            duration: duration,
                            favourite: favourite
                        })
                    });
                } else {
                  // customer doesn't exist in the table - create a new one
                  firestore.collection("Clients").add({
                    clientName: clientName,
                    clientPhone: clientPhone
                  }).then((doc) => {
                    firestore.collection("Clients").doc(doc.id).collection("reservations").doc(resID).set({
                      barberName: barberName,
                      service: service,
                      duration: duration,
                      favourite: favourite
                    })
                  })
                };
            });
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
    // create object with id and name of the barber
    if (event.target.name == "selectedBarber"){
      let selBarber = Object.assign({}, this.state.selectedBarber); 
      selBarber.id = event.target.value;
      var index = event.target.selectedIndex;
      selBarber.name = event.target[index].text
      this.setState({ selectedBarber:selBarber });
      
      // get the services which barber provides
      var doc = firestore.collection("Barbers").doc(event.target.value);
      doc.get().then((doc)  => {
        if (doc.exists) {
          this.setState({ barberServices: doc.data().services });
        }else {
          console.log("Barber doesn't exist in the database!");
        }
      });
    }
  }

	render() {
		const { classes } = this.props;
		return (  
			<div className={classes.root}>
				<Grid container spacing={24}>
					<Grid item xs={12}>
							<AppBar position="static">
							<Toolbar>
									<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
									<MenuIcon />
									</IconButton>
									<Typography variant="title" color="inherit" className={classes.flex}>
									Simple Reservation
									</Typography>
									<Button color="inherit">Login</Button>
							</Toolbar>
							</AppBar>
					</Grid>
					<Grid item xs={12}>
						<form className={classes.container} noValidate autoComplete="off" onSubmit={event => this.handleSubmit(event)}>
							<TextField
									id="date"
									label="Date"
									type="date"
									name="reservationDate"
									value={this.state.reservationDate}
									onChange={this.handleChange}
									className={classes.textField}
									InputLabelProps={{
									shrink: true,
									}}
							/>
							<TextField
									id="time"
									label="Time"
									type="time"
									name="reservationTime"
									value={this.state.reservationTime}
									onChange={this.handleChange}
									className={classes.textField}
									InputLabelProps={{
									shrink: true,
									}}
									inputProps={{
									step: 300, // 5 min
									}}
							/>
							<FormControl className={classes.formControl}>
									<InputLabel htmlFor="barberList">Barber/stylist</InputLabel>
									<Select 
									value={this.state.selectedBarber.id} 
									onChange={this.handleChange}
									native={true}
									inputProps={{
											name: 'selectedBarber',
											id: 'index',
									}}>
									{this.state.barberList &&
											Object.keys(this.state.barberList).map((index) => {
											var barberName = this.state.barberList[index];
											return <option key={index} value={index}>{barberName}</option>
											})
									}
									</Select>
							</FormControl>
							<FormControl className={classes.formControl}>
									<InputLabel htmlFor="service">Service</InputLabel>
									<Select
									value={this.state.selectedService}
									onChange={this.handleChange}
									native={true}
									inputProps={{
											name: 'selectedService',
											id: 'index',
									}}
									>
									{this.state.barberServices &&
									this.state.barberServices.map((service,index) => {
											return <option key={index} value={service}>{service}</option>
									})
									}
									</Select>
							</FormControl>
							<TextField
									id="name"
									label="Fullname"
									onChange={this.handleChange}
									className={classes.textField}
									value={this.state.clientName}
									margin="normal"
									name="clientName"
							/>
							<TextField
									id="phone"
									label="Phone number"
									onChange={this.handleChange}
									className={classes.textField}
									value={this.state.clientPhone}
									margin="normal"
									name="clientPhone"
							/>
							<Button className={classes.button} type="submit">Make reservation</Button>
						</form>
					</Grid>
				</Grid>
			</div>
		);
	}
}

ReservationPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReservationPage);





      
      