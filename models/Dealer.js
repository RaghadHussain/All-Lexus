const mongoose = require('mongoose')

const dealerShema = new mongoose.Schema({
    dealerName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
}, {timestamps: true})


const Dealer = mongoose.model('Dealer', dealerShema)
module.exports = Dealer