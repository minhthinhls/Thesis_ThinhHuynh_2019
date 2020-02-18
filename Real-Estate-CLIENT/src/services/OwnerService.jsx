import {getBaseOption} from './EthereumService';

const setHouseDetail = async (deployedHouse, houseDetail) => {
  const baseOption = await getBaseOption();
  const args = [
    houseDetail.location,
    houseDetail.area,
    houseDetail.active
  ];
  return await new Promise((resolve, reject) => {
    deployedHouse.setHouseDetail(...args, {
      ...baseOption,
      from: web3.eth.defaultAccount
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

const setBuyPayment = async (deployedHouse, buyDetail) => {
  const baseOption = await getBaseOption();
  const args = [
    buyDetail.price,
    buyDetail.buyable
  ];
  return await new Promise((resolve, reject) => {
    deployedHouse.setBuyPayment(...args, {
      ...baseOption,
      from: web3.eth.defaultAccount
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

const resetRentalContract = async (deployedHouse) => {
  const baseOption = await getBaseOption();
  return await new Promise((resolve, reject) => {
    deployedHouse.resetRentalContract({
      ...baseOption,
      from: web3.eth.defaultAccount
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

const setRentalPayment = async (deployedHouse, rentalDetail) => {
  const baseOption = await getBaseOption();
  const args = [
    rentalDetail.rentalPaymentCharge,
    rentalDetail.rentalPaymentStep,
    rentalDetail.rentalDuration,
    rentalDetail.rentable
  ];
  return await new Promise((resolve, reject) => {
    deployedHouse.setRentalPayment(...args, {
      ...baseOption,
      from: web3.eth.defaultAccount
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

const setRentable = async (deployedHouse, rentable) => {
  const baseOption = await getBaseOption();
  return await new Promise((resolve, reject) => {
    deployedHouse.setRentable(rentable, {
      ...baseOption,
      from: web3.eth.defaultAccount
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

const resetInstallmentContract = async (deployedHouse) => {
  const baseOption = await getBaseOption();
  return await new Promise((resolve, reject) => {
    deployedHouse.resetInstallmentContract({
      ...baseOption,
      from: web3.eth.defaultAccount
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

const setInstallmentPayment = async (deployedHouse, installmentDetail) => {
  const baseOption = await getBaseOption();
  const args = [
    installmentDetail.repayRate,
    installmentDetail.interestRate,
    installmentDetail.installmentPaymentStep,
    installmentDetail.installmentDuration,
    installmentDetail.installable,
    installmentDetail.acceptAddress
  ];
  return await new Promise((resolve, reject) => {
    deployedHouse.setInstallmentPayment(...args, {
      ...baseOption,
      from: web3.eth.defaultAccount
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

const setInstallable = async (deployedHouse, installable) => {
  const baseOption = await getBaseOption();
  return await new Promise((resolve, reject) => {
    deployedHouse.setInstallable(installable, {
      ...baseOption,
      from: web3.eth.defaultAccount
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

export {
  setHouseDetail, setBuyPayment,
  resetRentalContract, setRentalPayment, setRentable,
  resetInstallmentContract, setInstallmentPayment, setInstallable
};
