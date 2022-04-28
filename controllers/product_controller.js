const products = require('../models/adminData')

//Hiển thị tất cả các sản phẩm
exports.render_product = async (req, res) => {
    try {
        const allProducts = await products.find({ loai: 'Nam' });
        return res.status(200).render('shop_dong_ho_nam', { data: allProducts });
    }
    catch (err) {
        return err;
    }
}
// Get chi tiết sản phẩm 
exports.detail_product = async (req, res) => {
    try {
        let detailProducts = await products.findOne({ _id: req.params.id });
        let priceProduct = await detailProducts.price;
        const likeProducts = await products.find({ price: { $lte: await priceProduct } }).limit(10);
        return await res.status(200).render('shop_chi_tiet_san_pham', { listdetail: detailProducts, likelist: likeProducts });
    }
    catch (err) {
        return err;
    }
}
// Get các sản phẩm bán chạy trang home
exports.home_product = async (req, res) => {
    try {
        const homeProducts = await products.find().limit(6);
        return res.status(200).render('shop_home', { list: homeProducts });
    }
    catch (err) {
        return err;
    }
}
