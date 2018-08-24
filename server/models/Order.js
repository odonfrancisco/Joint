const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
    },
    status: {
        enum: ['open', 'closed'],
        // This shouldn't have to be commented out...
        // required: true,
    },
    customers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    table: String,
    items: [{
        quantity: Number,
        name: String,
        itemId: {
            type: Schema.Types.ObjectId,
            ref: 'MenuItem'
        },
        price: Number,
        status: {
            enum: ['open', 'cooked', 'sent', 'revise'],
            // This shouldn't have to be commented out...
            // required: true
        },
        modifications: [{type: String}],
    }]
})

orderSchema.set('timestamps', true);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;