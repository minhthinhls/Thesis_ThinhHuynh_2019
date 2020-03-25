/**
 * <---Application Programming Interfaces--->
 * Get Data -> POST
 * Update Data -> PATCH
 * Delete Data -> DELETE
 */
const express = require('express');
const router = express.Router();
const db = require('monk')('localhost:27017/real-estate');
const pending_request = db.get('pending-request');

/**
 * @Single-Query
 * Get all addresses of user who interested in the specific house !
 */
router.post('/house/requests', (req, res) => {
    const {houseAddress} = req.body;
    pending_request.findOne(
        {houseAddress: houseAddress.toLowerCase()}, /* QUERIES GO HERE ! */
        {} /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.json(JSON.parse(JSON.stringify(docs.userAddresses)));
    }).catch(error => {
        db.close();
        console.log(error);
        res.sendStatus(404).end();
    });
});

/**
 * @Array-Query
 * Get list of user's address who interested in the specific list of houses !
 */
router.post('/houses/requests', (req, res) => {
    const {houseAddresses} = req.body;
    pending_request.find(
        {houseAddress: {$in: houseAddresses.map(address => address.toLowerCase())}}, /* QUERIES GO HERE ! */
        {} /* OPTIONS GO HERE ! */
    ).then(docs => {
        db.close();
        res.json(JSON.parse(JSON.stringify(docs.userAddresses)));
    }).catch(error => {
        db.close();
        console.log(error);
        res.sendStatus(404).end();
    });
});

/**
 * @Single-Query
 * @Single-Operator
 * Insert and remove duplicate of interested user address in specific house document !
 */
router.patch('/house/request', (req, res) => {
    const {houseAddress, userAddress} = req.body;
    pending_request.findOneAndUpdate(
        {houseAddress: houseAddress.toLowerCase()}, /* QUERIES GO HERE ! */
        {$addToSet: {userAddresses: userAddress.toLowerCase()}}, /* OPERATIONS GO HERE ! */
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
 * @Array-Operator
 * Insert and remove duplicate array of interested user addresses in specific house document !
 */
router.patch('/house/requests', (req, res) => {
    const {houseAddress, userAddresses} = req.body;
    pending_request.findOneAndUpdate(
        {houseAddress: houseAddress.toLowerCase()}, /* QUERIES GO HERE ! */
        {
            $addToSet: {
                userAddresses: {
                    $each: userAddresses.map(address => address.toLowerCase())
                }
            }
        }, /* OPERATIONS GO HERE ! */
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
 * Delete single interested user address in specific house document !
 */
router.delete('/house/request', (req, res) => {
    const {houseAddress, userAddress} = req.body;
    pending_request.findOneAndUpdate(
        {houseAddress: houseAddress.toLowerCase()}, /* QUERIES GO HERE ! */
        {$pull: {userAddresses: userAddress.toLowerCase()}}, /* OPERATIONS GO HERE ! */
        {
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
 * @Array-Operator
 * Delete array of interested user addresses in specific house document !
 */
router.delete('/house/request', (req, res) => {
    const {houseAddress, userAddresses} = req.body;
    pending_request.findOneAndUpdate(
        {houseAddress: houseAddress.toLowerCase()}, /* QUERIES GO HERE ! */
        {
            $pull: {
                userAddresses: {
                    $each: userAddresses.map(address => address.toLowerCase())
                }
            }
        }, /* OPERATIONS GO HERE ! */
        {
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
 * Delete house address and addresses of users who interested !
 * Or else, delete the whole document in <pending_request> collection
 */
router.delete('/house', (req, res) => {
    const {houseAddress} = req.body;
    pending_request.findOneAndDelete(
        {houseAddress: houseAddress.toLowerCase()}, /* QUERIES GO HERE ! */
        {} /* OPTIONS GO HERE ! */
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
