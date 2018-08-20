const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    pastOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    restaurantsVisited: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }],
    favoriteItems: [{
        type: Schema.Types.ObjectId,
        ref: 'MenuItem'
    }]
})

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);
module.exports = User;