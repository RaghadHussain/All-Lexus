const mongoose = require('mongoose')

const testDriveSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    car:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LexusCar'
    },
    date:{
        type: Date,
        required: true
    },
    note:{
        type: String
    }
})

const TestDriveBooking = mongoose.model('TestDriveBooking', testDriveSchema)
module.exports = TestDriveBooking