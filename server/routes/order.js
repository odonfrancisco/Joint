const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const mongoose = require('mongoose');

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

router.get('/restaurant/kitchen/:restaurantId', (req, res, next) => {
    Order.find({restaurantId: req.params.restaurantId, 'items.status': {$in: ['open', 'revise']}})
        .then(orders => {
            console.log(orders)
            res.status(200).json(orders)
        })
        .catch(err => {
            res.status(500).json({message: 'Error within database'})
        })
})

router.post('/status/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
        .then(order => {
            
            const allCooked = () => {
                order.items = order.items.map(item => {
                    item.status = 'cooked';
                    return item;
                });
                order.save()
                    .then(order => {
                        res.status(200).json(order);
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json(err);
                    });    
            };

            const closeOrder = () => {
                order.items = order.items.map(item => {
                    item.status = 'closed';
                    return item;
                });
                order.status = 'closed';
                order.save()
                    .then(order => {
                        res.status(200).json(order);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            };

            switch(req.body.status){
                case 'cooked': allCooked(); break;
                case 'closed': closeOrder(); break;
            }

        })
        .catch(err => {
            console.log('error: ', err)
            res.status(500).json(err);
        });
});

router.post('/item/status/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
        .then(order => {
            const { itemId, status } = req.body;


            item = order.items.filter(e => e._id.toString() === itemId);

            item[0].status = status;

            order.save()
                .then(order => {
                    res.status(200).json(order);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

module.exports = router;