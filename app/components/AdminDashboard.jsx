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
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
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
    // loop through selectedReservations
    selectedRes.map((resID) => {
      // get reservation by ID
      firestore.collection("Reservations").doc(resID).get().then((doc) => {
        if (doc.exists) {
          var slot = doc.data().slot;
          var clientPhone = doc.data().clientPhone;
          var resID = doc.id;
          var availabilitySlotField = "availability." + resID.toString();
          // delete reservation by id
          firestore.collection("Reservations").doc(resID).delete().then(() => {
            // find the barber by reservation slot and delete it from availability object
            firestore.collection("Barbers").where(availabilitySlotField, "==", slot).get().then((querySnapshot) => {
              if (querySnapshot.size > 0){
                  querySnapshot.forEach((doc) => {
                      var barberRef = firestore.collection('Barbers').doc(doc.id);
                      var removeReservationID = barberRef.update({
                        [availabilitySlotField] : firebase.firestore.FieldValue.delete()
                      });                
                    });
              } else {
                  console.log('Reservation slot is not found');
              }
              // find the client by his phone number and delete his reservation
              firestore.collection("Clients").where("clientPhone", "==", clientPhone).get().then((querySnapshot) => {
                  if (querySnapshot.size > 0){
                      querySnapshot.forEach((doc) => {
                          firestore.collection("Clients").doc(doc.id).collection("Reservations").doc(resID).delete().then(() => {
                              console.log("Document successfully deleted!");
                          }).catch((error) => {
                              console.error("Error removing document: ", error);
                          });
                      });
                  } else {
                      console.log('Client with number:' + clientPhone + "was not found");
                  }
              });  
            });
          }).catch((error) => {
              console.error("Error removing reservation: ", error);
          });
        }
      }).catch((error) => {
        console.log("Can't get the reservation:", error);
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

class AdminDashboard extends React.Component {
  
  constructor(props){
    super(props);
    this.state = { 
      reservationList: [],
      selectedReservations: []
    }
  }

  componentDidMount() {
    var reservations = [];
    
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


AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminDashboard);




