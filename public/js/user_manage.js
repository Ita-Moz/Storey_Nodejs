$(document).ready(function () {
    //click delete user
    $('button.btn_delete').click(function () {
        const id = $(this).attr('data-id');

        if (confirm("Bạn có chắc chắn muốn xoá tài khoản này - " + id) == true) {
            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:3000/Storey/quan-ly-user/delete-user/' + id,
                success: function (response) {
                    $('.delete-row' + id).remove('div')
                    alert("Xoá thành công ")
                },
                error: function (err) {
                    console.log(err);
                }
            });
        } else {
            console.log("404")
        }
    })

    //Xử lí Update
    // Mở modal và nhận giá trị truyền từ view vào modal
    $("button.btn_edit").click(function (event) {
        $('div#myModalEdit').modal('show');
        const id = $(this).attr("data-id");
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/Storey/val-update/" + id,
            success: function (response) {
                $('#btnSave').attr("data-id", response._id)
                $('#tennguoidung').val(response.tennguoidung)
                $('#taikhoan').val(response.tentaikhoan)
                $('#matkhau').val(response.matkhau)
                $('#email').val(response.email)
            }
        });
    })
    //Click Update User
    $("#btnSave").click(function () {
        const id = $(this).attr('data-id');
        var data = {
            tennguoidung: $("#tennguoidung").val(),
            tentaikhoan: $("#taikhoan").val(),
            matkhau: $("#matkhau").val(),
            email: $("#email").val(),
        }
        if (confirm("Bạn có chắc chắn muốn cập nhật tài khoản này - " + id) == true) {
            $.ajax({
                type: 'PUT',
                url: 'http://localhost:3000/Storey/quan-ly-user/edit-user/' + id,
                dataType: 'json',
                data: data,
                success: function (response) {
                    $("div#myModalEdit").modal("hide");
                    alert("Cập nhật thành công");
                },
                error: function (err) {
                    console.log(err);
                }
            });
        } else {
            console.log("404");
        }
    });

    //click find
    $('.search-bar').blur(() => {
        let txtsearch = $('.search-bar').val();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/Storey/quan-ly-user/search-user/' + txtsearch,
            success: function (response) {
                $('.products-row').hide('div')
                $("div#addRowSeach").html(response);
                //
                $('button.btn_delete').click(function () {
                    const id = $(this).attr('data-id');

                    if (confirm("Bạn có chắc chắn muốn xoá tài khoản này - " + id) == true) {
                        $.ajax({
                            type: 'DELETE',
                            url: 'http://localhost:3000/Storey/quan-ly-user/delete-user/' + id,
                            success: function (response) {
                                $('.delete-row' + id).remove('div')
                                alert("Xoá thành công ")
                            },
                            error: function (err) {
                                console.log(err);
                            }
                        });
                    } else {
                        console.log("404")
                    }
                })
                //
                $("button.btn_edit").click(function (event) {
                    $('div#myModalEdit').modal('show');
                    const id = $(this).attr("data-id");
                    $.ajax({
                        type: "GET",
                        url: "http://localhost:3000/Storey/val-update/" + id,
                        success: function (response) {
                            $('#btnSave').attr("data-id", response._id)
                            $('#tennguoidung').val(response.tennguoidung)
                            $('#taikhoan').val(response.tentaikhoan)
                            $('#matkhau').val(response.matkhau)
                            $('#email').val(response.email)
                        }
                    });
                })
                $("#btnSave").click(function () {
                    const id = $(this).attr('data-id');
                    var data = {
                        tennguoidung: $("#tennguoidung").val(),
                        tentaikhoan: $("#taikhoan").val(),
                        matkhau: $("#matkhau").val(),
                        email: $("#email").val(),
                    }
                    if (confirm("Bạn có chắc chắn muốn cập nhật tài khoản này - " + id) == true) {
                        $.ajax({
                            type: 'PUT',
                            url: 'http://localhost:3000/Storey/quan-ly-user/edit-user/' + id,
                            dataType: 'json',
                            data: data,
                            success: function (response) {
                                $("div#myModalEdit").modal("hide");
                                alert("Cập nhật thành công");
                            },
                            error: function (err) {
                                console.log(err);
                            }
                        });
                    } else {
                        console.log("404");
                    }
                });

            },
            error: function (err) {
                console.log(err);
            }
        });
    })

});