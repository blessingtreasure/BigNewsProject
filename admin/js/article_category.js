$(function () {

    // 封装渲染数据函数
    function load() {
        $.ajax({
            type: "get",
            url: BigNew.category_list,
            dataType: "json",
            success: function (response) {
                let obj = template("category", response);
                $("tbody").html(obj);
            }
        });
    }
    // 渲染文章分类数据
    load();

    // 新增分类
    $('#xinzengfenlei').click(function () {

        // 修改 新增弹窗窗口的样式
        $('#categoryModal').on('show.bs.modal', function (e) {
            $('.modal-title').text('新增操作');
            $('#recipient-name').val('');
            $('#message-text').val('');
            $('.modal-footer button').eq(1).attr('class', 'btn btn-success');
            $('.modal-footer button').eq(1).text('新增分类');
        })
        // 弹出窗口
        $('#categoryModal').modal();

    })

    // 编辑分类
    $('tbody').on('click', '.btn-info', function () {
        let name = $(this).parent().prev().prev().text().trim();
        let slug = $(this).parent().prev().text().trim();
        let id = $(this).attr('data-id');
        // 修改 新增弹窗窗口的样式
        $('#categoryModal').on('show.bs.modal', function (e) {
            $('#recipient-name').val(name);
            $('#message-text').val(slug);
            $('.btn-primary').attr('data-id', id);
            $('.modal-title').text('修改操作');
            $('.modal-footer button').eq(1).attr('class', 'btn btn-primary');
            $('.modal-footer button').eq(1).text('保存修改');
        })
        // 弹出窗口
        $('#categoryModal').modal();
    })

    // 根据按钮名称判断是新增还是编辑的处理
    //      功能1：新增文章分类操作
    //      功能2：编辑文章分类操作
    $('.modal-footer button').eq(1).click(function () {

        // 这是新增操作的操作
        if ($(this).text() === '新增分类') {
            $.ajax({
                type: "post",
                url: BigNew.category_add,
                data: {
                    name: $('#recipient-name').val().trim(), //类名
                    slug: $('#message-text').val().trim() //别称
                },
                dataType: "json",
                success: function (response) {
                    if (response.code === 201) {
                        // 引用message插件
                        $.message({
                            message: '添加成功',
                            type: 'success'
                        });
                        // 关闭窗口
                        $('#categoryModal').modal('hide');
                        // 重新渲染数据
                        load();
                    }

                }
            });
        } else {
            $.ajax({
                type: "post",
                url: BigNew.category_edit,
                data: {
                    // name: form 表单的第一个 input 的值
                    name: $('form input').eq(0).val().trim(),
                    // name: form 表单的第二个 input 的值
                    slug: $('form input').eq(1).val().trim(),
                    // id: 编辑按钮上的 data-id 自定义属性的值
                    id: $(this).attr('data-id')
                },
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    $.message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    $('#categoryModal').modal('hide');
                    load();
                }
            });

        }
    })

    // 删除分类
    $('tbody').on('click', '.btn-danger', function () {
        if (confirm("确定要删除该类别吗？")) {
            $.ajax({
                type: "post",
                url: BigNew.category_delete,
                data: {
                    id: $(this).attr('data-id')
                },
                dataType: "json",
                success: function (response) {
                    if (response.code === 204) {
                        $.message({
                            message: '成功删除',
                            type: 'success'
                        });
                    }

                    load();
                }
            });
        }
    })


})