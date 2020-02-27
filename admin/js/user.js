$(function () {
    // 添加ajax 全局配置，将除去首页的所有页面的请求头添加token
    $.ajaxSetup({
        beforeSend: function (xhr) {
            if (location.href.indexOf('admin/login.html') === -1) {
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            }
        }
    })
    // http://localhost:8080/api/v1

    $('.btn btn-success btn-edit').click(function (e) {
        e.preventDefault();
        let form = document.querySelector('#form');
        let fd = new FormData(form);
        $.ajax({
            type: "post",
            url: "http://localhost:8080/api/v1/admin/user/edit",
            data: fd,
            dataType: "dataType",
            success: function (response) {
                console.log(response);


            }
        });
    })


})