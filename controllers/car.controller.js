const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const car = require('../models/LexusCar')
const multer = require('multer')
const upload = multer({ dest: 'uploads' })


//Create Routs 
router.get('/new', isSignedIn, (request, response) => {
    response.render('cars/addNewCar.ejs')
})

router.post('/new', isSignedIn, upload.single('carImage'), async (request, response) => {
    try {
        await car.create({
            dealer: request.session.user._id,
            model: request.body.model,
            condition: request.body.condition,
            type: request.body.type,
            mileage: request.body.mileage,
            fuelType: request.body.fuelType,
            transmission: request.body.transmission,
            engine: request.body.engine,
            horsepower: request.body.horsepower,
            carImage: request.file.filename
        })
        response.redirect('/')
    } catch (e) {
        console.log('ERROR:' + e)
    }
})



//View car details
router.get('/:id', isSignedIn, async (request, response) => {
    try {
        const foundedCar = await car.findById(request.params.id).populate('dealer')
        response.render('cars/viewCarDetails.ejs', { car: foundedCar })
    } catch (e) {
        console.log('ERROR:' + e)
    }
})



//Delete Rout
router.delete('/:id', isSignedIn, async (request, response) => {
    try {
        await car.findByIdAndDelete(request.params.id)
        response.redirect('')
    } catch (e) {
        console.log('ERROR:' + e)
    }
})



//Edit Routs 
router.get('/:id/edit', isSignedIn, async (request, response) => {
    try {
        const foundedCar = await car.findById(request.params.id)
        response.render('cars/editCarInfo.ejs', { car: foundedCar })
    } catch (e) {
        console.log('ERROR:' + e)
    }
})

router.put('/:id/edit', isSignedIn, upload.single('carImage'), async (request, response) => {
    try {
        if (request.file.filename) {
            request.body.carImage = request.file.filename
        }
        const updatedCarInfo = await car.findByIdAndUpdate(request.params.id, request.body)
        response.redirect('')
    } catch (e) {
        console.log('ERROR:' + e)
    }
}) 
// 



module.exports = router;