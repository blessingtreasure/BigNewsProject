$(function () {

    // 渲染用户详情信息
    $.ajax({
        type: "get",
        url: BigNew.user_detail,
        success: function (response) {
            if (response.code == 200) {
                // $('input.username').val(response.data.username);
                // $('input.nickname').val(response.data.nickname);
                // $('input.email').val(response.data.email);
                // $('input.userPic').prop('src', response.data.userPic);
                // $('input.password').val(response.data.password);

                // 简化处理
                // 使用for...in 遍历对象
                let obj = response.data;
                for (let key in response.data) {
                    $(`input.${key}`).val(obj[key]);
                }
                // 对图片进行单独处理
                $('.user_pic').prop('src', obj.userPic);
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

        // let form = document.querySelector('#form');
        // 方法2:
        // 每个表单元素，都可以通过 this.form 获取它所在的表单域元素(即form)
        let fd = new FormData(this.form);
        let xhr = new XMLHttpRequest();
        xhr.open('post', BigNew.user_edit);
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        xhr.send(fd);
        xhr.onload = function () {
            let res = JSON.parse(xhr.responseText);
            if (res.code === 200) {
                alert('修改成功!');
                // 因为当前窗口是在iframe里面 属于 index.html 里面的 子页面
                //  window.parent 这种用法用于获取iframe 标签的父窗口
                // window.parent.location.reload();
                // 强制刷新会导致页面跳转，用户体验不好，所以我们使用ajax 对元素进行局部更新
                // 获取当前iframe 页面的头像图片
                let imgsrc = $('.user_pic').attr('src');
                let str = $('#inputEmail2').val();
                console.log(str);

                // 修改父级页面的头像
                window.parent.$('.user_info img,.user_center_link img').attr('src', imgsrc);
                window.parent.$('.user_info span').text(str);

            }
        }
    })


})