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
  } else if (unit === 'Hour') {
    return web3.toBigNumber(value).mul(3600);
  } else if (unit === 'Minute') {
    return web3.toBigNumber(value).mul(60);
  } else if (unit === 'Second') {
    return web3.toBigNumber(value);
  }
  throw Error("Please input the Unit !");
};

const toBigNumber = (value) => {
  return web3.toBigNumber(value);
};

const is = (who) => {
  return web3.eth.defaultAccount === who;
};

const getBalance = async (userAddress) => {
  return await new Promise((resolve, reject) => {
    web3.eth.getBalance(userAddress, (error, _balance) => {
      if (error) {
        reject(error);
      }
      resolve(_balance);
    });
  });
};

export {toUSD, toWei, toSecond, toBigNumber, is, getBalance};
