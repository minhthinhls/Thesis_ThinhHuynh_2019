import React from 'react';
import {render} from 'react-dom';
import Routes from './routes';

const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  // If a web3 instance is already provided by Meta Mask.
  window.web3 = new Web3(web3.currentProvider);
} else {
  // Specify default instance if no web3 instance provided
  window.web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTP_PROVIDER));
}

web3.eth.defaultAccount = web3.eth.accounts[0]; // Set first accounts as default one !

render(<Routes/>, document.getElementById('app'));

try {
  window.ethereum.on('accountsChanged', function (accounts) {
    web3.eth.defaultAccount = accounts[0];
    render(<Routes/>, document.getElementById('app'));
  });

  window.ethereum.on('networkChanged', function (netId) {
    render(<Routes/>, document.getElementById('app'));
  });
} catch (Exception) {
  console.log(Exception);
}

if (module.hot) {
  module.hot.accept();
}

/* READ MORE ABOUT METAMASK AT:
https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md
https://metamask.github.io/metamask-docs/Advanced_Concepts/Provider_API
https://ethereum.stackexchange.com/questions/42768/how-can-i-detect-change-in-account-in-metamask
 */
