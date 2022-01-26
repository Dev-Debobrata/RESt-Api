const mongoose = require('mongoose')

const buyersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('buyermodel', buyersSchema)