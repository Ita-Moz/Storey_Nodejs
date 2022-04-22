const router = require('express').Router();
let controller = require('../controllers/admin_controller');

// Xử lí giao diện
router.get('/',(req,res)=>{
    res.render('user_trang_chu')
})

module.exports = router
