const express = require('express');
const router = express.Router();
const uploader = require('../src/js/uploader');
const db = require('monk')('localhost:27017/real-estate');
const transaction_history = db.get('transaction-history');
const pending_request = db.get('pending-request');

/* Application Programming Interfaces */
router.get('/contract/house', (req, res) => {
    res.json(require('../build/contracts/House.json'));
});

router.get('/contract/houseAdmin', (req, res) => {
    res.json(require('../build/contracts/HouseAdmin.json'));
});

router.get('/succeed-transactions/user', (req, res) => {
    const params = req.query;
    transaction_history.findOne(
        {userAddress: params.address}, /* QUERIES GO HERE ! */
        {} /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.json(JSON.parse(JSON.stringify(docs.transactions)));
    }).catch(error => {
        db.close();
        res.sendStatus(404).end();
    });
});

router.get('/interested-users/house', (req, res) => {
    const params = req.query;
    pending_request.findOne(
        {houseAddress: params.address}, /* QUERIES GO HERE ! */
        {} /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.json(JSON.parse(JSON.stringify(docs.userAddresses)));
    }).catch(error => {
        db.close();
        res.sendStatus(404).end();
    });
});

router.delete('/succeed-transactions/user', (req, res) => {
    const params = req.query;
    transaction_history.findOneAndDelete(
        {userAddress: params.address}, /* QUERIES GO HERE ! */
        {} /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.sendStatus(200).end();
    }).catch(error => {
        db.close();
        res.sendStatus(404).end();
    });
});

router.delete('/interested-users/house', (req, res) => {
    const params = req.query;
    pending_request.findOneAndDelete(
        {houseAddress: params.address}, /* QUERIES GO HERE ! */
        {} /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.sendStatus(200).end();
    }).catch(error => {
        db.close();
        res.sendStatus(404).end();
    });
});

router.delete('/interested-users/', (req, res) => {
    const params = req.query;
    pending_request.update(
        {houseAddress: params.houseAddress}, /* QUERIES GO HERE ! */
        {$pull: {userAddresses: params.userAddress}}, /* OPERATIONS GO HERE ! */
        {
            multi: true
        } /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.sendStatus(200).end();
    }).catch(error => {
        db.close();
        res.sendStatus(404).end();
    });
});

router.post('/update/succeed-transaction', (req, res) => {
    const body = req.body;
    transaction_history.update(
        {userAddress: body.userAddress}, /* QUERIES GO HERE ! */
        {$addToSet: {transactions: body.transaction}}, /* OPERATIONS GO HERE ! */
        {
            upsert: true,
            multi: true
        } /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.sendStatus(200).end();
    }).catch(error => {
        db.close();
        res.sendStatus(404).end();
    });
});

router.post('/update/interested-user', (req, res) => {
    const body = req.body;
    pending_request.update(
        {houseAddress: body.houseAddress}, /* QUERIES GO HERE ! */
        {$addToSet: {userAddresses: body.userAddress}}, /* OPERATIONS GO HERE ! */
        {
            upsert: true,
            multi: true
        } /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.sendStatus(200).end();
    }).catch(error => {
        db.close();
        res.sendStatus(404).end();
    });
});

// Service to receive Image Uploaded from Clients.
router.post('/upload', (req, res) => {
    uploader(req, res, (err) => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file); // Here you get file.
        /* Now do where ever you want to do */
        if (!err) {
            return res.sendStatus(200).end();
        }
    })
});

module.exports = router;
