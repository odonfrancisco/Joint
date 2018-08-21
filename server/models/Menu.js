const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    about: String,
    // Each category will have this schema. Still need to confidently define
    categories: {
        subMenu: {
            notes: String,
            items: [{
                type: Schema.Types.ObjectId,
                ref: 'MenuItem',
            }],
        },
    }
})

menuSchema.set('timestamps', true);

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;