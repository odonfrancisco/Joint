const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.post('/:menuItemId/update', (req, res, next) => {
    const {name, description, price, picture, ingredients, category} = req.body;

    MenuItem.findByIdAndUpdate(req.params.menuItemId, { $set: {name, description, 
        price, picture, 
        ingredients, category}})
            .then(menuItem => {
                // const updatedItem = req.body;
                // console.log('updated item: ', updatedItem)
                // console.log('menu item: ', menuItem)
                // // menuItem = updatedItem;
                // menuItem.save()
                //     .then(menuItem => {
                        res.status(200).json(menuItem);
                    // })
                    // .catch(err => {
                    //     console.log(err)
                        res.status(500).json(err);
                    // })
            })
            .catch(err => {
                console.log('Error in finding menu item: ', err)
                res.status(500).json(err);
            });
});

router.get('/:menuItemId/remove', (req, res, next) => {
    MenuItem.findByIdAndRemove(req.params.menuItemId)
        .then(menuItem => {
            console.log(menuItem);
            res.status(200).json({message: `${menuItem.name} was successfully deleted`})
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;