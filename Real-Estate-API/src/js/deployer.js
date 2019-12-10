const Web3 = require('web3');

const web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};
const web3 = new Web3(web3Provider, null, OPTIONS);

const compiledContract = require('../../build/House.json');

async function deployContract() {
    const accounts = await web3.eth.getAccounts();

    console.log(`Attempting to deploy from account: ${accounts[0]}`);

    await new web3.eth.Contract(compiledContract.abi).deploy({
        data: '0x' + compiledContract.evm.bytecode.object,
        arguments: ['Minh Thinh', 50, 50000]
    }).send({
        from: accounts[0],
        gas: '2000000'
    }).then(deployedContract => {
        console.log(
            `Contract deployed at address: ${deployedContract.options.address}`
        );
        return new web3.eth.Contract(compiledContract.abi, deployedContract.options.address);
    }).then(contract => {
        return contract.methods.ownerName().call({
            from: accounts[0]
        })
    }).then(res => console.log(res));
}

deployContract();
