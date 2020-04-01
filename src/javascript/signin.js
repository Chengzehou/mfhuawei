$('#sub').on('click', function () {
    if ($('#inputname3').val() !== '' && $('#inputPassword3').val() !== '') {
        $.ajax({
            type:'post',
            url: 'http://localhost/HUAWEI_MALL/php/signin.php',
            data: {
                username: $('#inputname3').val(),
                password: $('#inputPassword3').val()
            }
        }).done(function (a) {
            if (!a) {
                alert('登录失败，用户名或者密码错误');
            } else {
                location.href = 'index.html';
                //存储cookie
                jscookie.add('loginname', $('#inputname3').val(), 7)
            }
        })
    } else {
        alert('请输入账号和密码')
    }
})