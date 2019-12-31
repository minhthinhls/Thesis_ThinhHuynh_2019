const path = require('path');
const express = require('express');
const router = express.Router();
const root = require('app-root-path').path;
const imageUpload = require(path.resolve(root, 'src/js/imageUpload'));

/* Application Programming Interfaces */
router.post('/info/house', (req, res) => {
    var name = req.body['fields']['Name'];
    var email = req.body['fields']['Email'];
    var phone = req.body['fields']['Phone'];
    var address = req.body['fields']['Address'];
    var area = req.body['fields']['Area'];
    var type = req.body['fields']['Type'];
    var bedrooms = req.body['fields']['Bedrooms'];
    var bathrooms = req.body['fields']['Bathrooms'];
    var dateListed = req.body['fields']['DateListed'];
    var price = req.body['fields']['Price'];
    var summary = req.body['fields']['Summary'];
    var images = req.body['fields']['Images'];
    console.log(req.body);
    res.end();
});

router.get('/contract/house', (req, res) => {
    res.json(require(path.resolve(root, 'build/House.json')));
});

router.get('/contract/houseAdmin', (req, res) => {
    res.json(require(path.resolve(root, 'build/HouseAdmin.json')));
});

router.get('/address/houseAdmin', (req, res) => {
    res.json(require(path.resolve(root, 'address.json'))['HouseAdmin']);
});

router.post('/upload', (req, res) => {
    imageUpload(req, res, (err) => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file); // Here you get file.
        /* Now do where ever you want to do */
        if (!err) {
            return res.send(200).end();
        }
    })
});

module.exports = router;
