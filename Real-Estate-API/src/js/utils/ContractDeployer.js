/* System Dependencies */
const fs = require('fs');
const path = require('path');
const root = require('app-root-path');
require('dotenv').config({path: `${root}/.env`});
/* Command Line Dependencies */
const argv = require('minimist')(process.argv.slice(2));
/* Ethereum Dependencies */
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    argv['network'] === '3' ?
        process.env.ROPSTEN + process.env.INFURA_KEY :
        process.env.GANACHE_HTTP_PROVIDER
    )
;
const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};
const web3 = new Web3(provider);
/* Extra Dependencies */
const createEmptyFolder = require('./ContractCompiler');
/* This file is used to test the deployment of
Solidity Smart Contracts without using Truffle */
const houseAdmin = require(`${root}/build/contracts/HouseAdmin.json`);

async function writeAddressJSON(key, value) {
    var filePath = path.resolve(root, 'address.json');
    var address;
    try {
        address = require(filePath);
    } catch (e) {
        fs.writeFileSync(filePath, JSON.stringify({}));
        address = require(filePath);
    }
    address[key] = value;
    fs.outputJsonSync(
        filePath,
        JSON.parse(JSON.stringify(address)),
        {spaces: 2}
    );
}

async function deployAdminContract() {
    console.log(`Attempting to deploy from account: ${provider.addresses[0]}`);

    await new web3.eth.Contract(houseAdmin.abi).deploy({
        data: '0x' + houseAdmin.evm.bytecode.object
    }).send({
        from: provider.addresses[0]
    }).then(deployedContract => {
        console.log(
            `Contract deployed at address: ${deployedContract.options.address}`
        );
        // writeAddressJSON('HouseAdmin', deployedContract.options.address);
    });
    createEmptyFolder(`${root}/public/images`);
}

deployAdminContract();
