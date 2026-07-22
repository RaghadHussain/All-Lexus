const router = require("express").Router()
const Dealer = require('../models/Dealer')
const LexusCar = require("../models/LexusCar")
const User = require('../models/User')
const isSignedIn = require('../middleware/is-signed-in')



router.get('/myCars', isSignedIn, async (request, response) => {
    try {
        if (request.session.user.isdealer) {
            const myCars = await LexusCar.find({ dealer: request.session.user.isdealer})
            console.log(myCars)
            response.render('dealers/dealerAllCars.ejs',{car: myCars})
        }
    } catch (e) {
        console.log('ERROR: ' + e)
    }
})


router.get('/account', async (request, response)=>{
     try {
        if (request.session.user.isdealer) {
            const dealerInfo = await User.findById(request.session.user._id).populate('dealerId')
            // console.log(dealerInfo)
            response.render('dealers/viewDealerInfo.ejs',{dealer: dealerInfo})
        }
    } catch (e) {
        console.log('ERROR: ' + e)
    }
})


router.get('/:id/edit', async (request, response) => {
    try {
        const foundedDealer = await Dealer.findById(request.params.id)
        console.log(foundedDealer)
        response.render('dealers/editDealerInfo.ejs', { dealer: foundedDealer })
    } catch (e) {
        console.log('ERROR:' + e)
    }
})

router.put('/:id/edit', async (request, response) => {
    try {
        const updatedDealerInfo = await Dealer.findByIdAndUpdate(request.params.id, request.body)
        console.log(updatedDealerInfo)
        response.redirect('/dealer/account')
    } catch (e) {
        console.log('ERROR:', e)
    }
})

module.exports = router;