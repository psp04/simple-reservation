import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReservationPage from './components/ReservationPage';
import AdminDashboard from './components/AdminDashboard';
<<<<<<< HEAD
import TimeComponent from './components/TimeComponent';
=======
import DatePicker from './components/DatePicker';
>>>>>>> origin/master
import './server.js';
import './App.css';


//Main App
const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={ReservationPage} />
      <Route path="/admin" component={AdminDashboard} />
<<<<<<< HEAD
      <Route path="/time" component={TimeComponent} />
=======
      <Route path="/datepicker" component={DatePicker} />
>>>>>>> origin/master
    </div>
  </Router>
);

render(<App />, document.getElementById('app'));