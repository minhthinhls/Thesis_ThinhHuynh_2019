const toUSD = (wei) => {
  return web3.fromWei(wei, 'ether').toNumber() * 264;
};

const toWei = (usd) => {
  return web3.toWei(usd.toNumber() / 264);
};

const toSecond = (value, unit) => {
  if (unit === 'Year') {
    return web3.toBigNumber(value).mul(86400).mul(365);
  } else if (unit === 'Month') {
    return web3.toBigNumber(value).mul(86400).mul(30);
  } else if (unit === 'Week') {
    return web3.toBigNumber(value).mul(86400).mul(7);
  } else if (unit === 'Day') {
    return web3.toBigNumber(value).mul(86400);
  }
};

const toBigNumber = (value) => {
  return web3.toBigNumber(value);
};

const is = (who) => {
  return web3.eth.defaultAccount === who;
};

export {toUSD, toWei, toSecond, toBigNumber, is};
