import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  container: {
    display: 'flex',
    //flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Main extends React.Component {
  
  constructor(props){
    super(props);
    this.state = { barberList: []}
  
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    
  }

  render(){
    const { classes } = this.props;
    return (
      
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <AppBar position="static">
              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Simple Reservation
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
            <Grid item xs={12}>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  defaultValue="2018-06-03"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="time"
                  label="Time"
                  type="time"
                  defaultValue="10:00"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="barberId">Barber/stylist</InputLabel>
                  <Select
                    value=""
                    inputProps={{
                      name: 'barberName',
                      id: 'barberId',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Missy</MenuItem>
                    <MenuItem value={20}>John</MenuItem>
                    <MenuItem value={30}>Becca</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="serviceId">Service</InputLabel>
                  <Select
                    value=""
                    inputProps={{
                      name: 'serviceName',
                      id: 'serviceId',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Long cut</MenuItem>
                    <MenuItem value={20}>Short cut</MenuItem>
                    <MenuItem value={30}>Trim</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="name"
                  label="Fullname"
                  className={classes.textField}
                  value=""
                  margin="normal"
                />
                <TextField
                  id="phone"
                  label="Phone number"
                  className={classes.textField}
                  value=""
                  margin="normal"
                />
                <Button className={classes.button} type="submit">Make reservation</Button>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}


Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);




