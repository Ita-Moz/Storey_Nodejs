const products = require('../models/adminData')

//Hiển thị tất cả các sản phẩm
exports.render_product = async (req, res) => {
    try {
        const allProducts = await products.find();
        return res.status(200).render('shop_dong_ho_nam', { data: allProducts });
    }
    catch (err) {
        return err;
    }
}