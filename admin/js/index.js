$(function () {


    $.ajax({
        type: "get",
        url: BigNew.user_info,
        // 根据token值判断用户
        // headers: {
        //     // Authorization: localStorage.getItem('token')
        // },
        dataType: "json",
        success: function (response) {
            if (response.code === 200) {
                // 设置用户名称
                $('.user_info span').text(`欢迎${response.data.nickname}`)
                // 设置用户名头像
                $('.user_info img,.user_center_link img').prop('src', response.data.userPic);
                // $('.user_center_link img').prop('src', response.data.userPic);
            }
        }
    });

    // 退出登录，并且删除token值
    $('.logout').click(function () {
        $('.modal').modal();

        $('.modal-footer button').click(function () {
            if ($(this).attr('data-id') === '1') {
                localStorage.removeItem('token');
                location.href = './login.html';
            }
        })

    })

    // 菜单栏切换操作
    $('.level01').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).next().hasClass('level02')) {
            $('#main_body iframe').attr('src', 'article_list.html');
            $('.level02').slideToggle();
            $(this).find('b').toggleClass('rotate0');
        } else {
            $('.level02').slideUp();
        }
        $('.level02 li').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
        })
    })


})