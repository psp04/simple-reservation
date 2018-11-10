import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReservationPage from './components/ReservationPage';
import AdminDashboard from './components/AdminDashboard';
import TimeComponent from './components/TimeComponent';
import DatePicker from './components/DatePicker';
import './server.js';
import './App.css';


//Main App
const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={ReservationPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/time" component={TimeComponent} />
      <Route path="/datepicker" component={DatePicker} />
    </div>
  </Router>
);

render(<App />, document.getElementById('app'));