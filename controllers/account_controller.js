let accUser = require("../models/accountUser");

//Truyền giá trị vào modal
exports.val_update = async (req, res) => {
    try {
        let userValUpdate = await accUser.findOne({ _id: req.params.id });
        return res.status(200).send(userValUpdate)
    }
    catch (err) {
        return err;
    }
}

//Đăng kí user
exports.addUser = (req, res) => {
    accUser.create({
        tennguoidung: req.body.tennguoidung,
        tentaikhoan: req.body.tentaikhoan,
        matkhau: req.body.matkhau,
        email: req.body.email,
    })
        .then(() => {
            res.redirect("http://localhost:3000/Storey/dashboard/quan-ly-user")
        })
        .catch((err) => {
            console.log(err)
        })
};


//Xóa User khỏi database
exports.delUser = async (req, res) => {
    try {
        await accUser.deleteOne({ _id: req.params.id })
        return await res.status(200).send();
    }
    catch (err) {
        return res.json(err);
    }
};

//Sửa tài khoản User
exports.editUser = async (req, res) => {
    try {
        console.log(req.body.tennguoidung)
        await accUser.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                tennguoidung: req.body.tennguoidung,
                tentaikhoan: req.body.tentaikhoan,
                matkhau: req.body.matkhau,
                email: req.body.email,
            }
        }, (err, docs) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Updated User : ", docs);
                return res.status(200).send();
            }
        })

    }
    catch (err) {
        return res.json(err);
    }

};

// Hàm xử lí tìm kiếm nhiều sản phẩm có bằng (TAIKHOAN)
exports.searchUser = async (req, res) => {
    try {
        let allSearch = await accUser.find({ tentaikhoan: req.params.taikhoan });
        if (allSearch.length == 0) {
            res.send("Tài khoản không tồn tại!!!");
        } else {
            return res.status(200).render('search_user', { array: allSearch });
        }
    }
    catch (err) {
        return err;
    }
}

exports.login = (req, res) => {
    res.render("dangnhap_dangky");
};




//View quản lí accUser
exports.viewAccUser = (req, res) => {
    accUser.find((err, data) => {
        if (err) {
            res.json("Lỗi :(")
        } else {
            res.render('quan_ly_user', { accountUser: data })
        }
    })


}