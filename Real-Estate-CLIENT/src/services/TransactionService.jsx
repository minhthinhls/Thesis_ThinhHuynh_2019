import {getBaseOption} from './EthereumService';

const buyHouse = async (deployedHouse, price) => {
  const baseOption = await getBaseOption();
  return await new Promise((resolve, reject) => {
    deployedHouse.buy({
      ...baseOption,
      from: web3.eth.defaultAccount,
      value: price // $price has BigNumber() type !
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

const rentHouse = async (deployedHouse, rentalPaymentCharge) => {
  const baseOption = await getBaseOption();
  return await new Promise((resolve, reject) => {
    deployedHouse.rent({
      ...baseOption,
      from: web3.eth.defaultAccount,
      value: rentalPaymentCharge // $rentalPaymentCharge has BigNumber() type !
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

const chargeRentalContract = async (deployedHouse, rentalPaymentCharge) => {
  const baseOption = await getBaseOption();
  return await new Promise((resolve, reject) => {
    deployedHouse.chargeRentalContract({
      ...baseOption,
      from: web3.eth.defaultAccount,
      value: rentalPaymentCharge // $rentalPaymentCharge has BigNumber() type !
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

const installmentPayment = async (deployedHouse, installmentPaymentCharge) => {
  const baseOption = await getBaseOption();
  return await new Promise((resolve, reject) => {
    deployedHouse.installmentPayment({
      ...baseOption,
      from: web3.eth.defaultAccount,
      value: installmentPaymentCharge // $installmentPaymentCharge has BigNumber() type !
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

const chargeInstallmentContract = async (deployedHouse, installmentPaymentCharge) => {
  const baseOption = await getBaseOption();
  return await new Promise((resolve, reject) => {
    deployedHouse.chargeInstallmentContract({
      ...baseOption,
      from: web3.eth.defaultAccount,
      value: installmentPaymentCharge // $installmentPaymentCharge has BigNumber() type !
    }, (error, txHash) => {
      if (error) {
        reject(error);
      }
      resolve(txHash);
    })
  });
};

export {
  buyHouse, rentHouse, chargeRentalContract,
  installmentPayment, chargeInstallmentContract
};
