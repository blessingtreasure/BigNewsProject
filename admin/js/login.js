$(function () {
    $('.input_sub').click(function (e) {
      e.preventDefault();
      let user = $('.input_txt').val().trim();
      let pwd = $('.input_pass').val().trim();
      if (user !== '') {
        $.ajax({
          type: "post",
          url: "http://localhost:8080/api/v1/admin/user/login",
          data: {
            username: user,
            password: pwd
          },
          dataType: "json",
          success: function (response) {
            // 如果登录成功
            if (response.code === 200) {
              localStorage.setItem('token', response.token);
              // 登录成功的跳转
              window.location.href = './index.html';
            } else {
              $('.modal').modal();
              $('.modal-body p').text(response.msg);

            }

          }
        });
      } else {
        $('.modal').modal();
        $('.modal-body p').text('用户名不能为空哦');
      }

    })
  })