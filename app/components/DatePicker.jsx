/* ToDo
*	add custom navigation arrows
* add react-outside-click-handler library 
* add styles to the presets buttons
* Show date at the bottom of the text
* highlight the date in the calendar from the state
*/

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import Button from '@material-ui/core/Button';
import CloseButton from './CloseButton';
import OutsideClickHandler from 'react-outside-click-handler';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	presetButton: {
		backgroundColor: "red",
		borderRadius: 20,
		width: 100
	}
});

const defaultProps = {
	autoFocus: false,
	initialDate: null
}

//const closeIcon = customCloseIcon || (<CloseButton />);

const today = moment();
const tomorrow = moment().add(1, 'day');
const presets = [{
	text: 'Today',
	date: today
},
{
	text: 'Tomorrow',
	date: tomorrow
}
];

class DatePicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			date: props.initialDate,
			//focused: props.autoFocus
			focused: false,
			calendarDate: "",
			addClass: false
		};
		this.onDateChange = this.onDateChange.bind(this);
		this.onFocusChange = this.onFocusChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onClearFocus = this.onClearFocus.bind(this);
		this.onCalendarDateChange = this.onCalendarDateChange.bind(this);
	}

	onDateChange(date) {
		this.setState({ calendarDate: date });
	}

	onCalendarDateChange(date) {
		this.setState({ calendarDate: date, addClass: !this.state.addClass});
		this.onClearFocus();
		//console.log(ReactDOM.findDOMNode(2));
		let y = document.getElementsByClassName('SingleDatePicker_picker')[0];
		console.log(this.state.addClass);
    if (this.state.addClass) {
			y.className += " hide";
		}
		

	}

	onFocusChange(focused) {
		console.log(focused);
		this.setState({ focused });
	}

	onClose(event){
		console.log("OnClose event was fired");
	}

	onClearFocus(){
		console.log("Here");
		this.onFocusChange(false);
		//this.setState({ focused: false });
	}

	render() {
		const { classes } = this.props;
		console.log(this.state.date);
		console.log(presets);

		return (
			
			<div className={classes.root}>
				<Grid container spacing={24} direction='row'>
					<Grid item xs={12}>
						{presets.map(({ text, date }) => {
							var formattedDate = date.format("MMM D").toString();
							return <div className={classes.presetButton} onClick={() => this.onDateChange(date)}>
							<div style={{padding: 20}}>	
								<span>{text}</span><br/>
								<span>{formattedDate}</span>
							</div>
							</div>
						})}
						<OutsideClickHandler onOutsideClick={this.onClearFocus}>
							<SingleDatePicker
								date={this.state.calendarDate} // momentPropTypes.momentObj or null
								onDateChange={this.onCalendarDateChange} // PropTypes.func.isRequired
								focused={this.state.focused} // PropTypes.bool
								onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
								id="datepicker" // PropTypes.string.isRequired,
								noBorder
								numberOfMonths={1}
								enableOutsideDays
								readOnly={true} 
								autoFocus={false}
								//onClose={this.onClose}
								verticalHeight={500}
								openDirection="down"
								placeholder="Other"
								keepOpenOnDateSelect={false}
								keepFocusOnInput={false}
								//onClick={this.onClearFocus}
								//onOutsideClick={this.onClearFocus}
								withPortal={false}
								withFullScreenPortal={false}
							/> 
          	</OutsideClickHandler>
					</Grid>
				</Grid>
			</div>
		);
	}
}

DatePicker.propTypes = {
	classes: PropTypes.object.isRequired,
	onDateChange: PropTypes.func.isRequired,
	onOutsideClick: PropTypes.func.isRequired,
	onFocusChange: PropTypes.func.isRequired,
	initialDate: momentPropTypes.momentObj
};

export default withStyles(styles)(DatePicker);

