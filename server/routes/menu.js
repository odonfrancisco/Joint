const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');

router.get('/', (req, res, next) => {
    Menu.find()
        .then(menus => {
            res.status(200).json(menus)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res, next) => {
    Menu.findById(req.params.id).populate('subMenus.items')
        .then(menu => {
            res.status(200).json(menu)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/items', (req, res, next) => {
    MenuItem.find()
        .then(menuItems => {
            res.status(200).json(menuItems);
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;