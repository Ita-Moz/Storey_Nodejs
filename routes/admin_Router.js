const router = require('express').Router();
let controller = require('../controllers/admin_controller');
const accountController = require('../controllers/account_controller');
// Quản lí Products
    // Xử lí giao diện
router.get('/dashboard', controller.show);
router.get('/find-val-update/:id', controller.val_update);
    //Xử lí chức năng
router.post('/add',controller.add);
router.delete('/deleted/:id/:image',controller.deleted);
router.get('/search/:name',controller.search);
router.put('/update/:id',controller.update);


//-------------------------------------------------------------------------------------

//Quản lí tài khoản User, Admin
    //Xử lí giao diện
router.get('/dashboard/quan-ly-user', accountController.viewAccUser);
router.get('/login', accountController.login);
router.get('/val-update/:id', accountController.val_update);

    // Xử lí chức năng
router.post('/quan-ly-user/add-user', accountController.addUser);
router.delete('/quan-ly-user/delete-user/:id', accountController.delUser);
router.put('/quan-ly-user/edit-user/:id',accountController.editUser);
router.get('/quan-ly-user/search-user/:taikhoan',accountController.searchUser);

module.exports = router
