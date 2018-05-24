import React from 'react';
import { render } from 'react-dom';
import './server.js';

import Hello from './components/Hello';

//Main App
const App = () => (
  <Hello />
);

render(<App />, document.getElementById('app'));