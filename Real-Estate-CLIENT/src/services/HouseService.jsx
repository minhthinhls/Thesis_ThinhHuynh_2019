import axios from 'axios';

const getHouseContract = async () => {
  return await axios({
    method: 'get',
    url: `${process.env.API_HTTP_PROVIDER}/contract/house`
  }).then(response => {
    return response.data;
  });
};

const getDeployedHouse = async (abi, address) => {
  return await web3.eth.contract(abi).at(address);
};

const getHouseInfo = async (abi, address) => {
  const deployedHouse = await getDeployedHouse(abi, address);
  const houseInfo = await new Promise((resolve, reject) => {
    deployedHouse.getHouseDetail.call((error, _houseDetail) => {
      if (error) {
        reject(error);
      }
      resolve(_houseDetail);
    })
  });
  const buyDetail = await new Promise((resolve, reject) => {
    deployedHouse.getBuyDetail.call((error, _buyDetail) => {
      if (error) {
        reject(error);
      }
      resolve(_buyDetail);
    })
  });
  const rentalDetail = await new Promise((resolve, reject) => {
    deployedHouse.getRentalDetail.call((error, _rentalDetail) => {
      if (error) {
        reject(error);
      }
      resolve(_rentalDetail);
    })
  });
  const installmentDetail = await new Promise((resolve, reject) => {
    deployedHouse.getInstallmentDetail.call((error, _installmentDetail) => {
      if (error) {
        reject(error);
      }
      resolve(_installmentDetail);
    })
  });
  return {
    address: address,
    owner: houseInfo[0],
    location: houseInfo[1],
    area: Number(houseInfo[2]), // Area has BigNumber() type !
    active: houseInfo[3],
    price: buyDetail[0], // Price has BigNumber() type !
    buyable: buyDetail[1],
    rentalDueDate: rentalDetail[0],
    rentalPaymentDate: rentalDetail[1],
    rentalPaymentCharge: rentalDetail[2],
    rentalPaymentStep: rentalDetail[3],
    rentalDuration: rentalDetail[4],
    renter: rentalDetail[5],
    rented: rentalDetail[6],
    rentable: rentalDetail[7],
    installmentDueDate: installmentDetail[0],
    installmentPaymentDate: installmentDetail[1],
    installmentPaymentCharge: installmentDetail[2],
    installmentPaymentStep: installmentDetail[3],
    installmentDuration: installmentDetail[4],
    interestRate: installmentDetail[5],
    repayRate: installmentDetail[6],
    installmentBuyer: installmentDetail[7],
    inProcess: installmentDetail[8],
    installable: installmentDetail[9],
  }
};

export {getHouseContract, getDeployedHouse, getHouseInfo};
