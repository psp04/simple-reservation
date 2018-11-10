/* Todo 
 * get services array from firebase database
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

const settings = {
  infinite: false,
  slidesToShow: 3,
  swipeToSlide: true
};

/*const data = [
  { name: "shortCut",
    imgPath: ".../services/img.jpg"
  },
  { name: "shortCut",
    imgPath: ".../services/img.jpg",
    selectSVG: ".../services/img-selected.jpg"
  },
  { name: "shortCut",
  imgPath: ".../services/img.jpg"
  }
]

const ServicePicker = (props) => {
  const {handleClick} = props;
  
  return (
    data.map((element,index) => {
      var imgPath = "";
      selectedService === element.name ? imgPath = element.imgPath : imgPath = element.selectSVG;
      <div onClick={props.handleClick(() => {element.name})}>
        <img src={require(imgPath)} />
      </div>
    })
 
  );

}


// reservaion page

handleClick(index){
 this.setState({selectedServiceType: index});
}

render(){
  return (
    <ServicePicker handleClick={this.handleClick} selectedService={this.state.selectedServiceType}/>
  );
} */



class ServicePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedService: undefined
    };
  }

  render() {
    return (
      <div>
        <h2>Hello from ServicePicker component!</h2>
        <Slider {...settings}>
          <div>
            <img src={require("../../assets/services/buzz.svg")} />
          </div>
          <div>
            <img src={require("../../assets/services/long.svg")} />
          </div>
          <div>
            <img src="http://cdn.earthporm.com/wp-content/uploads/2015/07/sleeping-kitties-1__6051.jpg" />
          </div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx4XyTH9hgoLmejDZr78piNVmL8v1zPumShStyGlrjYoh4HrYL" />
          </div>
          <div>
            <img src="https://www.yourcat.co.uk/images/legacy/stories/introducing_kittens_main.jpg" />
          </div>
          <div>
            <img src="https://snowyswan.com/wp-content/uploads/2016/02/free-kittens-in-the-box.jpg" />
          </div>
        </Slider>
      </div>
    );
  }
}

export default ServicePicker;
