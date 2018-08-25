const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subMenuSchema = new Schema({
    category: String,
    notes: String,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'MenuItem'
    }]
})

const menuSchema = new Schema({
    name: String,   
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    about: String,
    // Each category will have this schema. Still need to confidently define
    subMenus: [{
        category: String,
        notes: String,
        items: [{
            type: Schema.Types.ObjectId,
            ref: 'MenuItem'
        }]
    }]
})

menuSchema.set('timestamps', true);

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;