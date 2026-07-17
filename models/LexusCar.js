const mongoose = require('mongoose')

const lexusCarSchema = new mongoose.Schema({
    dealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dealer'
    },
    model: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true,
        enum: ['New', 'Used']
    },
    type: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    horsepower: {
        type: Number,
        required: true
    },
    carImage: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Available',
        enum: ['Available', 'Sold']
    }
}, { timestamps: true })

const LexusCar = mongoose.model('LexusCar', lexusCarSchema)
module.exports = LexusCar
