/* ToDo
*	add custom navigation arrows
*

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

const styles = theme => ({
	root: {
		flexGrow: 1,
	}
});

const defaultProps = {
	autoFocus: false,
	initialDate: null
}

const today = moment();
const tomorrow = moment().add(1, 'day');
const presets = [{
	text: 'Today',
	date: today
},
{
	text: 'Tomorrow',
	date: tomorrow
},
{
	text: moment().add(2, 'days').format("D"),
	date: moment().add(2, 'days')
},
{
	text: moment().add(3, 'days').format("D"),
	date: moment().add(3, 'days')
},
{
	text: moment().add(4, 'days').format("D"),
	date: moment().add(4, 'days')
}

];

class DatePicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			date: props.initialDate,
			focused: props.autoFocus
		};
		this.onDateChange = this.onDateChange.bind(this);
		this.onFocusChange = this.onFocusChange.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	onDateChange(date) {
		this.setState({ date });
	}

	onFocusChange(focused) {
		this.setState({ focused });
	}

	onClose(event){
		console.log("OnClose event was fired");
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Grid container spacing={24} direction='row'>
					<Grid item xs={12}>
						{presets.map(({ text, date }) => {
							return <Button onClick={() => this.onDateChange(date)}>{text}</Button>
						})}
						<SingleDatePicker
							date={this.state.date} // momentPropTypes.momentObj or null
							onDateChange={this.onDateChange} // PropTypes.func.isRequired
							focused={this.state.focused} // PropTypes.bool
							onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
							id="datepicker" // PropTypes.string.isRequired,
							showDefaultInputIcon
							noBorder
							orientation="vertical"
							autoFocus
							onClose={this.onClose}
							verticalHeight={500}
							openDirection="down"
							onOutsideClick
							
						/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

DatePicker.propTypes = {
	classes: PropTypes.object.isRequired,
	onDateChange: PropTypes.func.isRequired,
	onFocusChange: PropTypes.func.isRequired,
	initialDate: momentPropTypes.momentObj
};

export default withStyles(styles)(DatePicker);






