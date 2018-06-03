import React from 'react';
import { render } from 'react-dom';
import './server.js';

import Main from './components/Main';

//Main App
const App = () => (
  <Main />
);

render(<App />, document.getElementById('app'));