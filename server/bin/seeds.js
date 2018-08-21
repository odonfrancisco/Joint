const mongoose = require('mongoose');
const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');

const dbName = 'joint';
mongoose.connect(`mongodb://localhost/${dbName}`);

const restaurant = {
    name: 'Krusty Krab',
    cuisine: 'SeaPatties',
    description: 'Where everyone under the sea gathers',
}

const menu = {
    name: 'Main Menu',
    about: 'This is where all the Krabby Patties lay',
    subMenus: [
        {
            category: 'Drinks',
            notes: 'Refresh yoself',
            items: []
        },
        {
            category: 'Patties',
            notes: 'Eat Up!',
            items: []
        },
        {
            category: 'Appetizers',
            notes: 'Don\'t eat too much',
            items: []
        },
        {
            category: 'Desserts',
            notes: 'Please don\'t eat me',
            items: []
        }
    ]
}

const menuItems = [
    {
        name: 'Krabby Patty',
        description: 'Tastiest deliciousness',
        ingredients: [
            'Pickles',
            'Onion',
            'Bun'
        ],
        price: 34,
        picture: 'https://i.ytimg.com/vi/bjNUPRDmxDk/maxresdefault.jpg',
    },
    {
        name: 'Kelp Shake',
        description: 'Bottoms up',
        ingredients: [
            'Kelp',
            'Seaweed',
        ],
        price: 20,
        picture: 'https://tse2.mm.bing.net/th?id=OIP.Uxnou7mtIf4OgrSelyBWmwHaFj&pid=Api',
    },
    {
        name: 'Krabby Claws',
        description: 'Tastiest Treat in Town',
        ingredients: [
            'Mr. Krab\'s Hand'
        ],
        price: 23,
        picture: 'http://www.foamworx.com/Images/Products/CCL302.jpg',
    }
]

// Menu.create(menu, (err) => {
//     if (err) { throw(err) }
//     console.log(`Created 1 menu`)
// })

MenuItem.create(menuItems, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${menuItems.length} menu Items`)
})

// Restaurant.create(restaurant, (err) => {
//     if (err) {throw(err)}
//     console.log(`Created 1 restaurant`)
// })