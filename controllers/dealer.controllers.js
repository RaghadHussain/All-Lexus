const router = require("express").Router()
const Dealer = require('../models/Dealer')
const LexusCar = require("../models/LexusCar")


router.get('/myCars', async (request, response) => {
    try {
        if (request.session.user.isDealer) {
            const myCars = await LexusCar.find({ dealer: request.session.isDealer }).populate('dealer')
            response.render('dealers/dealerAllCars.ejs',{car: myCars})
        }
    } catch (e) {
        console.log('ERROR: ' + e)
    }
})


router.get('/account', async (request, response)=>{
     try {
        if (request.session.user.isDealer) {
            const dealerInfo = await Dealer.findById(request.session.isDealer)
            response.render('dealers/viewDealerInfo.ejs',{dealer: dealerInfo})
        }
    } catch (e) {
        console.log('ERROR: ' + e)
    }
})


router.get('/:id/edit', async (request, response) => {
    try {
        const foundedDealer = await Dealer.findById(request.params.id)
        response.render('dealers/editDealerInfo.ejs', { dealer: foundedDealer })
    } catch (e) {
        console.log('ERROR:' + e)
    }
})

router.put('/:id/edit', async (request, response) => {
    try {
        const updatedDealerInfo = await dealer.findByIdAndUpdate(request.params.id, request.body)
        response.redirect('/dealer/account')
    } catch (e) {
        console.log('ERROR:' + e)
    }
})

module.exports = router;