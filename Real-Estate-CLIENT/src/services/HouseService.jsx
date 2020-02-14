import axios from 'axios';

const getHouseContract = async () => {
  return await axios({
    method: 'get',
    url: `http://localhost:8080/api/contract/house`
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
  console.log(houseInfo, buyDetail);
  return {
    address: address,
    owner: houseInfo[0],
    location: houseInfo[1],
    area: Number(houseInfo[2]), // Area has BigNumber() type !
    status: houseInfo[3],
    price: buyDetail[0], // Price has BigNumber() type !
    buyable: buyDetail[1]
  }
};

export {getHouseContract, getDeployedHouse, getHouseInfo};
