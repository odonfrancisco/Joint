const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');
const Order = require('../models/Order');

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
            // next(res.status(500).json(err));
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

router.post('/:id/order/create', (req, res, next) => {
    const { tableNum } = req.body;
    const findOrder = Order.find({$and: [{table: tableNum}, {restaurantId: req.params.id}, {status: 'open'}]})
        .then(orders => {
            console.log(orders)
        })
        .catch(err => {

        })
    findOrder.then(() => {
        const newOrder = new Order({
            restaurantId: req.params.id,
            status: 'open',
            customers: [customerId],
            table: tableNum,
            items: []
        })
    
        newOrder.save((err) => {
            if (err){
                res.status(500).json(err);
            };
    
            res.status(200).json(newOrder);
        });    
    })
})


module.exports = router;