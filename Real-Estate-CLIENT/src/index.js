import React from 'react';
import {render} from 'react-dom';
import Routes from './routes';

const Web3 = require('web3');

try {
  if (typeof web3 !== 'undefined') {
    /* If a web3 instance is already provided by MetaMask Browser Extension. */
    window.web3 = new Web3(web3.currentProvider);
  } else {
    /* Injecting new Web3 instance with customized HTTP Provider at
     * http://localhost:8545 if no web3 instance provided */
    window.web3 = new Web3(new Web3.providers.HttpProvider(process.env.GANACHE_HTTP_PROVIDER));
  }
  web3.eth.defaultAccount = web3.eth.accounts[0]; // Set first accounts as default one !
} catch (Exception) {
  console.log(Exception);
}

render(<Routes/>, document.getElementById('app'));

try {
  /* Add Event Listeners for MetaMask Browser Extension */
  window.ethereum.on('accountsChanged', function (accounts) {
    web3.eth.defaultAccount = accounts[0];
    render(<Routes/>, document.getElementById('app'));
  });
  window.ethereum.on('networkChanged', function (networkID) {
    render(<Routes/>, document.getElementById('app'));
  });
} catch (Exception) {
  console.log("You have not installed and opened MetaMask Extension yet!", Exception);
}

if (module.hot) {
  module.hot.accept();
}

/* READ MORE ABOUT METAMASK AT:
 * https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md
 * https://metamask.github.io/metamask-docs/Advanced_Concepts/Provider_API
 * https://ethereum.stackexchange.com/questions/42768/how-can-i-detect-change-in-account-in-metamask
 */

/* READ MORE ABOUT WEB3 VERSION 0.20.0 AT:
 * https://github.com/ethereum/wiki/wiki/JavaScript-API
 */
