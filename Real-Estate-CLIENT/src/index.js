import React from 'react';
import {render} from 'react-dom';
import Routes from './routes';

const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  // If a web3 instance is already provided by Meta Mask.
  window.web3 = new Web3(web3.currentProvider);
} else {
  // Specify default instance if no web3 instance provided
  window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

render(<Routes/>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
