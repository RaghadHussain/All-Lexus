const router = require("express").Router() 
const User = require('../models/User')

router.get('/', async (request, response) => {
    try {
    const foundedUser = await User.findById(request.session.user._id)
    response.render('userProfile.ejs', { user: foundedUser })
    } catch (e) {
        console.log('ERROR:'+ e)
    }
    
})

router.delete('/:id', (request, response) => {
    try { 
        await User.findByIdAndDelete(request.params.id)
        response.redirect('/')
    } catch (e) {
        console.log('ERROR:'+ e)
    }
    
})


module.exports = router;
