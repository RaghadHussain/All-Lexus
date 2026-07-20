const router = require("express").Router() 
const car = require('../models/LexusCar')
const Dealer = require('../models/Dealer')


router.get('/', async (request, response) => {
    try {
        const lexusCar = await car.find().populate('dealer')
    response.render('homepage.ejs', { car: lexusCar })
    } catch (e) {
        console.log('ERROR:'+ e)
    }
    
})

module.exports = router;
