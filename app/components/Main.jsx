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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

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
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 700,
  },
});


const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, selectedRes } = props;

  const handleDelete = () => {
    console.log(selectedRes);
    //var clientName = "Ivan";
    //var resID = "10D4GkyOqQMhsBuvrzb1";
    
    var result = selectedRes.map((resID) => {
      let slot = "";
      let clientPhone = 0;
      firestore.collection("Reservations").doc(resID).get().then((doc) => {
        if (doc.exists) {
          console.log(doc.id);
          firestore.collection("Reservations").doc(doc.id).delete().then(function() {
            var resID = doc.id;
            console.log(resID.toString());
            firestore.collection("Barbers").where("availability." + resID.toString(), "==", 1400).get().then(function (querySnapshot) {
                if (querySnapshot.size > 0){
                    querySnapshot.forEach(function (doc) {
                        console.log(doc.id);
                        // doc.data() is never undefined for query doc snapshots      
                        //var barberRef = firestore.collection('Barbers').doc(doc.id);
                        //var removeReservationID = barberRef.update({
                        //    "availability.10D4GkyOqQMhsBuvrzb1" : firebase.firestore.FieldValue.delete()
                       // });                
                      });
                } else {
                    console.log('no documents found');
                }
              /*firestore.collection("Clients").where("name", "==", clientPhone).get().then(function (querySnapshot) {
                  if (querySnapshot.size > 0){
                      querySnapshot.forEach(function (doc) {
                          // doc.data() is never undefined for query doc snapshots
                          console.log(resID);
                          firestore.collection("Clients").doc(doc.id).collection("reservations").doc(resID).delete().then(function(){
                              console.log("Document successfully deleted!");
                          }).catch(function(error) {
                              console.error("Error removing document: ", error);
                          });
                      });
                  } else {
                      console.log('no documents found');
                  }
              });  */
            });
          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });
        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });

    });



  };

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            All reservations
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Test">
            <IconButton aria-label="Test">
              <DeleteIcon onClick={handleDelete}/>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class Main extends React.Component {
  
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
      selectedService: "",
      reservationList: [],
      selectedReservations: []
    },
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {

    // get all barbers
    var barbers = {};
    var reservations = [];
    firestore.collection("Barbers").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) =>  {        
        barbers[doc.id] = doc.data().name;
      });
      this.setState({ barberList: barbers });
    });

    // get all reservations
    firestore.collection("Reservations").get().then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        var reservation = doc.data();
        reservation.id = doc.id;
        reservations.push(reservation);        
      });
      this.setState({ reservationList: reservations });
    });
  }

  componentWillUnmount() {
    
  }
  
  handleSubmit(event){
    event.preventDefault();    

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
        status: status
    }).then((doc) => {
        var resID = doc.id;
        var availability = {};
        availability[resID] = slot;
        // add reserved slot in barber's availability object
        firestore.collection("Barbers").doc(this.state.selectedBarber.id).set({
            availability
          }, { merge: true }).then(() => {
            // check if customer already exists in the database
            firestore.collection("Clients").where("phone", "==", clientPhone).get().then((querySnapshot) => {
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

  handleClick(event, id) {
    const { selectedReservations } = this.state;
    const selectedIndex = selectedReservations.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedReservations, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedReservations.slice(1));
    } else if (selectedIndex === selectedReservations.length - 1) {
      newSelected = newSelected.concat(selectedReservations.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedReservations.slice(0, selectedIndex),
        selectedReservations.slice(selectedIndex + 1),
      );
    }
    this.setState({ selectedReservations: newSelected });
  };

  isSelected(id){
    this.state.selectedReservations.indexOf(id) !== -1;
  } 

  render(){
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
          <Grid item xs={12}>    
            <EnhancedTableToolbar numSelected={this.state.selectedReservations.length} selectedRes={this.state.selectedReservations}/>            
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ReservationID</TableCell>
                  <TableCell>Barber Name</TableCell>
                  <TableCell>Client Name</TableCell>
                  <TableCell numeric>Client Phone</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell numeric>Slot</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.reservationList.map(res => {
                  const isSelected = this.isSelected(res.id);
                  return (
                    <TableRow 
                      key={res.id} 
                      hover
                      selected={isSelected} 
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      onClick={event => this.handleClick(event,res.id)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell>{res.id}</TableCell>
                      <TableCell>{res.barberName}</TableCell>
                      <TableCell>{res.clientName}</TableCell>
                      <TableCell numeric>{res.clientPhone}</TableCell>
                      <TableCell>{res.service}</TableCell>
                      <TableCell>{res.duration}</TableCell>
                      <TableCell numeric>{res.slot}</TableCell>
                      <TableCell>{res.status}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>
    );
  }
}


Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);




