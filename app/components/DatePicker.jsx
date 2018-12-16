/* ToDo
 * add custom navigation arrows
 * change the font and color for the dates and headers in the calendar
 * highlight the date in the calendar
 * fix the issue with selecting another date in the calendar (not today and tomorrow), licking on tomorrow or todat and   clicking back on the "Other" button
 * fix the issue with shifting of the elements(buttons) while selecting one of them
 * show calendar as a modal in the center of reservation page container
 * add background overlay and close button when calendar is opened
 */

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import momentPropTypes from "react-moment-proptypes";
import Button from "@material-ui/core/Button";
import CloseButton from "./CloseButton";
import OutsideClickHandler from "react-outside-click-handler";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  presetButton: {
    borderRadius: 20,
    width: 100,
    display: "inline-block",
    padding: "7px 15px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "700",
    color: "rgb(188, 188, 188)"
  },
  presetButtonLeft: {
    borderRadius: 20,
    width: 100,
    display: "inline-block",
    position: "relative",
    left: "-1em",
    padding: "7px 0px 7px 50px"
  },
  presetButtonRight: {
    borderRadius: 20,
    width: 100,
    display: "inline-block",
    position: "relative",
    right: "-1em",
    padding: "7px 50px 6px 0px"
  },
  selectedPresetButton: {
    backgroundColor: "#d62964",
    color: "#fff",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "500"
  }
});

const defaultProps = {
  autoFocus: false,
  initialDate: null
};

//const closeIcon = customCloseIcon || (<CloseButton />);

const today = moment();
const tomorrow = moment().add(1, "day");
const presets = [
  {
    text: "Today",
    date: today
  },
  {
    text: "Tomorrow",
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
      calendarDate: moment(),
      selectedDate: "",
      addClass: false
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.onCalendarDateChange = this.onCalendarDateChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onDateChange(date) {
    this.setState({ selectedDate: date });
  }

  onCalendarDateChange(date) {
    let y = document.getElementsByClassName("SingleDatePicker_picker")[0];
    this.setState(
      {
        calendarDate: date,
        selectedDate: date.format("MMM D").toString() ,
        addClass: !this.state.addClass
      },
      () => {
        this.state.addClass ? (y.className += " hide") : "";

        this.onFocusChange(false);
      }
    );
  }

  onFocusChange(focused) {
    console.log(focused);
    this.setState({ focused });
  }

  onClose(event) {
    console.log("OnClose event was fired");
  }

  onClearFocus() {
    console.log("Here");
    this.onFocusChange(false);
    //this.setState({ focused: false });
  }

  handleClick() {
    //this.setState({ focused: true });
		console.log("Here");
		this.setState({	selectedDate: moment().format("MMM D").toString() });
				
  }

  //<span>{formattedDate}</span>
  render() {
    const { classes } = this.props;
		const { calendarDate, selectedDate } = this.state;
		console.log(selectedDate);
		console.log(calendarDate);
    //console.log(this.state.date);
    //console.log(presets);

    return (
      <div className={classes.root}>
        <Grid container spacing={24} direction="row">
          <Grid container xs={12}>
            {presets.map(({ text, date }, index) => {
              var formattedDate = date.format("MMM D").toString();

              if (date === selectedDate && index === 0) {
                return (
                  <Grid 
                    item 
                    xs={4}
                    className={
                      date === selectedDate
                        ? [
                            classes.selectedPresetButton,
                            classes.presetButtonLeft
                          ].join(" ")
                        : classes.presetButtonLeft
                    }
                  >
                    <span onClick={() => this.onDateChange(date)}>{text}</span>
                    <br />
                    <span>
                      <b>{formattedDate}</b>
                    </span>
                  </Grid>
                )
              } else if (date === selectedDate && index !== 0){
                return (
                  <Grid 
                    item 
                    xs={4}
                    className={
                      date === selectedDate
                        ? [
                            classes.selectedPresetButton,
                            classes.presetButton
                          ].join(" ")
                        : classes.presetButton
                    }
                  >
                    <span onClick={() => this.onDateChange(date)}>{text}</span>
                    <br />
                    <span>
                      <b>{formattedDate}</b>
                    </span>
                  </Grid>
                );
              }       
              else {
                return (
                  <Grid 
                    item 
                    xs={4}
                    className={classes.presetButton}
                    onClick={() => this.onDateChange(date)}
                  >
                    <span>{text}</span>
                  </Grid>
                );
              }
            })}
						{
							selectedDate === calendarDate.format("MMM D").toString() ? 
							(
                <Grid 
                  item 
                  xs={4}
									className={
										selectedDate  === calendarDate.format("MMM D").toString()
											? [classes.selectedPresetButton, classes.presetButtonRight].join(
													" "
												)
											: classes.presetButtonRight
									}
								>
									<span>Other</span>
									<OutsideClickHandler onOutsideClick={this.onClearFocus}>
										<SingleDatePicker
											date={calendarDate} // momentPropTypes.momentObj or null
											onDateChange={this.onCalendarDateChange} // PropTypes.func.isRequired
											focused={this.state.focused} // PropTypes.bool
											onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
											id="datepicker" // PropTypes.string.isRequired,
											noBorder
											numberOfMonths={1}
											enableOutsideDays
											readOnly={true}
											autoFocus={false}
											verticalHeight={500}
											openDirection="down"
											placeholder="Other"
											keepOpenOnDateSelect={false}
											keepFocusOnInput={false}
											withPortal
											displayFormat="MMM D"
										/>
									</OutsideClickHandler>
								</Grid>
							) : (
                <Grid 
                  item 
                  xs={4} 
                  className={classes.presetButton} 
                  onClick={this.handleClick}
                >
									<span>Other</span>
								</Grid>
							)
						}
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
