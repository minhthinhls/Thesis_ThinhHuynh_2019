/* System Dependencies */
const root = require('app-root-path');
require('dotenv').config({path: `${root}/.env`});
/* Colorful Dependencies */
const {Reset, FgCyan, FgYellow} = require('../utils/ConsoleColors.js');
/* Ethereum Dependencies */
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = (networkID = 5777) => new HDWalletProvider(
    process.env.MNEMONIC, // The 12 words phrase required to create accounts !
    networkID === 3 ?
        process.env.ROPSTEN + process.env.INFURA_KEY :
        process.env.GANACHE_HTTP_PROVIDER, // The HTTP Provider Endpoint !
    0, // The specified index where HD Wallet manage the address at !
    10, // Number of addresses initialized by HD Wallet !
    )
;
const web3 = new Web3(provider());
/* MongoDB Dependencies */
const db = require('monk')('localhost:27017/real-estate');
const transaction_history = db.get('transaction-history');
const blockchain_data = db.get('blockchain-data');

const getBlock = async (_blockNumber) => {
    return web3.eth.getBlock(_blockNumber);
};

const getBlocks = async (_fromBlock, _toBlock) => {
    const requests = [];
    for (let i = _fromBlock; i <= _toBlock; i++) {
        requests.push(getBlock(i));
    }
    return Promise.all(requests);
};

const getTransaction = async (_txHash) => {
    return web3.eth.getTransaction(_txHash);
};

const fetchMongoDB = async () => {
    const fromBlock = await blockchain_data.count({});
    const toBlock = await web3.eth.getBlockNumber();
    if (fromBlock > toBlock) {
        return;
    }
    const blocks = await getBlocks(fromBlock, toBlock);
    const transactions = blocks.reduce((accumulator, {timestamp, transactions}) => {
        accumulator.push(...transactions.map(txHash => {
            return {txHash, timestamp}
        })); // Get all transactions hash from list of blocks and map txHash along with its block timestamp ! */
        return accumulator;
    }, []);
    const listTxDetail = await Promise.all(transactions.map(({txHash, timestamp}) => {
        return getTransaction(txHash).then(txDetail => {
            return {...txDetail, timestamp};
        }); // Get all transactions detail from list of txHash and map txDetail along with its block timestamp ! */
    }));
    var txMap = new Map(); // Store all transactions related to received user address ! */
    listTxDetail.forEach(({to, ...rest}) => {
        if (to === null) { // Since <to> equals Null, this transaction creates an empty contract ! */
            return; // Skip this transaction since it sent to nobody ! */
        } // Please refer to: https://ethereum.stackexchange.com/questions/32815/transaction-sent-to-null */
        const userListTxDetail = txMap.get(to);
        txMap.set(to, [...(userListTxDetail === undefined ? [] : userListTxDetail), rest])
    });
    Promise.all([
        blockchain_data.insert(
            blocks, /* INSERT DOCS GO HERE ! */
            {} /* OPTIONS GO HERE ! */
        ),
        ...(() => {
            return [...txMap.entries()].map(([userKey, userListTx]) => {
                return transaction_history.findOneAndUpdate(
                    {userAddress: userKey.toLowerCase()}, /* QUERIES GO HERE ! */
                    {$push: {transactions: {$each: userListTx}}}, /* OPERATIONS GO HERE ! */
                    {
                        upsert: true,
                        multi: true
                    } /* OPTIONS GO HERE ! */
                );
            });
        })() /* Return list of pending Promise and Spread it using <...> Operator ! */
    ]).then(() => {
        db.close();
    }).catch(error => {
        db.close();
        console.log(error);
    });
};

module.exports = {getBlock, getBlocks, getTransaction, fetchMongoDB};

blockchain_data.count({}).then(storedBlocks => {
    console.log(`${FgCyan}=> Total Blocks Stored -> ${FgYellow}${storedBlocks}${Reset}`)
});
web3.eth.getBlockNumber().then(latestBlock => {
    console.log(`${FgCyan}=> Latest Block Number -> ${FgYellow}${latestBlock + 1}${Reset}`)
});
