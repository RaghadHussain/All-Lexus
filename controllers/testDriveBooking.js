const router = require("express").Router()
const LexusCar = require("../models/LexusCar")
const testDrive = require('../models/TestDriveBooking')
const User = require('../models/User')


router.get('/viewBookings', async (request, response) => {
    try {
        if (request.session.user.isdealer) {
            const currentUser = await User.findById(request.session.user._id)
            const myBookings = await testDrive.find({dealer: currentUser.dealerId}).populate('userId car dealer')
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
        console.log(car)
        const createdTestDriveBooking = await testDrive.create({
                userId: request.session.user._id,
                car: car._id,
                dealer: car.dealer,
                date: request.body.date,
                note: request.body.note
            })
            response.redirect(`/lexusCar/${request.params.carId}`)
        }
        catch (e) {
                console.log('ERROR: ' + e)
            }
})


module.exports = router;
