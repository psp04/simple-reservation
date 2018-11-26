import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import firebase from "@firebase/app";
import firestore from "../server.js";

const styles = theme => ({
  selectList: {
    marginLeft: "25%",
    marginRight: "25%",
    width: "50%"
  }
});

class BarbersDropdownList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBarber: "",
      barberList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getBarbersList = this.getBarbersList.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedServiceName !== prevProps.selectedServiceName) {
      this.getBarbersList(this.props.selectedServiceName);
    }
  }

  getBarbersList(service) {
    var barbers = [];
    var barber = {};
    firestore
      .collection("Barbers")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          barber = Object.assign({}, doc.data());
          barber.id = doc.id;
          if (barber.services.includes(service)) {
            barbers.push(barber);
          }
        });
        this.setState({ barberList: barbers });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { selectedBarber, barberList } = this.state;
    const { classes } = this.props;

    return (
      <Select
        value={selectedBarber}
        onChange={this.handleChange}
        displayEmpty
        name="selectedBarber"
        className={classes.selectList}
      >
        {barberList.map(barber => {
          return <MenuItem key={barber.id}>{barber.name}</MenuItem>;
        })}
      </Select>
    );
  }
}

BarbersDropdownList.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired
};

export default withStyles(styles)(BarbersDropdownList);
