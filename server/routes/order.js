const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/add/:id', (req, res, next) => {
    const orders = req.body;

    Order.findById(req.params.id)
        .then(order => {
            order.items.push(...req.body)
            order.save()
                .then(order => {
                    res.status(200).json(order);
                })
                .catch(err => {
                    res.status(500).json(err, {message: 'Error saving order'});
                });
        })
        .catch(err => {
            res.status(500).json(err, {message: 'Error finding error to place on'});
        });
});

router.get('/restaurant/all/:restaurantId', (req, res, next) => {
    Order.find({restaurantId: req.params.restaurantId})
        .then(orders => {
            res.status(200).json(orders)
        })
        .catch(err => {
            res.status(500).json({message: 'Error within database'})
        })
})

module.exports = router;