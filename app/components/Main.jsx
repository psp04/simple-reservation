import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
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
    //flexWrap: 'wrap',
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
});

class Main extends React.Component {
  
  constructor(props){
    super(props);
    this.state = { 
      barberList: {},
      selectedBarber: "",
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
    var barbers = {};
    firestore.collection("Barbers").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) =>  {        
        barbers[doc.id] = doc.data().name;
      });
      this.setState({ barberList: barbers });
    });



  }

  componentWillUnmount() {
    
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name == "selectedBarber"){
      console.log(event.target.value);
      var docRef = firestore.collection("Barbers").doc(event.target.value);
      docRef.get().then((doc)  => {
        if (doc.exists) {
          console.log(doc.data().services)
          this.setState({ barberServices: doc.data().services });
        }else {
          console.log("Barber doesn't exist in the database!");
        }
      });
    }
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
            <Grid item xs={12}>
              <form className={classes.container} noValidate autoComplete="off">
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
                    value={this.state.selectedBarber} onChange={this.handleChange}
                    inputProps={{
                      name: 'selectedBarber',
                      id: 'index',
                    }}>
                    {this.state.barberList &&
                      Object.keys(this.state.barberList).map((index) => {
                        var barberName = this.state.barberList[index];
                        return <MenuItem key={index} value={index}>{barberName}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="service">Service</InputLabel>
                  <Select
                    value={this.state.selectedService}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'selectedService',
                      id: 'index',
                    }}
                  >
                  {this.state.barberServices &&
                    this.state.barberServices.map((service,index) => {
                      return <MenuItem key={index} value={service}>{service}</MenuItem>
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
        </Grid>
      </div>
    );
  }
}


Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);




