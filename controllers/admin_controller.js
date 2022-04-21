let fs = require('fs')
let products = require('../models/adminData')

//multer
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
var upload = multer({
    storage: storage,
    limits: {
        fieldNameSize: 300,
        fileSize: 10 * 1024 * 1024, // 10 Mb
    },
    fileFilter: function (req, file, cb) {
        console.log(file);
        cb(null, true)
    }
}).single("txtFile");

//Hiển thị tất cả các sản phẩm
exports.show = async (req, res) => {
    try {
        const allProducts = await products.find();
        return res.status(200).render('dashboard', { danhsach: allProducts });
    }
    catch (err) {
        return err;
    }
}

// show View thêm sản phẩm
exports.add_show = (req, res) => {
    res.render('add_product')
}

// Truyền giá trị mặc định cho modal update
exports.val_update = async (req, res) => {
    try {
        let productValUpdate = await products.findOne({ _id: req.params.id });
        return res.status(200).send(productValUpdate)
    }
    catch (err) {
        return err;
    }
}

// Hàm xử lí thêm sản phẩm và upload file
exports.add = (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("Error when uploading.");
        } else if (err) {
            console.log("An unknown error " + err);
        } else {
            products.create({
                name: req.body.txtName,
                image: req.file.filename,
                soluong: req.body.txtSoluong,
                price: req.body.txtPrice,
                describe: req.body.txtDescribe,
            })
                .then(() => {
                    res.redirect("http://localhost:3000/Storey/dashboard")
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    });
}

// Hàm xử lí tìm kiếm nhiều sản phẩm có bằng (NAME)
exports.search = async (req, res) => {
    try {
        let allSearch = await products.find({ name: req.params.name });
        return res.status(200).render('search_admin', { array: allSearch });
    }
    catch (err) {
        return err;
    }
}

// Hàm xử lí xoá sản phẩm và xoá file ảnh của sản phẩm bên server
exports.deleted = async (req, res) => {

    try {
        await products.deleteMany({ _id: req.params.id })
        const productsList = await this.show(req, res);
        // GỠ FILE TRÊN SERVER
        let path = `./public/image/${req.params.image}`
        fs.unlink(path, function (err) {

            if (err && err.code == 'ENOENT') {
                // Lỗi tìm không thấy tệp, tệp không tồn tại.
                console.info("File doesn't exist, won't remove it.");
            } else if (err) {
                // Đã xảy ra lỗi khi xóa tệp
                console.error("Error occurred while trying to remove file");
            } else {
                console.info(`Đã xoá 1 ảnh trong server`);
            }
        });

        return await res.status(200).send();
    }
    catch (err) {
        return res.json(err);
    }

}

// Hàm xử lí chỉnh sửa sản phẩm
exports.update =(req, res) => {
    products.findOneAndUpdate({ _id: req.params.id },{$set:{
        name: req.body.name,
        price: req.body.price,
        describe: req.body.describe,
        soluong: req.body.soluong,
    }} , (err, docs) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send();
            console.log("Updated User : ", docs);
        }
    })

}

