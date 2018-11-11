/* Todo
 * loop through the services and check if some div was selected
 * if some div was selected then update the current image source
 * keep selectedService type as a state in the ReservationPage component
 * import and render the ServicePicker component inside the ReservationPage component
 * refactor the barbers dropdown component
 * get the barbers from firebase database to populate the dropdown list
 * connect servicepicker component and barber component to update dropdown selection options depending on the selectedService type
 */

import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import firebase from "@firebase/app";
import firestore from "../server.js";

const settings = {
  infinite: false,
  slidesToShow: 3,
  swipeToSlide: true
};

class ServicePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedService: undefined,
      servicesArray: []
    };
  }

  componentDidMount() {
    var tempArray = [];
    firestore
      .collection("Services")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var service = doc.data();
          service.id = doc.id;
          tempArray.push(service);
        });
        this.setState({ servicesArray: tempArray });
      });
  }

  render() {
    const { servicesArray } = this.state;

    return (
      <div>
        {servicesArray.map(item => {
          console.log(item);
        })}
      </div>
    );
  }
}

export default ServicePicker;
