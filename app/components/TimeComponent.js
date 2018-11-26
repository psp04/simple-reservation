import React from "react";
import Slider from "react-slick";

const arrayList = [500, 530, 600, 700, 800, 900]; 

const settings = {
  className: "center",
  infinite: false,
  slidesToShow: 3,
  swipeToSlide: true
};

class TimeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTime: 0
    };
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(event){
    event.preventDefault();
    this.setState({[event.target.name]: event.target.id }); 

    document.querySelectorAll(".pill").forEach(element => {
      if (element.id === event.target.id){
        document.getElementById(event.target.id).classList.add("pill-active");
      } else {
        document.getElementById(element.id).classList.remove("pill-active");
      }      
    });
  }

  render() {
    return (
      <div>
        <Slider {...settings}>
          {arrayList.map(element => (
            <div key={element}>
              <button
                className="pill"
                id={element}
                name="selectedTime"
                onClick={this.handleSelected}
              >
                {element}
              </button>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default TimeComponent;
