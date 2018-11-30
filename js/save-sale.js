$(function () {
    //商品内容渲染
    var id = getQueryString('id');
    console.log(id);

    $.ajax({
        url: 'http://localhost:9090/api/getmoneyctrlproduct',
        data: {
            productid: id
        },
        success: function (data) {
            //console.log(data);
            var html = template('productInfoTpl', data);
            $('#main').html(html);
            //console.log(html);
        }
    });

    //返回顶部
    $('.go-top-btn').on('tap', function () {
        goTOP();
    })

    // 回到顶部
    function goTOP() {
        //$(window).scrollTop(0);
        var elem = window;
        //获取当前scrollTop的位置
        var curScroll = $(elem).scrollTop();
        //上升的位移
        var speed = 30;
        if (curScroll > 0) {
            setInterval(timer, 1);
        }
        //console.log(curScroll);
        function timer() {
            if (curScroll > 0) {
                curScroll = curScroll - speed;
                $(elem).scrollTop(curScroll);
                //console.log(curScroll);
                if (curScroll <= 0) {
                    $(elem).scrollTop(0);
                    clearInterval(timer);
                    //console.log("清除计时器")
                }
            }
        }
    }
});


//别人使用正则写的获取url地址栏参数的方法
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        // 用了另一种转码方式 我们是默认转码方式 使用decodeURI
        // return unescape(r[2]);
        return decodeURI(r[2]);
    }
    return null;
}
