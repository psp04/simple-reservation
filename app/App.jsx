import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReservationPage from './components/ReservationPage';
import AdminDashboard from './components/AdminDashboard';
import './server.js';


//Main App
const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={ReservationPage} />
      <Route path="/admin" component={AdminDashboard} />
    </div>
  </Router>
);

render(<App />, document.getElementById('app'));