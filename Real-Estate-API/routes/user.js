/**
 * <---Application Programming Interfaces--->
 * Get Data -> POST
 * Update Data -> PATCH
 * Delete Data -> DELETE
 */
const express = require('express');
const router = express.Router();
const db = require('monk')('localhost:27017/real-estate');
const transaction_history = db.get('transaction-history');
const user_information = db.get('user-information');

/**
 * @Single-Query
 * Get all transactions which the specific user received !
 */
router.post('/user/transactions', (req, res) => {
    const {userAddress} = req.body;
    transaction_history.findOne(
        {userAddress: userAddress.toLowerCase()}, /* QUERIES GO HERE ! */
        {} /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.json(JSON.parse(JSON.stringify(docs.transactions)));
    }).catch(error => {
        db.close();
        console.log(error);
        res.sendStatus(404).end();
    });
});

/**
 * @Array-Query
 * Get all transactions which the list of users received !
 */
router.post('/users/transactions', (req, res) => {
    const {userAddresses} = req.body;
    transaction_history.find(
        {userAddress: {$in: userAddresses.map(address => address.toLowerCase())}}, /* QUERIES GO HERE ! */
        {} /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.json(JSON.parse(JSON.stringify(docs)));
    }).catch(error => {
        db.close();
        console.log(error);
        res.sendStatus(404).end();
    });
});

/**
 * @Single-Query
 * Get user information according to their specific address !
 */
router.post('/user/info', (req, res) => {
    const {userAddress} = req.body;
    user_information.findOne(
        {userAddress: userAddress.toLowerCase()}, /* QUERIES GO HERE ! */
        {} /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.json(JSON.parse(JSON.stringify(docs)));
    }).catch(error => {
        db.close();
        console.log(error);
        res.sendStatus(404).end();
    });
});

/**
 * @Array-Query
 * Get list of users information according to their specific addresses !
 * @userAddresses is an array contains list of user address !
 */
router.post('/users/info', (req, res) => {
    const {userAddresses} = req.body;
    user_information.find(
        {userAddress: {$in: userAddresses.map(address => address.toLowerCase())}}, /* QUERIES GO HERE ! */
        {} /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.json(JSON.parse(JSON.stringify(docs)));
    }).catch(error => {
        db.close();
        console.log(error);
        res.sendStatus(404).end();
    });
});

/**
 * @Single-Query
 * @Single-Operator
 * Update user information in User-Information Document !
 */
router.patch('/user/info', (req, res) => {
    const {userAddress, ...detail} = req.body;
    user_information.findOneAndUpdate(
        {userAddress: userAddress.toLowerCase()}, /* QUERIES GO HERE ! */
        {$set: {...detail}}, /* OPERATIONS GO HERE ! */
        {
            upsert: true,
            multi: true
        } /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.sendStatus(200).end();
    }).catch(error => {
        db.close();
        console.log(error);
        res.sendStatus(404).end();
    });
});

/**
 * @Single-Query
 * @Single-Operator
 * Update List of Users information in User-Information Document !
 * @TEST: This method is used for testing with Postman API !
 */
router.patch('/users/info', (req, res) => {
    const {listUserInfo} = req.body;
    Promise.all(
        listUserInfo.map(userInfo => {
            const {userAddress, ...detail} = userInfo;
            return user_information.findOneAndUpdate(
                {userAddress: userAddress.toLowerCase()}, /* QUERIES GO HERE ! */
                {$set: {...detail}}, /* OPERATIONS GO HERE ! */
                {
                    upsert: true,
                    multi: true
                } /* OPTIONS GO HERE ! */
            );
        })
    ).then(docs => {
        db.close();
        res.sendStatus(200).end();
    }).catch(error => {
        db.close();
        console.log(error);
        res.sendStatus(404).end();
    });
});

module.exports = router;
