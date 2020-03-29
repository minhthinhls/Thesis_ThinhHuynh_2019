const fromWei = (value, unit) => {
  if (unit === 'ETH') {
    return toBigNumber(web3.fromWei(value, 'ether'));
  } else if (unit === 'USD') {
    return toBigNumber(web3.fromWei(value, 'ether')).mul(264);
  } else if (unit === 'VND') {
    return toBigNumber(web3.fromWei(value, 'ether')).mul(264).mul(23250);
  }
  throw Error("Please input the Unit !");
};

const toWei = (value, unit) => {
  if (unit === 'ETH') {
    return toBigNumber(web3.toWei(value, 'ether'));
  } else if (unit === 'USD') {
    return toBigNumber(web3.toWei(value, 'ether')).div(264);
  } else if (unit === 'VND') {
    return toBigNumber(web3.toWei(value, 'ether')).div(264).div(23250);
  }
  throw Error("Please input the Unit !");
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

export {fromWei, toWei, toSecond, toBigNumber, is, getBalance};
