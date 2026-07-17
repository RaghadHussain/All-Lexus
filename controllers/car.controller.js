const router = require("express").Router()
const car = require('../models/LexusCar')


router.get('/new',(request,response)=>{
    response.render('cars/addNewCar.ejs')
})

router.post('/new', async ()=>{
    
})

module.exports = router;