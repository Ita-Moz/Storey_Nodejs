const router = require('express').Router();
let controller = require('../controllers/admin_controller');

// Xử lí giao diện
router.get('/',(req,res)=>{
    res.render('shop_home')
})

module.exports = router
