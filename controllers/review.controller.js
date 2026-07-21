const router = require("express").Router() 
const review = require('../models/Review')


router.get('/', async (request, response) => {
    try {
    const foundedReviews = await review.find().populate('user')
    response.render('homepage.ejs', { car: lexusCar })
    } catch (e) {
        console.log('ERROR:'+ e)
    }
    
})

module.exports = router;
