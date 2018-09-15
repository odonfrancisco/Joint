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

router.get('/:id/items', (req, res, next) => {
    MenuItem.find({menuId: req.params.id})
        .then(menuItems => {
            res.status(200).json(menuItems);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


router.post('/:id/items/new', (req, res, next) => {
    Menu.findById(req.params.id)
        .then(menu => {
            const {name, description, price, picture, ingredients, category} = req.body;

            let subMenu = menu.subMenus.filter(subMenu => subMenu.category === category)[0];
            
            let newItem = new MenuItem({
                name, description, price, picture, ingredients, category, 
                menuId: req.params.id,
            })
            newItem.save()
                .then(menuItem => {
                    subMenu.items.unshift(menuItem._id);
                    menu.save()
                        .then(menu => {
                            res.status(200).json(menu);
                        })
                        .catch(err => {
                            res.status(500).json(err);
                        })
                })
                .catch(err => {
                    res.status(500).json(err);
                })
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/:menuId/category', (req, res, next) => {
    Menu.findById(req.params.menuId)
        .then(menu => {
            const newSubMenu = {
                category: req.body.newCategory,
                notes: '',
                items: []
            };
            
            menu.subMenus.unshift(newSubMenu);

            menu.save()
                .then(menu => {
                    res.status(200).json(newSubMenu);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/:menuId/category/remove', (req, res, next) => {
    Menu.findById(req.params.menuId).populate('subMenus.items')
        .then(menu => {
            
            let subMenu = menu.subMenus.filter(subMenu => subMenu.category === req.body.category)[0]
            
            menu.subMenus.splice(menu.subMenus.indexOf(subMenu), 1);

            menu.save()
                .then(menu => {
                    res.status(200).json(menu);
                })
                .catch(err => {
                    res.status(500).json(err);
                })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;