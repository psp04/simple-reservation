import React from 'react';
import ReactDOM from 'react-dom';
import Slider from "react-slick";

class ServicePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedService: undefined
        }
    }

    render() {
        const settings = {
            infinite: false,
            slidesToShow: 3,
            swipeToSlide: true
        };

        return (
            <div>
                <h2>Hello from ServicePicker component!</h2>
                <Slider {...settings}>
                    <div>
                        <img src="assets/services/buzz.svg" />
                    </div>
                    <div>
                        <img src="https://kittenrescue.org/wp-content/uploads/2017/03/KittenRescue_KittenCareHandbook.jpg" />
                    </div>
                    <div>
                        <img src="http://cdn.earthporm.com/wp-content/uploads/2015/07/sleeping-kitties-1__6051.jpg" />
                    </div>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx4XyTH9hgoLmejDZr78piNVmL8v1zPumShStyGlrjYoh4HrYL"  />
                    </div>
                    <div>
                        <img src="https://www.yourcat.co.uk/images/legacy/stories/introducing_kittens_main.jpg"/>
                    </div>
                    <div>
                        <img src="https://snowyswan.com/wp-content/uploads/2016/02/free-kittens-in-the-box.jpg"  />
                    </div>
                </Slider>
            </div>
        );
    }
}

export default ServicePicker;
