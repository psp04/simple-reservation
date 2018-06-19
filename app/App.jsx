import React from 'react';
import { render } from 'react-dom';
import './server.js';

import ReservationPage from './components/ReservationPage';

//Main App
const App = () => (
  <ReservationPage />
);

render(<App />, document.getElementById('app'));