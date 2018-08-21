const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    description: String,
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    menus: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }],
    location: {
        type: {type: String},
        coordinates: [Number],
    },
})

restaurantSchema.set('timestamps', true);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;