$(function () {
    // 文章类别渲染
    $.ajax({
        type: "get",
        url: BigNew.category_list,
        dataType: "json",
        success: function (response) {
            let obj = template('category', response);
            $('tbody').html(obj);
        }
    });

    // 点击新增文章类别
    $('#xinzengfenlei').click(function (e) {
        // 显示模态框
        $('.myModal').modal()
        $('.confirm').click(function () {
            // $('#myModal').hide();
        })

    });
})