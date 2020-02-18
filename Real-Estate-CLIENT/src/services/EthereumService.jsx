const getBaseOption = async () => {
  return {
    gas: await new Promise((resolve, reject) => {
      web3.eth.getBlock('latest', (error, _block) => {
        if (error) {
          reject(error);
        }
        resolve(_block.gasLimit);
      })
    }),
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
