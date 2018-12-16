import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import firebase from "@firebase/app";
import firestore from "../server.js";


const styles = theme => ({
  outlinedInputRoot: {
    marginLeft: "30%",
    marginRight: "30%",
    width: "40%"
  },
  notchedOutlineInput: {
    borderColor: "#364488 !important",
    borderRadius: "8px"
  },
  selectMenu: {
    color: "#364488",
    borderColor: "#364488",
    padding: "10px 0px 10px 15px"
  },
  selectMenuSelected: {
    color: "#d62964",
    borderColor: "#364488",
    padding: "10px 0px 10px 15px",
    fontWeight: "500"
  },
  
  icon: {
    top: "calc(50% - 20px)",
    color: "#364488",
    fontSize: "40px"
  },
  iconSelected: {
    top: "calc(50% - 20px)",
    color: "#d62964",
    fontSize: "40px"
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
        variant="outlined"
        input={              
          <OutlinedInput
            name="selectedBarber"
            id="selectedBarberId"
            classes={{
              root: classes.outlinedInputRoot,
              notchedOutline: classes.notchedOutlineInput
            }}
          />
        }
        displayEmpty
        name="selectedBarber"
        
        classes={{
          selectMenu: selectedBarber === "" ? classes.selectMenu : classes.selectMenuSelected,
          icon: selectedBarber === "" ? classes.icon : classes.iconSelected
        }}
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
