const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        car:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LexusCar' 
        },
        rating:{
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        reviewComment: {
            type: String,
            required: true
        }
},{timestamps: true})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review
