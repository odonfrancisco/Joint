const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');

router.get('/', (req, res, next) => {
    Restaurant.find()
        .then(restaurants => {
            res.status(200).json(restaurants);
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;