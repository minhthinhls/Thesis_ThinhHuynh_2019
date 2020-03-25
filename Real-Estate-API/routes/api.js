/**
 * <---Application Programming Interfaces--->
 * Get Data -> POST
 * Update Data -> PATCH
 * Delete Data -> DELETE
 */
const express = require('express');
const router = express.Router();
const uploader = require('../src/js/utils/ImageUploader');

/**
 * Get compiled contracts as HTTP response !
 */
router.get('/contract/house', (req, res) => {
    res.json(require('../build/contracts/House.json'));
});

router.get('/contract/houseAdmin', (req, res) => {
    res.json(require('../build/contracts/HouseAdmin.json'));
});

/**
 * Service to receive Image Uploaded from Clients !
 * And store it in <public> folder
 */
router.post('/upload', (req, res) => {
    uploader(req, res, (error) => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file); // Here you get file.
        /* Now do where ever you want to do */
        if (error) {
            console.log(error);
            return res.sendStatus(404).end();
        }
        return res.sendStatus(200).end();
    })
});

module.exports = router;
