import React from "react";
import Slider from "react-slick";

class TimeComponent extends React.Component {    
    render() {
        const arrayList = [500,530,600,700,800,900];

        const settings = {
            //className: "center",
            infinite: false,
            //centerPadding: "2px",
            slidesToShow: 5,
            swipeToSlide: true
        };

        return (
            <div>
                <h2>Time Component</h2>
                <Slider {...settings}>
                    {arrayList.map((element) => (
                        <div className="pill" key={element}>{element}</div>
                    ))}
                </Slider> 
            </div> 
        );
    }
}

export default TimeComponent;