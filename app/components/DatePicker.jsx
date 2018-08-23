import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
	root: {
		flexGrow: 1,
	}
});		

class DatePicker extends React.Component {
  
	constructor(props){
		super(props);
		this.state = { 

		}
	}

	render() {
		const { classes } = this.props;
		return (  
			<div className={classes.root}>
				<Grid container spacing={24}>
          <h1>Hello from DatePicker component</h1>
				</Grid>
			</div>
		);
	}
}

DatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePicker);





      
      