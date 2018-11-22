import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TimeComponent from "./TimeComponent";
import ServicePicker from "./ServicePicker";
import BarbersDropdownList from "./BarbersDropdownList";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
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
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <ServicePicker getSelectedService={this.getSelectedService} />
            </Paper>
            <Paper className={classes.paper}>
              <BarbersDropdownList selectedServiceName={selectedServiceName}/>
            </Paper>
            <Paper className={classes.paper}>
              <TimeComponent />
            </Paper>
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
