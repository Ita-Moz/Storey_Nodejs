const router = require('express').Router();
let controller = require('../controllers/product_controller');

// Render giao diện SHOP
router.get('/', (req, res) => {
    res.render('shop_home')
})
router.get('/gioi-thieu', (req, res) => {
    res.render('shop_gioi_thieu')
})
router.get('/huong-dan-mua-hang', (req, res) => {
    res.render('shop_huong_dan_mua_hang')
})
router.get('/thanh-toan', (req, res) => {
    res.render('shop_thanh_toan')
})
router.get('/lien-he', (req, res) => {
    res.render('shop_lien_he')
})
router.get('/doi-mat-khau', (req, res) => {
    res.render('shop_doi_mat_khau')
})
router.get('/gio-hang', (req, res) => {
    res.render('shop_gio_hang')
})
router.get('/chi-tiet-san-pham/:id', controller.detail_product)
router.get('/dong-ho-nam', controller.render_product)
router.get('/dong-ho-nu', (req, res) => {
    res.render('shop_dong_ho_nu')
})
router.get('/*', (req, res) => {
    res.render('shop_error_404')
})

//Xử lí chức năng


module.exports = router
