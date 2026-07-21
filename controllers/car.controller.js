const router = require("express").Router()
const { request } = require("express")
const isSignedIn = require('../middleware/is-signed-in')
const car = require('../models/LexusCar')
const review = require('../models/Review')
const multer = require('multer')
const upload = multer({ dest: 'uploads' })



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
        response.redirect('/dealer/myCars')
    } catch (e) {
        console.log('ERROR:' + e)
    }
})



router.get('/:id', async (request, response) => {
    try {
        const foundedCar = await car.findById(request.params.id).populate('dealer')
        const foundedReviews = await review.find().populate('user')
        // console.log(foundedCar)
        console.log(foundedReviews)
        response.render('cars/viewCarDetails.ejs', { car: foundedCar, review: foundedReviews,  user: request.session.user })
    } catch (e) {
        console.log('ERROR:' + e)
    }
})

router.post('/:id/review', isSignedIn,async (request, response) => {
    try {
        await review.create({
            user: request.session.user._id,
            car: request.params.id,
            rating: request.body.rating,
            reviewComment: request.body.reviewComment
        })
        response.redirect(`/lexusCar/${request.params.id}`)
    } catch (e) {
        console.log('ERROR:' + e)
    }
})

router.delete('/:carId/:id/deleteReview', isSignedIn,async (request, response) => {
    try {
        await review.findByIdAndDelete(request.params.id)
        response.redirect(`/lexusCar/${request.params.carId}`)
    } catch (e) {
        console.log('ERROR:' + e)
    }
})

router.delete('/:id', isSignedIn, async (request, response) => {
    try {
        await car.findByIdAndDelete(request.params.id)
        response.redirect('/')
    } catch (e) {
        console.log('ERROR:' + e)
    }
})



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
        if (request.file) {
            request.body.carImage = request.file.filename
        }
        const updatedCarInfo = await car.findByIdAndUpdate(request.params.id, request.body)
        response.redirect('/')
    } catch (e) {
        console.log('ERROR:' + e)
    }
})



module.exports = router;