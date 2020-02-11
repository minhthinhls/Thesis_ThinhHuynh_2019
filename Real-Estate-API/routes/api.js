const express = require('express');
const router = express.Router();
const uploader = require('../src/js/uploader');

/* Application Programming Interfaces */
router.get('/contract/house', (req, res) => {
    res.json(require('../build/contracts/House.json'));
});

router.get('/contract/houseAdmin', (req, res) => {
    res.json(require('../build/contracts/HouseAdmin.json'));
});

// Service to receive Image Uploaded from Clients.
router.post('/upload', (req, res) => {
    uploader(req, res, (err) => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file); // Here you get file.
        /* Now do where ever you want to do */
        if (!err) {
            return res.send(200).end();
        }
    })
});

module.exports = router;
