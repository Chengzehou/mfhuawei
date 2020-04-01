//banner
(function () {
    $.ajax({//连接后端php，获取数据库中图片内容
        url: 'http://localhost/HUAWEI_MALL/php/banner.php',
        dataType: 'json',//输出位json格式
    }).done(function (a) {
        //1.给banner对应元素添加内容
        let con = '';
        for (let i = 0; i < a.length; i++) {//a.length为数据库中图片的个数
            let url = a[i]["img"];
            con += `
                <li>
                    <a>
                        <img src="${url}">
                    </a>
                </li>
            `;
        }
        $(".bannerimg").html(con);
        //2.让banner图片居中显示
        let $left = '-' + $('.bannerimg img').width();//图片的宽
        $('.bannerimg li').css('marginLeft', $left / 2);
        //3.给控制轮播的元素添加内容
        let con1 = '';
        for (let i = 0; i < a.length; i++) {
            con1 += `
                <span></span>
            `;
        }
        $('.ban-control').html(con1);
        //4.当鼠标移入控制按钮时时
        $('.ban-control span').hover(function () {
            $(this).addClass('hover').siblings().removeClass('hover');//给相应的span添加hover类名，其他的去掉hover类名
            $('.bannerimg li').eq($(this).index()).animate({ opacity: '1' }, 300).siblings().stop().animate({ opacity: '0' }, 300);
            //鼠标移入的span与之对应的索引值赋给banner图，让对应的banner图透明度为1，动画为3毫秒，其他的取消队列，并且其他的banner图透明度为0；
        }, function () {
        });
        //5.给banner中控制左右切换的标签添加点击事件
        $('.banner-con .a2').on('click', function () {
            let $index = $('.ban-control .hover').index();//存取已经hover的轮播按钮的索引
            $index++ //每点击一次 +1
            if ($index > $('.ban-control span').length - 1) {//如果值大于控制按钮的个数，也就是图片的数量，因为索引从零开始，所以-1
                $index = 0;//赋值0；也就是切换到第一张图
            }
            //将索引值赋给banner图，让对应的banner图透明度为1，动画为3毫秒，其他的取消队列，并且其他的banner图透明度为0；
            $('.bannerimg li').eq($index).animate({ opacity: '1' }, 300).siblings().stop().animate({ opacity: '0' }, 300);
            //给相应的span添加hover类名，其他的去掉hover类名
            $('.ban-control span').eq($index).addClass('hover').siblings().removeClass('hover');
        })
        //6.给左边添加点击事件
        $('.banner-con .a1').on('click', function () {
            let $index = $('.ban-control .hover').index();
            $index--
            if ($index < 0) {
                $index = $('.ban-control span').length - 1;
            }
            $('.bannerimg li').eq($index).animate({ opacity: '1' }, 300).siblings().stop().animate({ opacity: '0' }, 300);
            $('.ban-control span').eq($index).addClass('hover').siblings().removeClass('hover');
        })
        $('.banner-con .a2').click();
        //设置自动轮播
        let timer = setInterval(() => {
            $('.banner-con .a2').click();//每3s自动点击右切换按钮
        }, 3000);


        $('.banner-con').on('mouseover', function () {
            clearInterval(timer);//当鼠标移入banner区域时，停止自动轮播
        });

        $('.banner-con').on('mouseout', function () {
            timer = setInterval(() => {
                $('.banner-con .a2').click()//当鼠标移出banner区域时，自动轮播
            }, 3000);
        })

    })
})();

//navigation
(function () {
    $.ajax({//导入navigation.php文件获取的列表图片数据
        url: 'http://localhost/HUAWEI_MALL/php/navigation.php',
        dataType: 'json'
    }).done(function (a) {
        //定义一个标签字符串
        var appendStr = "<ul>";
        for (let i = 0; i < a.length; i++) {//循环数据的条数次数
            if (i % 5 == 0 && i != 0) {//当是5的倍数且不等于0时
                appendStr += "</ul><ul>";//创建一个新的ul标签
            }
            appendStr += `<li>
                           <a href="moreGoods.html" target="_blank">
                                <img src="${a[i].url}">
                               <p>${a[i].phonename}</p>
                            </a>
                         </li>`;
        }
        appendStr += "</ul>";
        //找到元素
        let navigation = document.querySelectorAll('.hoverlist');
        for (let j = 0; j < navigation.length; j++) {//每个元素下都添加appendStr这个内容
            navigation[j].innerHTML = appendStr;
        }
    }

    );
    class Listhover {
        constructor() {
            this.hoverlist = document.querySelectorAll('.hoverlist');
            this.hoverobj = document.querySelectorAll('.navigation li')
            this.navigation = document.querySelector('.navigation');
        }
        //当鼠标移入列表时，显示对应列表的二级菜单
        init() {
            for (let i = 0; i < this.hoverobj.length; i++) {
                this.hoverobj[i].onmouseover = () => {
                    for (let j = 0; j < this.hoverobj.length; j++) {
                        this.hoverlist[j].style.display = 'none';//移入时所有，不显示
                    }
                    this.hoverlist[i].style.display = 'block';//对应的显示
                    this.navigation.style.borderRadius = '10px 0 0 10px'
                }
                this.hoverobj[i].onmouseout = () => {
                    for (let j = 0; j < this.hoverobj.length; j++) {
                        this.hoverlist[j].style.display = 'none';//移除时都不显示
                    }
                    this.navigation.style.borderRadius = '10px'
                }
            }
        }
    }
    new Listhover().init();
})();

//user3notice
(function () {
    const onewnot = document.querySelector('.newnot ul');
    let speed = 43;
    let t1 = null;
    function tab() {
        let timer = setInterval(() => {
            speed--;
            onewnot.style.marginTop = speed + 'px';
            if (-speed % 43 == 0) {
                clearInterval(timer);
                setTimeout(() => {
                    tab();
                }, 2000);
            }
            if (-speed >= 258) {
                onewnot.style.marginTop = 0 + 'px';
                speed = 0;
            }
        }, 20)
    }
    tab();

})();

//classify
(function () {
    $.ajax({
        url: 'http://localhost/HUAWEI_MALL/php/classify.php',
        dataType: 'json'
    }).done(function (a) {
        class Classify {
            constructor() {
                this.classify = document.querySelector('.classify');
                this.ul = '<ul>';
            }
            init() {
                for (let i = 0; i < a.length; i++) {
                    this.ul += `
                        <li>
                            <a href="moreGoods.html" target="_blank">
                            <img src="${a[i].url}" alt="">
                            </a>
                        </li>
                    `;
                }
                this.ul += '</ul>'
                this.classify.innerHTML = this.ul;
            }
        }
        new Classify().init();
    })

})();

//phone
(function () {
    $.ajax({
        url: 'http://localhost/HUAWEI_MALL/php/phone.php',
        dataType: 'json',//输出位json格式
    }).done(function (phone) {
        // console.log(phone.length)   //20;
        class Phones {
            constructor() {
                this.phoneList = document.querySelectorAll('.phonemis .phone-list');
                this.con = '';
            }
            init() {
                for (let i = 0; i < phone.length; i++) {
                    if (phone[i].sid == 1) {
                        this.con = `
                            <li>
                            <a>
                                <img src="${phone[i].url}" />
                            </a>
                            </li>
                        `;
                    } else {
                        this.con += `
                        <li>
                            <a href="ginformation.html?sid=${phone[i].sid}" target="_blank">
                                <div class="phone-img">
                                    <p>
                                    <img class="lazy" data-original="${phone[i].url}"/>
                                    </p>
                                </div>
                                <div class="phone-name">${phone[i].phone}</div>
                                <p class="phone-gift">${phone[i].gift}</p>
                                <p class="phone-price">¥${phone[i].price}</p>
                            </a>
                        </li>
                    `;
                    }
                }
                for (let i = 0; i < this.phoneList.length; i++) {
                    this.phoneList[i].innerHTML = this.con;
                }

            }
        }
        new Phones().init();
        //懒加载
        $(function () {//和拼接的元素放在一起。
            $("img.lazy").lazyload({
                effect: "fadeIn"//图片显示方式
            });
        });
    });
})();

//youqinglianj
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

//用户登录
(function () {
    if (jscookie.get('loginname')) {
        $('.topcon-right').find('.tusername').eq(1).css('display', 'block');
        $('.topcon-right').find('.tusername').eq(0).css('display', 'none');
        $('.userinput .userget').eq(0).css('display', 'none')
        $('.userinput .userget').eq(1).css('display', 'block')
        $('.topcon-right').find('.tusername').eq(1).find('a:eq(0)').html(jscookie.get('loginname'));
        $('.userinput .userget').eq(1).find('a:eq(0)').html(jscookie.get('loginname'));
    }
    $('.goout').on('click', function () {
        $('.topcon-right').find('.tusername').eq(1).css('display', 'none');
        $('.topcon-right').find('.tusername').eq(0).css('display', 'block');
        $('.userinput .userget').eq(0).css('display', 'block')
        $('.userinput .userget').eq(1).css('display', 'none')
        jscookie.del('loginname')
    })
})();

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

//顶部悬浮
(function () {
    $(window).on('scroll', function () {//滚轮事件
        console.log($(window).scrollTop());//获取匹配元素相对滚动条顶部的偏移
        let $top = $(window).scrollTop();
        let $box = $('.topxf');
        if ($top >= 126) {
            $box.stop(true).animate({//清除对列
                top: 0
            });
        } else {
            $box.stop(true).animate({//清除对列
                top: -60
            });
        }
    });
})();

//侧边导航
(function () {
    let $louceng = $('body>.phone');//所有楼层元素
    //调节高度，背景停留位置
    $('.loutibg')
    //返回顶部
    $('.backtop').on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        });
        $('.loutibg').animate({
            height: 50
        })
    })
    //当触发滚动条时，页面到达哪个楼层，切换哪个背景
    $(window).on('scroll', function () {
        let $top = $(window).scrollTop();
        //$('title').html($top)
        if ($top < 378) {
            //console.log(1)
            $('.loutibg').stop(true).animate({//对应的背景颜色
                height: 50
            })
        }
        if ($top > 378 && $top < 1764) {
            //console.log(2)
            $('.loutibg').stop(true).animate({//对应的背景颜色
                height: 102
            })
        }
        if ($top > 1764 && $top <3024) {
            //console.log(3)
            $('.loutibg').stop(true).animate({//对应的背景颜色
                height: 152
            })

        }
        if ($top >3024 && $top <4410) {
            $('.loutibg').stop(true).animate({//对应的背景颜色
                height: 203
            })
        }
        if ($top > 4410) {
            $('.loutibg').stop(true).animate({//对应的背景颜色
                height: 254
            })
        }
    })
    //当点击相应按钮时，页面到达相应的楼层
    $('.louti .adrive').on('click', function () {//给每个相对应的按钮添加点击事件
        let $top = $louceng.eq($(this).index() - 1).offset().top;//点击按钮的索引位置-1，就是对应的楼层索引，获取高度
        $('html,body').stop(true).animate({
            scrollTop: $top
        });
        $('.loutibg').stop(true).animate({//对应的背景颜色
            height: 51 * ($(this).index() + 1)
        })
    })
    //返回底部
    $('.backbot').on('click', function () {
        $('html,body').stop(true).animate({
            scrollTop: 4867
        });
        $('.loutibg').stop(true).animate({//使用animate过程中带有溢出隐藏
            height: 254
        })
    })
})();