$('.div1').load('publichead.html', function () {
    //头部购物车数量
    (function () {
        if (localStorage.getItem('phonenum')) {
            let arrnum = localStorage.getItem('phonenum').split(',');
            let sum = 0;
            $.each(arrnum, function (index, value) {
                sum += parseInt(value);
            })
            $('.topcon-cart span').html(sum).css("color", 'red')
        }
    })();
});
$('.div3').load('publicfoot.html', function () {
    (function () {
        let index = 0;
        let w = $('.youqinglianj-con ol').width();//获取友情链接里面ol的宽度
        $('.yqlj-btn1').css('cursor', 'pointer');//给按钮添加样式，鼠标进入手型
        $('.yqlj-btn2').css('cursor', 'pointer');
        $('.yqlj-btn1').on('click', function () {//给左边按钮添加点击事件
            $('.yqlj-btn2').css('backgroundPosition', '-66px 0');//当点击左按钮时，右按钮显示颜色
            if (index !== 0) {//如果标记不等于零，也就是说移动的ol个数不为零时
                index--;//ol个数减1，复制到目标margin-left
                $('.youqinglianj-con').animate({ marginLeft: - (w * index) + 'px' }, 300);
            } else {//否则，也就是说ol移动的个数是零时，按钮颜色变暗；
                $('.yqlj-btn1').css('backgroundPosition', '-96px 0');
            }
        })
        $('.yqlj-btn2').on('click', function () {
            $('.yqlj-btn1').css('backgroundPosition', '-76px 0');//当点击右按钮时，左按钮显示颜色
            if (index !== $('.youqinglianj-con ol').length - 1) {//当移动的ol个数不等于ol的个数-1时（因为index初始为0）
                index++;
                $('.youqinglianj-con').animate({ marginLeft: - (w * index) + 'px' }, 300);
            } else {//否则，也就是到头时，按钮颜色变暗；
                $('.yqlj-btn2').css('backgroundPosition', '-86px 0');
            }
        })

    })();
});

//获取moreGoods所点击的手机详情  渲染商品详情
!function () {
    let $sid = location.search.substring(1).split('=')[1];
    if (!$sid) {
        alert('抱歉，未找到你查找的商品...')
    }
    $.ajax({
        url: 'http://localhost/HUAWEI_MALL/php/ginformation-get.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function (a) {
        $('title').html(a.phone)
        $('.right-con .phonename').html(a.phone)
        $('.right-con .phonegift span').html(a.gift)
        $('.right-con .phoneprice-con').html(a.price)
        //渲染小图列表
        let spurl = a.morepicture.split(',');
        $('.spicture').attr('src', spurl[0])
        $('.bpicture').attr('src', spurl[0])
        let strhtml = '';
        $.each(spurl, function (index, value) {
            strhtml += `
            <li>
                <a href="">
                    <img src="${value}">
                </a>
            </li>
            `;
        })
        $('.phoneimgnav-con ul').html(strhtml);
    })
}();

//商品放大镜效果
(function () {
    //比例 小图/小放 = 大图/大放 => 小放=小图*大放/大图
    let bl = $('.bpicture').width() / $('.spicture').width();
    //小放大镜尺寸
    $('.sf').css({ width: $('.spicture').width() * $('.bf').width() / $('.bpicture').width(), height: $('.spicture').height() * $('.bf').height() / $('.bpicture').height() });
    //获取小图片，添加hover移入移出事件
    $('.spicturea').hover(function () {
        //鼠标移入，小放大镜显示
        $('.sf').css('visibility', 'visible');
        $('.bf').css('visibility', 'visible');
        //小放大镜跟随鼠标移动
        $(this).on('mousemove', function (ev) {
            let $leftvalue = ev.pageX - $('.spicture').offset().left - $('.sf').width() / 2;
            let $topvalue = ev.pageY - $('.spicture').offset().top - $('.sf').height() / 2;
            if ($leftvalue < 0) {
                $leftvalue = 0;
            } else if ($leftvalue >= $('.spicture').width() - $('.sf').width()) {
                $leftvalue = $('.spicture').width() - $('.sf').width()
            }
            if ($topvalue < 0) {
                $topvalue = 0
            } else if ($topvalue >= $('.spicture').height() - $('.sf').height()) {
                $topvalue = $('.spicture').height() - $('.sf').height()
            }
            $('.sf').css({
                left: $leftvalue,
                top: $topvalue
            })
            $('.bpicture').css({
                left: -$leftvalue * bl,
                top: -$topvalue * bl
            })
        })
    }, function () {
        $('.sf').css('visibility', 'hidden');
        $('.bf').css('visibility', 'hidden');
    })
})();

//图片导航左右翻页按钮
(function () {
    //鼠标移动到那张图片就显示那张图片
    $('.phoneimgnav-con ul').on('mouseover', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');//给鼠标移动过的图片添加样式
        let activeurl = $(this).find('img').attr('src');//获取图片地址
        $('.spicture').attr('src', activeurl);
        $('.bpicture').attr('src', activeurl);
    })
    let num = 5;//列表显示5张图片

    $('.rightbtn').on('click', function () {
        //移动距离
        let distance = $('.phoneimgnav-con ul li').eq(0).outerWidth(true);
        if ($('.phoneimgnav-con ul li').length > num) {//当图片的个数多于5张时，才出发
            num++;
            $('.phoneimgnav-con ul').animate({
                marginLeft: -(num - 5) * distance
            })
        }
    })
    $('.leftbtn').on('click', function () {
        let distance = $('.phoneimgnav-con ul li').eq(0).outerWidth(true);
        if (num > 5) {//如果num>5,则右按钮触发，左按钮便可以使用
            num--;
            $('.phoneimgnav-con ul').animate({
                marginLeft: -(num - 5) * distance
            })
        }
    })
})();


//加入购物车（localStorage）
!function () {
    let num = parseInt($('.howmany .many').val());
    let arrsid = [];
    let arrnum = [];
    let sid = location.search.substring(1).split('=')[1];
    $('.howmany .many').val(num);//默认1
    $('.howmany .up').on('click', function () {
        num++;
        $('.howmany .many').val(num)
    })
    $('.howmany .down').on('click', function () {
        if (num > 1) {
            num--;
            $('.howmany .many').val(num)
        }
    })

    $('.inthecar').on('click', function () {
        if (localStorage.getItem('phonesid') && localStorage.getItem('phonenum')) {//当本地存储有值时
            arrsid = localStorage.getItem('phonesid').split(',');
            arrnum = localStorage.getItem('phonenum').split(',');
        } else {//没有值时
            arrsid = [];
            arrnum = [];
        }
        if (arrsid.indexOf(sid) == -1) {//arrsid里面没有本商品的sid时
            arrsid.push(sid);
            arrnum.push(num);
            localStorage.setItem('phonesid', arrsid)
            localStorage.setItem('phonenum', arrnum)
        } else {
            let adarrnum = parseInt(arrnum[arrsid.indexOf(sid)]) + parseInt($('.howmany .many').val());//对应索引数量增加
            arrnum[arrsid.indexOf(sid)] = adarrnum;
            localStorage.setItem('phonenum', arrnum)
        }
        alert('成功加入购物车')
    })
}();