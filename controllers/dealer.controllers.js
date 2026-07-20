const router = require("express").Router()
const Dealer = require('../models/Dealer')
const LexusCar = require("../models/LexusCar")


router.get('/', (req, res) => {
    res.render('homepage.ejs')
})


// View Cars 
router.get('/myCars', async (request, response) => {
    try {
        if (req.session.user.isDealer) {
            const myCars = await LexusCar.find({ dealer: request.session.isDealer }).populate('dealer')
            response.render('dealerAllCars.ejs',{car: myCars})
        }
    } catch (e) {
        console.log('ERROR: ' + e)
    }
})


// View account details
router.get('/account', async (request, response)=>{
     try {
        if (req.session.user.isDealer) {
            const dealerInfo = await Dealer.findById(request.session.isDealer)
            response.render('viewDealerInfo.ejs',{dealer: dealerInfo})
        }
    } catch (e) {
        console.log('ERROR: ' + e)
    }
})


//Delete Rout
router.delete('/:id', async (request, response) => {
    try {
        await dealer.findByIdAndDelete(request.params.id)
        response.redirect('/')
    } catch (e) {
        console.log('ERROR:' + e)
    }
})



//Edit Routs 
router.get('/:id/edit', async (request, response) => {
    try {
        const foundedDealer = await car.findById(request.params.id)
        response.render('dealers/editDealerInfo.ejs', { dealer: foundedDealer })
    } catch (e) {
        console.log('ERROR:' + e)
    }
})

router.put('/:id/edit', async (request, response) => {
    try {
        const updatedDealerInfo = await dealer.findByIdAndUpdate(request.params.id, request.body)
        response.redirect('/account')
    } catch (e) {
        console.log('ERROR:' + e)
    }
})

module.exports = router;