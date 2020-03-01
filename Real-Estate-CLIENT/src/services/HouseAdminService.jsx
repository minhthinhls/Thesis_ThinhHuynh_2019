import axios from 'axios';
import {getBaseOption} from './EthereumService';
import {getHouseContract, getHouseInfo} from './HouseService';

const getHouseAdminContract = async () => await axios({
  method: 'get',
  url: `${process.env.API_HTTP_PROVIDER}/contract/houseAdmin`
}).then(response => {
  return response.data;
});

const getDeployedHouseAdmin = async () => {
  const houseAdminContract = await getHouseAdminContract();

  return web3.eth.contract(houseAdminContract['abi'])
    .at(houseAdminContract['networks'][web3.version.network].address);
};

const getHouseAddresses = async () => {
  const baseOption = await getBaseOption();
  const deployedHouseAdmin = await getDeployedHouseAdmin();

  return new Promise((resolve, reject) => {
    deployedHouseAdmin.getAllHouses(baseOption, (error, addresses) => {
      if (error) {
        reject(error);
      }
      resolve(addresses);
    })
  });
};

const getAllHouseInfo = async (_addresses) => {
  const houseContract = await getHouseContract();
  return Promise.all(_addresses.map(_address => {
      return getHouseInfo(houseContract['abi'], _address);
    }
  ));
};

export {getHouseAdminContract, getDeployedHouseAdmin, getHouseAddresses, getAllHouseInfo};
