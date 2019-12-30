var express = require('express');
var router = express.Router();

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
    res.json(require('../build/House.json'));
});

router.get('/contract/houseAdmin', (req, res) => {
    res.json(require('../build/HouseAdmin.json'));
});

router.get('/address/houseAdmin', (req, res) => {
    res.send(require('../address.json')['HouseAdmin']);
});

module.exports = router;
