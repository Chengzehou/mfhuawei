(function () {
    let flag1 = false;//标记
    let flag2 = false;
    let flag3 = false;
    let flag4 = false;
    let flag5 = false;
    //获取用户名输入框
    $('#inputName3').on('blur', function () {
        if ($('#inputName3').val() !== '') {
            $.ajax({
                type: 'post',
                url: 'http://localhost/HUAWEI_MALL/php/userRegister.php',
                data: {
                    username: $('#inputName3').val()
                }
            }).done(function (a) {
                if (!a) {//后端返回空，也就是查询数据库中没有此用户名
                    let username = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/g;//中文、英文、数字包括下划线
                    if (username.test($('#inputName3').val())) {
                        $('.inputname3').removeClass('has-error');
                        $('.inputname3').addClass('has-success');
                        $('.inputname3').find('span').html('√');
                        flag1 = true;
                    } else {
                        $('.inputname3').removeClass('has-success');
                        $('.inputname3').addClass('has-error');
                        $('.inputname3').find('span').html('请输入中英文和数字、下划线组成的字符串');
                        flag1 = false;
                    }
                } else {
                    $('.inputname3').removeClass('has-success');
                    $('.inputname3').addClass('has-error');
                    $('.inputname3').find('span').html('用户名已存在');
                    flag1 = false;
                }
            })
        } else {
            $('.inputname3').removeClass('has-success');
            $('.inputname3').addClass('has-error');
            $('.inputname3').find('span').html('用户名不能为空');
            flag1 = false;
        }

    });
    //获取手机输入框
    $('#inputPhone3').on('blur', function () {
        if ($('#inputPhone3').val() !== '') {
            let userphone = /^([1][3,4,5,6,7,8,9])\d{9}$/g;//1开头，第二位3,5,6,7,8,9，往后9个数字
            if (userphone.test($('#inputPhone3').val())) {
                $('.inputphone3').removeClass('has-error');
                $('.inputphone3').addClass('has-success');
                $('.inputphone3').find('span').html('√');
                flag2 = true;
            } else {
                $('.inputphone3').removeClass('has-success');
                $('.inputphone3').addClass('has-error');
                $('.inputphone3').find('span').html('请输入正确的手机号码');
                flag2 = false;
            }
        } else {
            $('.inputphone3').removeClass('has-success');
            $('.inputphone3').addClass('has-error');
            $('.inputphone3').find('span').html('手机号不能为空');
            flag2 = false;
        }
    });
    //获取身份证输入框
    $('#inputIdcard3').on('blur', function () {
        if ($('#inputIdcard3').val() !== '') {
            let userid = /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/g;//18位，数字或字母X结尾
            if (userid.test($('#inputIdcard3').val())) {
                $('.inputidcard3').removeClass('has-error');
                $('.inputidcard3').addClass('has-success');
                $('.inputidcard3').find('span').html('√');
                flag3 = true;
            } else {
                $('.inputidcard3').removeClass('has-success');
                $('.inputidcard3').addClass('has-error');
                $('.inputidcard3').find('span').html('请输入正确的身份证号');
                flag3 = false;
            }
        } else {
            $('.inputidcard3').removeClass('has-success');
            $('.inputidcard3').addClass('has-error');
            $('.inputidcard3').find('span').html('身份证不能为空');
            flag3 = false;
        }
    });
    //获取密码输入框
    $('#inputPassword3').on('input', function () {
        let teshu = /[%^&',;=?$]+/g;//特殊字符
        let regnum = /[0-9]+/g;  //数字
        let reguppercase = /[A-Z]+/g;//大写
        let reglowercase = /[a-z]+/g;//小写
        let count = 0;//统计种类
        if ($('#inputPassword3').val().length >= 6 && $('#inputPassword3').val().length <= 12) {//6~12位
            flag4 = true;
            if (teshu.test($('#inputPassword3').val())) {
                count++
            }
            if (regnum.test($('#inputPassword3').val())) {
                count++
            }
            if (reguppercase.test($('#inputPassword3').val())) {
                count++
            }
            if (reglowercase.test($('#inputPassword3').val())) {
                count++
            }
            switch (count) {
                case 1:
                    $('.inputpassword3').removeClass('has-error');
                    $('.inputpassword3').addClass('has-success');
                    $('.inputpassword3').find('span').html('弱');
                    break;
                case 2:
                case 3:
                    $('.inputpassword3').removeClass('has-error');
                    $('.inputpassword3').addClass('has-success');
                    $('.inputpassword3').find('span').html('中');
                    break;
                case 4:
                    $('.inputpassword3').removeClass('has-error');
                    $('.inputpassword3').addClass('has-success');
                    $('.inputpassword3').find('span').html('强');
                    break;
            }

        } else {
            $('.inputpassword3').removeClass('has-success');
            $('.inputpassword3').addClass('has-error');
            $('.inputpassword3').find('span').html('请输入6~12位密码');
            flag4 = false;
        }
    });
    $('#inputPassword3').on('blur', function () {
        if ($('#inputPassword3').val() !== '') {
            if (flag4) {
                $('.inputpassword3').removeClass('has-error');
                $('.inputpassword3').addClass('has-success');
                $('.inputpassword3').find('span').html('√');
            } else {
                $('.inputpassword3').removeClass('has-success');
                $('.inputpassword3').addClass('has-error');
                $('.inputpassword3').find('span').html('密码格式有误');
                flag4 = false;
            }
        } else {
            $('.inputpassword3').removeClass('has-success');
            $('.inputpassword3').addClass('has-error');
            $('.inputpassword3').find('span').html('请输入密码');
            flag4 = false;
        }
    })
    //再次输入密码框
    $('#inputPassword4').on('blur', function () {
        if ($('#inputPassword4').val() !== '') {
            if ($('#inputPassword4').val() === $('#inputPassword3').val()) {
                $('.inputpassword4').removeClass('has-error');
                $('.inputpassword4').addClass('has-success');
                $('.inputpassword4').find('span').html('√');
                flag5 = true;
            } else {
                $('.inputpassword4').removeClass('has-success');
                $('.inputpassword4').addClass('has-error');
                $('.inputpassword4').find('span').html('两次输入密码不同');
                flag5 = false;
            }
        } else {
            $('.inputpassword4').removeClass('has-success');
            $('.inputpassword4').addClass('has-error');
            $('.inputpassword4').find('span').html('请输入密码');
            flag5 = false;
        }
    })

    //提交按钮
    $('#subbtn').on('click', function () {
        if (!flag1 || !flag2 || !flag3 || !flag4 || !flag5) {
            return false;
        }
    })





})();