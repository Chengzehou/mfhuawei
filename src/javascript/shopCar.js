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
})

$.ajax({
    url: 'http://localhost/HUAWEI_MALL/php/phone.php',
    dataType: 'json'
}).done(function (a) {
    //渲染
    function showtr(sid, num) {
        let strhtml = '';
        for (let i = 0; i < a.length; i++) {//遍历数据库的每条数据
            if (sid == a[i].sid) {//如果存储的sid和后端数据库返回数据相等
                strhtml += `
                <tr class="goodsinfor-con">
                <td><input type="checkbox"></td>
                <td><img src="${a[i].url}" sid="${a[i].sid}" alt=""></td>
                <td>${a[i].phone}</td>
                <td><span>${a[i].gift}</span></td>
                <td>${a[i].price}</td>
                <td><div class="onmany"><span class="down">-</span><input type="text" value="${num}"><span class="up">+</span></div></td>
                <td>0</td>
                <td><span class="del">×</span></td>
                </tr>
                `;
                let node = document.querySelector('.goodsinfor table')
                node.innerHTML += strhtml;
            }
        }
    }
    if (localStorage.getItem('phonesid') && localStorage.getItem('phonenum')) {//当本地存储有值时
        let getsid = localStorage.getItem('phonesid').split(',');//将值（字符串）转换为数组
        let getnum = localStorage.getItem('phonenum').split(',');
        for (let i = 0; i < getsid.length; i++) {//遍历本地存储数组中的每个元素
            showtr(getsid[i], getnum[i]);
        }
    } else {
        $('.shopcar-con').find('.nogoods').css('display', 'block')
    }

    //单一商品总价格
    function onallprice() {
        $('.goodsinfor-con:visible').each(function (index, ele) {//遍历渲染的每一条tr
            //每个tr下面的单价 * 每个tr下面的数量
            let oall = $(ele).find('.onmany').find('input').val() * parseInt($('.goodsinfor-con:visible').find('td').eq(4).html())
            //将总价赋给商品总价
            $(ele).find('td').eq(6).html(oall);
        })
    }
    onallprice()
    //当点击增加或减少按钮时
    $('.goodsinfor-con .up').on('click', function () {
        let num = $(this).parents('.onmany').find('input').val();//将原来的表单值赋给num
        num++;//点一次增加一次
        $(this).parents('.onmany').find('input').val(num);//改变表单的内容
        onallprice()//单一商品总价
        allprice()//商品总价
        localdata($(this))//本地存储
    })
    $('.goodsinfor-con .down').on('click', function () {
        let num = $(this).parents('.onmany').find('input').val();
        num--;
        if (num < 1) {//商品数最少为1
            num = 1
        }
        $(this).parents('.onmany').find('input').val(num);
        onallprice()
        allprice()
        localdata($(this))
    })
    //直接在表单框输入数量时
    $('.onmany input').on('input', function () {
        let reg = /^\d+$/g; //只能是数字
        if (!reg.test($(this).val())) {//不是数字
            $(this).val(1)
        }
        onallprice()
        allprice()
        localdata($(this))
    })

    //选中的商品计算总价和总数量
    function allprice() {
        let num = 0;
        let price = 0;//没有商品选中时为0
        $('.goodsinfor-con:visible').each(function (index, ele) {//遍历每条tr
            if ($(ele).find('td').eq(0).find('input').prop('checked')) {//如果对应商品的input被选中
                price += parseInt($(ele).find('td').eq(6).html());//每条tr内商品总价的和
                num += parseInt($(ele).find('.onmany').find('input').val());//每条tr内商品数量的和
            }
        })
        $('.allmuch span').html(price);
        $('.righttotal p span').html(num);

    }

    //单选
    $('.goodsinfor-con').find(':checkbox').on('click', function () {//所有checkbox添加点击事件
        if ($(this).prop('checked')) {//如果这个checkbox被选中
            onallprice()//单一商品价格
            allprice()//商品总价
        }
        if ($('.goodsinfor-con').find(':checkbox').length === $('.goodsinfor-con').find('td:eq(0)').find('input:checked').size()) {
            //如果tr的总条数 = 被选中的商品数
            $('#all').prop('checked', true);//全选被选中状态
            $('#allgoods').prop('checked', true)
        } else {
            $('#all').prop('checked', false);
            $('#allgoods').prop('checked', false)
        }
        allprice()//商品总价
    })


    //全选

    $('#allgoods').on('click', function () {
        if ($(this).prop('checked')) {
            $('.goodsinfor-con').find(':checkbox').prop('checked', true)
            $('#all').prop('checked', true)
            allprice()
        } else {
            $('.goodsinfor-con').find(':checkbox').prop('checked', false)
            $('#all').prop('checked', false)
            allprice()
        }
    })
    $('#all').on('click', function () {
        if ($(this).prop('checked')) {
            $('.goodsinfor-con').find(':checkbox').prop('checked', true)
            $('#allgoods').prop('checked', true)
            allprice()
        } else {
            $('.goodsinfor-con').find(':checkbox').prop('checked', false)
            $('#allgoods').prop('checked', false)
            allprice()
        }
    })

    //本地存储
    let arrsid = [];
    let arrnum = [];
    function local() {
        if (localStorage.getItem('phonesid') && localStorage.getItem('phonenum')) {
            arrsid = localStorage.getItem('phonesid').split(',');
            arrnum = localStorage.getItem('phonenum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }
    function localdata(obj) {
        local();
        let sid = obj.parents('.goodsinfor-con').find('img').attr('sid');
        arrnum[arrsid.indexOf(sid)] = obj.parents('.goodsinfor-con').find('.onmany').find('input').val();
        localStorage.setItem('phonenum', arrnum)
    }

    //删除
    $('.goodsinfor-con .del').on('click', function () {
        if (window.confirm('确定要删除该商品吗？')) {
            local();
            let delsid = $(this).parents('.goodsinfor-con').find('img').attr('sid');
            arrsid.splice(arrsid.indexOf(delsid), 1);
            arrnum.splice(arrnum.indexOf(delsid), 1);
            localStorage.setItem('phonesid', arrsid)
            localStorage.setItem('phonenum', arrnum)
            window.location.reload()
        }

    })

    //删除选中元素
    $('.total .select button').on('click', function () {
        if (window.confirm('确定要删除选中的商品吗？')) {
            local();
            $('.goodsinfor-con').each(function () {
                if ($(this).find('input:checkbox').is(':checked')) {
                    let delsid = $(this).parents('.goodsinfor-con').find('img').attr('sid');
                    arrsid.splice(arrsid.indexOf(delsid), 1);
                    arrnum.splice(arrnum.indexOf(delsid), 1);
                    localStorage.setItem('phonesid', arrsid)
                    localStorage.setItem('phonenum', arrnum)
                    window.location.reload()
                }
            })

        }
    })

});




