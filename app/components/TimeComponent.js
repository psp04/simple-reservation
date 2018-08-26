import React from "react";
import Slider from "react-slick";

class TimeComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            selectedTime: undefined
        }

        this.handleSelected = (event) => {
            const selectedTime = parseInt(event.target.id);
            //console.log(event.target.className);

            this.setState(() => ({ selectedTime }))
            document.querySelectorAll(".pill").forEach((element) => {
                document.getElementById(element.id).classList.remove("pill-active");
            });
            document.getElementById(event.target.id).classList.add("pill-active"); 
        }
    }

    render() {
        const arrayList = [500,530,600,700,800,900];

        const settings = {
            //className: "center",
            infinite: false,
            //centerPadding: "2px",
            slidesToShow: 3,
            swipeToSlide: true
        };

        return (
            <div>
                <h2>Time Component</h2>
                <Slider {...settings}>
                    {arrayList.map((element) => (
                        <div key={element}>
                            <button className="pill" 
                                    id={element}
                                    onClick={this.handleSelected}
                            >{element}</button>
                        </div>
                    ))}
                </Slider> 
                <h4>This is the current State: {this.state.selectedTime}</h4>
            </div> 
        );
    }
}

export default TimeComponent;