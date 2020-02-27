$(function () {
    /* 沙箱模式 */
    (function (w) {
        var baseURL = 'http://localhost:8080/api/v1';
        var BigNew = {
            baseURL: baseURL, //基地址
            user_login: baseURL + '/admin/user/login', //用户登录
            user_info: baseURL + '/admin/user/info', //用户信息
            user_detail: baseURL + '/admin/user/detail', //用户详情
            user_edit: baseURL + '/admin/user/edit', //用户编辑
            category_list: baseURL + '/admin/category/list', //文章类别查询
            category_add: baseURL + '/admin/category/add', //文章类别新增
            category_search: baseURL + '/admin/category/search', //文章类别搜索
            category_edit: baseURL + '/admin/category/edit', //文章类别编辑
            category_delete: baseURL + '/admin/category/delete', //文章类别删除
            article_query: baseURL + '/admin/article/query', //文章搜索
            article_publish: baseURL + '/admin/article/publish', //文章发布
            article_search: baseURL + '/admin/article/search', //文章信息查询
            article_edit: baseURL + '/admin/article/edit', //文章编辑
            article_delete: baseURL + '/admin/article/delete', //文章删除
            comment_list: baseURL + '/admin/comment/search', //文章评论列表
            comment_pass: baseURL + '/admin/comment/pass', //文章评论通过
            comment_reject: baseURL + '/admin/comment/reject', //文章评论不通过
            comment_delete: baseURL + '/admin/comment/delete', //文章评论删除
        };

        //暴露接口
        w.BigNew = BigNew;
    })(window);

    console.log(BigNew.user_login);

    // 添加ajax 全局配置，将除去首页的所有页面的请求头添加token
    $.ajaxSetup({
        beforeSend: function (xhr) {
            if (location.href.indexOf('admin/login.html') === -1) {
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            }
        }
    })
    // http://localhost:8080/api/v1
    $.ajax({
        type: "get",
        url: BigNew.user_info,
        // 根据token值判断用户
        // headers: {
        //     // Authorization: localStorage.getItem('token')
        // },
        dataType: "json",
        success: function (response) {
            console.log(response);

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
        localStorage.removeItem('token');
        location.href = './login.html';
    })

})