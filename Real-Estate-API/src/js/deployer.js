const Web3 = require('web3');
const path = require('path');
const fs = require('fs-extra');
const root = require('app-root-path').path;

const web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};
const web3 = new Web3(web3Provider, null, OPTIONS);

const compiledContract = require(path.resolve(root, 'build/HouseAdmin.json'));

async function writeAddressJSON(key, value) {
    var filePath = path.resolve(originPath, 'address.json');
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
    const accounts = await web3.eth.getAccounts();

    console.log(`Attempting to deploy from account: ${accounts[0]}`);

    await new web3.eth.Contract(compiledContract.abi).deploy({
        data: '0x' + compiledContract.evm.bytecode.object,
        // arguments: ['Minh Thinh', 50, 50000]
    }).send({
        from: accounts[0],
        gas: '2000000'
    }).then(deployedContract => {
        console.log(
            `Contract deployed at address: ${deployedContract.options.address}`
        );
        writeAddressJSON('HouseAdmin', deployedContract.options.address);
        return deployedContract;
    }).then(contract => {
        return contract.methods.getAllOwners().call({
            from: accounts[0]
        })
    }).then(res => console.log(res));
}

async function testCallingContract() {
    const accounts = await web3.eth.getAccounts();

    await new web3.eth.Contract(compiledContract.abi, require(path.resolve(root, 'address.json'))['HouseAdmin'])
        .methods
        .getAllHouses()
        .call({
            from: accounts[0]
        }).then(res => {
            console.log(res);
        });
}

// deployAdminContract();
testCallingContract();
