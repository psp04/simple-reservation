import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import firebase from "@firebase/app";
import firestore from "../server.js";

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
    console.log(barberList);
    return (
      <div>
        <FormControl>
          <Select
            value={selectedBarber}
            onChange={this.handleChange}
            displayEmpty
            name="selectedBarber"
          >
            {barberList.map(barber => {
              return <MenuItem key={barber.id}>{barber.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    );
  }
}

BarbersDropdownList.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired
};

export default BarbersDropdownList;
