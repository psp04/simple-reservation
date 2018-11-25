import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReservationPage from './components/ReservationPage';
import AdminDashboard from './components/AdminDashboard';
import ServicePicker from './components/ServicePicker';
import TimeComponent from './components/TimeComponent';
import DatePicker from './components/DatePicker';
import BarbersDropdownList from './components/BarbersDropdownList';
import './server.js';
import './App.css';

//Main App
const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={ReservationPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/services" component={ServicePicker} />
      <Route path="/time" component={TimeComponent} />
      <Route path="/datepicker" component={DatePicker} />
      <Route path="/barbers" component={BarbersDropdownList} />
    </div>
  </Router>
);

render(<App />, document.getElementById('app'));