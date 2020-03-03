$(function () {
    // 默认开始显示的文章 ，见底部
    let totalpage = 0;
    // 获取分类
    $.ajax({
        type: "get",
        url: BigNew.category_list,
        dataType: "json",
        success: function (response) {
            let obj = template('category_list', response);
            $('#selCategory').html(obj)

        }
    });

    // 点击搜索
    $('#btnSearch').click(function (e) {
        e.preventDefault();
        // 搜索加载的数据
        $.ajax({
            type: "get",
            url: BigNew.article_query,
            data: {
                key: '',
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                perpage: 10, //显示条数
                page: 1 //当前页
            },
            dataType: "json",
            success: function (response) {

                // 没有搜索到的情况
                if (response.data.data.length == 0) {
                    let res = template('search', {});
                    $('tbody').html(res);

                } else {
                    let obj = template('article', response.data);
                    $('tbody').html(obj);

                    // 调用分页插件 
                    $("#myPage").sPage({
                        showTotal: true, //是否显示总条数，默认关闭：false
                        showSkip: true, //是否显示跳页，默认关闭：false
                        page: 1, //当前页码，必填            
                        pageSize: 10, //每页显示多少条数据，默认10条               
                        total: response.data.totalCount, //数据总条数,后台返回     
                        backFun: function (page) { //点击分页按钮回调函数，返回当前页码  
                            // console.log(page) 
                            // 调用分页函数                 
                            ajaxPage(page);

                        }
                    });


                }

            }
        });
    })
    $('#btnSearch').click();


    // 翻页操作函数
    function ajaxPage(page) {
        let p = page || 1;
        $.ajax({
            type: "get",
            url: BigNew.article_query,
            data: {
                key: '',
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                perpage: 10, //显示条数
                page: p //当前页
            },
            dataType: "json",
            success: function (response) {
                let obj = template('article', response.data);
                $('tbody').html(obj);

            },
            error: function (e) {
                console.log(e);
            }
        });
    }

})