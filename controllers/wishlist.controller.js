const router = require("express").Router() 
const wishlist = require('../models/Wishlist')


router.get('/', async (request, response) => {
    try {
    const foundedWishlist = await wishlist.find({ user: request.session.user._id }).populate('user car')
        
    response.render('wishlist/wishlist.ejs', { wishlist: foundedWishlist })
    } catch (e) {
        console.log('ERROR:'+ e)
    }
    
})

router.post('/:id', async (request, response)=>{
try {
   const createdWishlist =  await wishlist.create({
        user: request.session.user._id,
        car: request.params.id
    })
    response.redirect(`/lexusCar/${request.params.id}`)
    console.log(createdWishlist)
} catch (e) {
    console.log('ERROR: '+ e)
}
})

router.delete('/:id', async (request, response) => {
    try {
        await wishlist.findByIdAndDelete(request.params.id)
        response.redirect('/wishlist')
    } catch (e) {
        console.log('ERROR:' + e)
    }
})

module.exports = router;