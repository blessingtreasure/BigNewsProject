$(function () {
    // 获取编辑过来的id值
    let articleId = location.search.split('=')[1];
    console.log(articleId)
    // 渲染数据
    $.ajax({
        type: "get",
        url: BigNew.article_search,
        data: {
            id: articleId
        },
        dataType: "json",
        success: function (response) {
            console.log(response)
            if (response.code === 200) {
                let article = template('article', response.data)
                $('body').html(article);
                // // 标题
                // $('#inputTitle').val(response.data.title);
                // // 封面
                // $('.article_cover').attr('src', response.data.cover);
                // 文章类别
                // $('.form-control category').val(response.data.categoryId);
                // $.ajax({
                //     type: "get",
                //     url: BigNew.category_search,
                //     data: {
                //         id: response.data.categoryId
                //     },
                //     dataType: "json",
                //     success: function (response) {
                //         console.log(response)
                //         $('.category').val(response.data.name);
                //     }
                // });
            }
        }
    });

})