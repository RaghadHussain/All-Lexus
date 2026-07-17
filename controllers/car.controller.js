const router = require("express").Router()
const car = require('../models/LexusCar')
const multer = require('multer')
const upload = multer({dest: 'uploads'})

router.get('/new', (request, response) => {
    response.render('cars/addNewCar.ejs')
})

router.post('/new',upload.single('carImage'), async (request, response) => {
    try {
        await car.create({
            dealer: request.session.user._id,
            model: request.body.model,
            condition: request.body.condition,
            type: request.body.type,
            mileage: request.body.mileage,
            fuelType: request.body.fuelType,
            engine: request.body.engine,
            horsepower: request.body.horsepower,
            carImage: request.file.filename
        })
        response.redirect('/dealers/dealerAllCars.ejs')
    } catch (e) {
        console.log('ERROR:' + e)
    }




})

module.exports = router;