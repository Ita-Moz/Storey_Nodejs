$(document).ready(function () {
  //click delete
  $('button.btn_delete').click(function () {
    const id = $(this).attr('data-id');
    const image = $(this).attr('data-image');

    if (confirm("Bạn có chắc chắn muốn xoá sản phẩm này - " + id) == true) {
      $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/Storey/deleted/' + id + "/" + image,
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

  //Open modal add product
  $('#btnAddProduct').click(function(){
    $('#myModalAddProduct').modal('show');
  })

  // Mở modal và nhận giá trị truyền từ view vào modal
  $("button.btn_edit").click(function (event) {
    $('div#myModalEdit').modal('show');
    const id = $(this).attr("data-id");
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/Storey/find-val-update/" + id,
      success: function (response) {
        $('#btnSave').attr("data-id", response._id)
        $('#tensanpham').val(response.name)
        $('#loai').val(response.loai)
        $('#mota').val(response.describe)
        $('#soluong').val(response.soluong)
        $('#gia').val(response.price)
      }
    });
  })

  //Click Update
  $("#btnSave").click(function () {
    const id = $(this).attr('data-id');
    var data = {
      name: $("#tensanpham").val(),
      describe: $("#mota").val(),
      loai: $("#loai").val(),
      price: $("#gia").val(),
      soluong: $("#soluong").val(),
      image: $("#hinhanhsanpham").val(),
    }
    if (confirm("Bạn có chắc chắn muốn cập nhật sản phẩm này - " + id) == true) {
      $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/Storey/update/' + id,
        dataType: 'json',
        data: data,
        success: function (response) {
          $("div#myModalEdit").modal("hide");
          alert("Cập nhật thành công");
          location.reload();
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
      url: 'http://localhost:3000/Storey/search/' + txtsearch,
      success: function (response) {
        $('.products-row').hide('div')
        $("div#addRowSeach").html(response);
        //
        $('button.btn_delete').click(function () {
          const id = $(this).attr('data-id');
          const image = $(this).attr('data-image');

          if (confirm("Bạn có chắc chắn muốn xoá sản phẩm này - " + id) == true) {
            $.ajax({
              type: 'DELETE',
              url: 'http://localhost:3000/Storey/deleted/' + id + "/" + image,
              success: function (response) {
                location.reload();
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
            url: "http://localhost:3000/Storey/find-val-update/" + id,
            success: function (response) {
              $('#btnSave').attr("data-id", response._id)
              $('#tensanpham').val(response.name)
              $('#mota').val(response.describe)
              $('#soluong').val(response.soluong)
              $('#gia').val(response.price)
            }
          });
        })
        $("#btnSave").click(function () {
          const id = $(this).attr('data-id');
          var data = {
            name: $("#tensanpham").val(),
            describe: $("#mota").val(),
            loai: $("#loai").val(),
            price: $("#gia").val(),
            soluong: $("#soluong").val(),
            image: $("#hinhanhsanpham").val(),
          }
          if (confirm("Bạn có chắc chắn muốn cập nhật sản phẩm này - " + id) == true) {
            $.ajax({
              type: 'PUT',
              url: 'http://localhost:3000/Storey/update/' + id,
              dataType: 'json',
              data: data,
              success: function (response) {
                $("div#myModalEdit").modal("hide");
                alert("Cập nhật thành công");
                location.reload("back");
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