$(function () {
    $.ajax({
        type: "get",
        url: BigNew.category_list,
        dataType: "json",
        success: function (response) {
            console.log(response);

        }
    });

})