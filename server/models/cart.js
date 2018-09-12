var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'price is required']
    },
    listItem: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, 'price is required']
    }],
    total: {
        type: Number,
        required: [true, 'price is required']
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

var Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart