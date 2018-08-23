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
            next();
        })
});

router.get('/:id', (req, res, next) => {
    Restaurant.findById(req.params.id).populate('menus')
        .then(restaurant => {
            res.status(200).json(restaurant)
        })
        .catch(err => {
            next(res.status(500).json(err));
            next()
        });
});

router.get('/names', (req, res, next) => {
    Restaurant.find({}, {name:1})
        .then(restaurants => {
            res.status(200).json(restaurants);
        })
        .catch(err => {
            res.status(500).json(err);
            next();
        });
});


module.exports = router;