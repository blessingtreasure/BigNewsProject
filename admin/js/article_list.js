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
        console.log($('#selCategory option:selected').val())
        e.preventDefault();
        $.ajax({
            type: "get",
            url: BigNew.article_query,
            data: {
                type: $('#selCategory option:selected').val(),
                state: $('#selStatus option:selected').val(),
                perpage: 8, //显示条数
                page: 1 //当前页

            },
            dataType: "json",
            success: function (response) {
                console.log(response)

                // 返回总页数
                let totalpage = response.data.totalPage;

                // 没有搜索到的情况
                if (response.data.data.length == 0) {
                    let res = template('search', {});
                    $('tbody').html(res);
                } else {
                    let obj = template('article', response.data);
                    $('tbody').html(obj);
                }


            }
        });
    })
    $('#btnSearch').click();

    // 点击翻页操作
    $('.pagination li').click(function () {

        $(this).addClass('active').siblings().removeClass('active');

    })

})