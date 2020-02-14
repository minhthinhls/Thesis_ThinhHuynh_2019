const toUSD = (wei) => {
  return web3.utils.fromWei(wei, 'ether').toNumber() * 264;
};

const toWei = (usd) => {
  return web3.utils.toWei(usd.toNumber() / 264);
};

export {toUSD, toWei};
