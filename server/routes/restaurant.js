const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem')

router.get('/', (req, res, next) => {
    // Find all the restaurants
    Restaurant.find()
        .then(restaurants => {
            // Return all restaurants
            res.status(200).json(restaurants);
        })
        .catch(err => {
            res.status(500).json(err)
            next();
        })
});

router.get('/names', (req, res, next) => {
    // Finds all restaurants and only returns their names and ID for the dropdown
        // when a user picks what restaurant they're at
    Restaurant.find({}, {name:1})
        .then(restaurants => {
            res.status(200).json(restaurants);
        })
        .catch(err => {
            res.status(500).json(err);
            next();
        });
});

router.get('/:id', (req, res, next) => {
    // Find particular restaurant and populate its menus + menuItems
    Restaurant.findById(req.params.id).populate('menus')
        .then(restaurant => {
            res.status(200).json(restaurant)
        })
        .catch(err => {
            // Weird shit with this error. I need to figure out how to properly configure this error
            res.status(500).json(err);
            // next()
        });
});


router.post('/:id/order/create', (req, res, next) => {
    // Gets table number that user input from req.body
    const { tableNum } = req.body;
    // Saves user's _id to put in the order.customers
    const customerId = req.session.passport.user;
    // Finds any orders that have the same table number for the same restaurant that are open
        // that way if there's an order that's already open from the same table,
        // the user gets added to the existing order for the table instead of creating a new order 
        // for a table that already has an order
    const findOrder = Order.find({$and: [{table: tableNum}, {restaurantId: req.params.id}, {status: 'open'}]})
        .then(orders => {
            // If an order exists for that table currently, then this adds the user to that order
            if (orders.length>0){
                // Checks that user isn't already a part of the order
                if(orders[0].customers.indexOf(customerId) === -1){
                    // Adds user to order
                    orders[0].customers.unshift(customerId);
                    orders[0].save()    
                }
            }
            // Makes 'orders' available for the next promise function
            return orders
        })
        .catch(err => {
            console.error(err)
            next()
        })
    findOrder.then((orders) => {
        // Checks that there isn't an exisiting order to then create one 
        if (orders.length===0){
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
        } else {
            // else, just send the existing order that the user was added to
            res.status(200).json(orders[0])
        }
    })
})

router.get('/:id/menus', (req, res, next) => {
    Menu.find({restaurantId: req.params.id}).populate('subMenus.items')
        .then(menus => {
            res.status(200).json(menus);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id/:role/login', (req, res, next) => {
    Restaurant.findById(req.params.id)
        .then(restaurant => {
            if (restaurant.accessKeys[req.params.role].users.indexOf(req.session.passport.user)>-1){
                res.status(200).json({restaurant})
            } else {
                res.status(401).json({message: 'Invalid User'});
            }

            // const values = Object.values(restaurant.accessKeys);
            // const keys = Object.keys(restaurant.accessKeys);
            // console.log('values: ', values)
            // console.log('Object.values:' , Object.values(restaurant.accessKeys))

            // values.forEach((accessKey, index) => {
            //     if (accessKey.users){
            //         if (accessKey.users.indexOf(req.session.passport.user) > -1){
            //             role = keys[index];
            //         }
    
            //     }
            // })

            // if (role === false){
            //     res.status(401).json({message: 'Invalid User'});
            // } else {
            //     res.status(200).json({restaurant, role})
            // }
            
        })
        .catch(err => {
            res.status(500).json(err);
            console.log(err)
        })
})

router.post('/:id/login', (req, res, next) => {
    Restaurant.findById(req.params.id)
        .then(restaurant => {
            // console.log('restaurant: ', restaurant)
            const { password } = req.body;
            let role = false;
            
            const values = Object.values(restaurant.accessKeys);
            const keys = Object.keys(restaurant.accessKeys);
            values.forEach((accessKey, index) => {
                // console.log('accessKey: ', accessKey)
                // console.log('key:', keys[index])
                // console.log(accessKey, password)
                if (accessKey.key == password){
                    if (accessKey.users.indexOf(req.session.passport.user)>-1){
                        role = keys[index];
                    } else {
                        res.status(401).json({message: 'Unauthorized User'})
                    }
                }
            })
            if(role === false){
                res.status(401).json({message: 'Invalid Password'})
            } else {
                res.status(200).json({restaurant, role})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})


module.exports = router;