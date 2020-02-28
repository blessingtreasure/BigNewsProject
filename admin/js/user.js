$(function () {

    // 渲染用户详情信息
    $.ajax({
        type: "get",
        url: BigNew.user_detail,
        success: function (response) {
            if (response.code == 200) {
                $('#inputEmail1').val(response.data.username);
                $('#inputEmail2').val(response.data.nickname);
                $('#inputEmail3').val(response.data.email);
                $('.user_pic').prop('src', response.data.userPic);
                $('#inputEmail4').val(response.data.password);
            }

        }
    });

    // 修改头像
    $('#exampleInputFile').change(function () {
        let file = this.files[0];
        let url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    })

    // 点击提交修改用户详情信息
    $('.btn-edit').click(function (e) {
        e.preventDefault();
        let form = document.querySelector('#form');
        let fd = new FormData(form);
        let xhr = new XMLHttpRequest();
        xhr.open('post', BigNew.user_edit);
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        xhr.send(fd);
        xhr.onload = function () {
            let res = JSON.parse(xhr.responseText);
            if (res.code === 200) {
                alert('修改成功!');
            }
        }
    })


})