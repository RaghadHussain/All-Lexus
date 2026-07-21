const router = require("express").Router()
const LexusCar = require("../models/LexusCar")
const testDrive = require('../models/TestDriveBooking')
const User = require('../models/User')


router.get('/viewBookings', async (request, response) => {
    try {
        if (request.session.user.isDealer) {
            const currentUser = await User.findById(request.session.user._id)
            const myBookings = await testDrive.find({dealer: currentUser.isDealer}).populate('car userId')
            response.render('testDriveBooking/dealerBookings.ejs',{bookings: myBookings})
        }
    } catch (e) {
        console.log('ERROR: ' + e)
    }
})


router.get('/:carId', async (request, response) => {
    try {
        const foundCar = await LexusCar.findById(request.params.carId).populate('dealer')
        response.render('testDriveBooking/testDraiveBooking.ejs', { car: foundCar })
    } catch (e) {
        console.log('ERROR: ' + e)
    }
})

router.post('/:carId', async (request, response) => {
    try {
        const car = await LexusCar.findById(request.params.carId)
        const createdTestDriveBooking = await TestDriveBooking.create({
            userId: request.session.user._id,
            car: car._id,
            dealer: car.dealer,
            date: request.body.date,
            note: request.body.note
        })
        res.redirect(`/lexusCar/${request.params.carId}`)
    }
    catch (e) {
        console.log('ERROR: ' + e)
    }
})


module.exports = router;
