/*Notes
 * research possibility to get all images from firestore storage
*/

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import firebase from "@firebase/app";
import firestore from "../server.js";

const settings = {
  infinite: false,
  slidesToShow: 3,
  swipeToSlide: true
};

const styles = {
  service: {
    textAlign: "center",
    width: "50px",
    height: "80px"
  },

  serviceImage: {
    width: "50px"
  },

  serviceName: {
    "font-family":"Roboto, sans-serif",
    "font-weight":"500",
    "font-size":"13px"
  }
};

function arraymove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

class ServicePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedServiceName: "-",
      servicesArray: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    var tempArray = [];
    var middlePositionIndex = 0;
    var currentPosition = 0;
    firestore
      .collection("Services")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var service = doc.data();
          service.id = doc.id;
          tempArray.push(service);
        });
        if (tempArray.length%2 === 0){
          middlePositionIndex = tempArray.length / 2 - 1;
        } else{
          middlePositionIndex = Math.round(tempArray.length / 2) - 1;
        }
        console.log(middlePositionIndex);

        for (var i=0; i < tempArray.length; i++){
          if (tempArray[i].name === "-"){
            currentPosition = i; break;
          }
        }
        arraymove(tempArray,currentPosition,middlePositionIndex);
        console.log(tempArray);
        this.setState({ servicesArray: tempArray });
      });
  }

  handleClick(event) {
    console.log(event.target.id);
    const { id } = event.target;
    this.setState({ selectedServiceName: id });
    this.props.getSelectedService(id);
  }

  render() {
    const { servicesArray, selectedServiceName } = this.state;
    const { classes } = this.props;
    console.log(servicesArray);
    

    return (
      <div>
        <Slider {...settings}>
          {servicesArray.map(service =>
            service.name === "-" ? (
              <div
                key={service.id}
                className={classes.service}
                onClick={this.handleClick}
              >
                <img
                  className={classes.serviceImage}
                  id={service.name}
                  src={service.imgUrl}
                  alt={service.name}
                />
                <span style={{ color: "#364488" }}>{service.name}</span>
              </div>
            ) : (
              <div
                key={service.id}
                className={classes.service}
                onClick={this.handleClick}
              >
                <img
                  className={classes.serviceImage}
                  id={service.name}
                  src={
                    selectedServiceName === service.name
                      ? service.imgSelectedUrl
                      : service.imgUrl
                  }
                  alt={service.name}
                />
                <span
                  className={classes.serviceName}
                  style={
                    selectedServiceName === service.name
                      ? { color: "#D62964" }
                      : { color: "#BCBCBC" }
                  }
                >
                  {service.name}
                </span>
              </div>
            )
          )}
        </Slider>
      </div>
    );
  }
}

ServicePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ServicePicker);
