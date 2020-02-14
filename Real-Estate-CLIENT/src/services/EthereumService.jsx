const getBaseOption = async () => {
  return {
    gas: process.env.GAS_LIMIT,
    gasPrice: await new Promise((resolve, reject) => {
      web3.eth.getGasPrice((error, _gasPrice) => {
        if (error) {
          reject(error);
        }
        resolve(_gasPrice);
      })
    })
  }
};

export {getBaseOption};
