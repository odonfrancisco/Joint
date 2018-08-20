const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    name: String,
    description: String,
    ingredients: [{
        type: String
    }],
    subMenu: String,
    menuId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
    },
    price: Number,
    rating: String,
    orders: Number,
    picture: String,
})

menuItemSchema.set('timestamps', true);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;