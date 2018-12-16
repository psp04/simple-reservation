/* Todo
* Error validation and displaying error inside FormHelperText
* add continue button with submit type
* get current state values from each component to use in handleSubmit function
* the default icon for ServicePicker should be in the middle of the slick slider
* add default state "-" for dropdown list with blue highlight
* highlight the today date as default state for datePicker
* add background to the reservationPage
* use values for the firebase for the TimeComponent
*/

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TimeComponent from "./TimeComponent";
import ServicePicker from "./ServicePicker";
import BarbersDropdownList from "./BarbersDropdownList";
import DatePicker from "./DatePicker";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  form: {
    overflow: "hidden",
    backgroundColor: "#99ffcc",
    height: "660px",
    width: "375px",
    position: "relative"
  },
  formLabel: {
    color: "#364488",
    fontSize: "13px",
    fontFamily: "Roboto",
    fontStyle: "italic",    
    margin:"25px 0",
    textAlign: "center"
  },
  formControl: {
    width:" 100%"
  },
  continueButton: {
    backgroundColor: "#364488",
    borderRadius: "0px",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    padding: "20px 0"
  }
});

class ReservationPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedServiceName: ""
    }
    this.getSelectedService = this.getSelectedService.bind(this);
  }

  getSelectedService(name) {
    this.setState({ selectedServiceName: name });
  }

  render() {
    const { classes } = this.props;
    const { selectedServiceName } = this.state;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs />
          <Grid item xs={3} className={classes.form}>
            <form>
              <FormControl className={classes.formControl}>
                <FormLabel className={classes.formLabel}>Tap to pick a day</FormLabel>
                <DatePicker />
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel className={classes.formLabel}>What service would you like</FormLabel>
                <ServicePicker getSelectedService={this.getSelectedService} />          
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel className={classes.formLabel}>Choose your stylist</FormLabel>
                <BarbersDropdownList selectedServiceName={selectedServiceName}/>              
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel className={classes.formLabel}>Set a time</FormLabel>
                <TimeComponent />              
              </FormControl>
              <Button variant="contained" color="primary" type="submit" className={classes.continueButton}>
                continue
              </Button>
            </form>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}

ReservationPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReservationPage);
