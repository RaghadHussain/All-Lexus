const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    car:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LexusCar' 
    }
},{timestamps: true})

const Wishlist = mongoose.model('Wishlist',wishlistSchema)
module.exports = Wishlist