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

//定义几个数组，用来存放列表数据
let arr_default = [];
let arr = [];
let bofore = null;
let after = null;

$.ajax({
    url: 'http://localhost/HUAWEI_MALL/php/moreGoods.php',
    dataType: 'json'
}).done(function (a) {
    let $htmlcon = '<ul>';
    $.each(a, function (index, value) {
        $htmlcon += `
        <li>
            <div>
                <a href="ginformation.html?sid=${value.sid}" target="_blank">
                    <p class="phone-img">
                        <img class="lazy" data-original="${value.url}"/>
                    </p>
                    <p class="phone-name">${value.phone}</p>
                    <p class="phone-price">￥${value.price}</p>
                    <p class="phone-sale">${value.gift}</p>
                </a>
            </div>
        </li>
        `;
    })
    $htmlcon += '</ul>';
    $('.phonelist').html($htmlcon);

    //将每个li对象存放进数组
    $('.phonelist li').each(function (index, element) {
        arr_default[index] = $(this);
        arr[index] = $(this);
    })

    lazy();
})


//分页
//告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get和page)
$('.page').pagination({
    pageCount: 2,//总的页数
    jump: true,//是否开启跳转到指定的页数，布尔值。
    coping: true,//是否开启首页和尾页，布尔值。
    prevContent: '上一页',
    nextContent: '下一页',
    homePage: '首页',
    endPage: '尾页',
    callback: function (api) {
        $.ajax({
            url: 'http://localhost/HUAWEI_MALL/php/moreGoods.php',
            data: {
                page: api.getCurrent()//获取的页码给后端
            },
            dataType: 'json'
        }).done(function (a) {
            let $htmlcon = '<ul>';
            $.each(a, function (index, value) {
                $htmlcon += `
                    <li>
                        <div>
                            <a href="ginformation.html?sid=${value.sid}" target="_blank">
                                <p class="phone-img">
                                    <img class="lazy" data-original="${value.url}"/>
                                </p>
                                <p class="phone-name">${value.phone}</p>
                                <p class="phone-price">￥${value.price}</p>
                                <p class="phone-sale">${value.gift}</p>
                            </a>
                        </div>
                    </li>
                    `;
            })
            $htmlcon += '</ul>';
            $('.phonelist').html($htmlcon);

            //将每个li对象存放进数组
            $('.phonelist li').each(function (index, element) {
                arr_default[index] = $(this);
                arr[index] = $(this);
            })

            lazy();
        })
    }
});

function lazy() {
    //懒加载
    $(function () {//和拼接的元素放在一起。
        $("img.lazy").lazyload({
            effect: "fadeIn"//图片显示方式
        });
    });
}

//当点击默认按钮时
$('.moren').on('click', function () {
    $('.phonelist ul').empty();//清空原来的li
    $.each(arr_default, function (index, value) {
        $('.phonelist ul').append(value);//将默认的arr_default遍历添加到ul标签中
    })
    lazy();
})
$('.lh').on('click', function () {//当点击低高按钮时
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {//冒泡排序
            before = parseInt(arr[j].find('.phone-price').html().substring(1));//获取价格
            after = parseInt(arr[j + 1].find('.phone-price').html().substring(1));
            if (before > after) {//由小到大
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    $('.phonelist ul').empty();
    $.each(arr, function (index, value) {
        $('.phonelist ul').append(value);//将从小到大排好的新数组，添加到ul
    })
    lazy();
})
$('.hl').on('click', function () {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            before = parseInt(arr[j].find('.phone-price').html().substring(1));
            after = parseInt(arr[j + 1].find('.phone-price').html().substring(1));
            if (before < after) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    $('.phonelist ul').empty();
    $.each(arr, function (index, value) {
        $('.phonelist ul').append(value);
    })
    lazy();
})



//进入购物车(localStorage本地存储)



