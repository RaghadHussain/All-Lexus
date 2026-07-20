const router = require("express").Router()
const LexusCar = require("../models/LexusCar")
const testDrive = require('../models/TestDriveBooking')


router.get('/:carId', async (request, response) => {
    try {
        const foundCar = LexusCar.findById(request.params.cassrId).populate('dealer')
        response.render('testDriveBooking/testDraiveBooking.ejs', { car: foundCar })
    } catch (e) {
        console.log('ERROR: ' + e)
    }
})

router.post('/:carId', async (request, response) => {
    try {
        const createdTestDriveBooking = await TestDriveBooking.create({
            userId: request.session.user._id,
            car: request.params.carId,
            date: request.body.date,
            note: request.body.note
        })
        res.redirect('/lexusCar/carId')
    }
    catch (e) {
        console.log('ERROR: ' + e)
    }
})


module.exports = router;
