// function addcookie(key, value, days) {
//     var d = new Date();
//     d.setDate(d.getDate() + days);
//     document.cookie = `${key}=${encodeURIComponent(value)};expires=${d}`;
// }


// function getcookie(key) {
//     let cookiearr = decodeURIComponent(document.cookie).split('; ');
//     for (let i = 0; i < cookiearr.length; i++) {
//         console.log(cookiearr[i].split('='));
//         let newarr = cookiearr[i].split('=');
//         if (key === newarr[0]) {
//             return newarr[1];
//         }
//     }
// }

// function delcookie(key) {
//     addcookie(key, '', -1);
// }

//对象写法：比全局函数写法更优，避免一些命名冲突。
//命名空间的写法。
let jscookie = {
    add: function (key, value, days) {
        var d = new Date();
        d.setDate(d.getDate() + days);
        document.cookie = `${key}=${encodeURIComponent(value)};expires=${d}`;
    },
    get: function (key) {
        let cookiearr = decodeURIComponent(document.cookie).split('; ');
        for (let i = 0; i < cookiearr.length; i++) {
            console.log(cookiearr[i].split('='));
            let newarr = cookiearr[i].split('=');
            if (key === newarr[0]) {
                return newarr[1];
            }
        }
    },
    del: function (key) {
        jscookie.add(key, '', -1);
    }
}

