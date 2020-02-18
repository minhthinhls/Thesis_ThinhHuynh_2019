/* System Dependencies */
const fs = require('fs');
const root = require('app-root-path');
require('dotenv').config({path: `${root}/.env`});
/* Command Line Dependencies */
const argv = require('minimist')(process.argv.slice(2));
/* Ethereum Dependencies */
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(
  process.env.MNEMONIC, // The 12 words phrase required to create accounts !
  argv['network'] === '3' ?
    process.env.ROPSTEN + process.env.INFURA_KEY :
    process.env.GANACHE_HTTP_PROVIDER, // The HTTP Provider Endpoint !
  0, // The specified index where HD Wallet manage the address at !
  10, // Number of addresses initialized by HD Wallet !
  )
;
const web3 = new Web3(provider);
/* Contract Dependencies */
const houseAdmin = require('../../build/contracts/HouseAdmin');
const images = fs.readdirSync(`${root}/src/images/houses/`);

/* Web3 has version of 2.0.0-alpha, thus the contract interactions
 * within Web3 are different from web3@0.20.0 in Client Side ! */
const deployHouse = async (args, networkID, image, defaultAccount = provider.addresses[0]) => {
  const deployedHouseAdmin = new web3.eth.Contract(houseAdmin['abi'],
    houseAdmin['networks'][networkID].address);
  const from = `${root}/src/images/houses/${image}`;
  try {
    await new Promise((resolve, reject) => {
      deployedHouseAdmin.methods.sellHouse(...args).call({
        from: defaultAccount
      }, (error, address) => {
        if (!error) {
          fs.copyFile(from, `${root}/public/images/${address}.jpg`, (error) => {
            if (!error) {
              resolve(address);
            } else {
              reject(error);
            }
          });
        } else {
          resolve(error);
        }
      });
    });
    await new Promise((resolve, reject) => {
      deployedHouseAdmin.methods.sellHouse(...args).send({
        from: defaultAccount
      }, (error, hash) => {
        if (!error) {
          console.log("Transaction Hash:", hash);
          resolve(hash);
        } else {
          reject(error);
        }
      })
    });
  } catch (Exception) {
    console.log(Exception);
  }
};

/* This function is used to create house instances for testing purpose ! */
const deployAllHouses = async (networkID = '5777', images) => {
  await deployHouse(['Nha Trang, Khanh Hoa', 4, 200], networkID, images[0]);
  await deployHouse(['Tuy Hoa, Phu Yen', 2, 100], networkID, images[1], provider.addresses[1]);
  await deployHouse(['Ho Chi Minh City', 3, 150], networkID, images[2]);
  await deployHouse(['Bien Hoa, Dong Nai', 1, 50], networkID, images[3], provider.addresses[1]);
  await deployHouse(['Quy Nhon, Binh Dinh', 5, 250], networkID, images[4]);
  provider.engine.stop();
};

deployAllHouses(argv['n'] || argv['network'], images);
