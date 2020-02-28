$(function () {

    // 渲染用户详情信息
    $.ajax({
        type: "get",
        url: BigNew.user_detail,
        success: function (response) {
            $('#inputEmail1').val(response.data.username);
            $('#inputEmail2').val(response.data.nickname);
            $('#inputEmail3').val(response.data.email);
            $('.user_pic').prop('src', response.data.userPic);
            $('#inputEmail4').val(response.data.password);
        }
    });

    // 点击修改用户详情信息
    $('.btn btn-success btn-edit').click(function (e) {
        e.preventDefault();
        let form = document.querySelector('#form');
        let fd = new FormData(form);
        $.ajax({
            type: "post",
            url: BigNew.user_edit,
            data: fd,
            dataType: "dataType",
            success: function (response) {
                console.log(response);


            }
        });
    })


})