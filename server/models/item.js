var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemSchema = new Schema ({
    itemName: {
        type: String,
        required: [true, 'item name is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    stock: {
        type: Number,
        required: [true, 'stock is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    category: {
        type: String,
        required: [true, 'category is required']
    },
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;