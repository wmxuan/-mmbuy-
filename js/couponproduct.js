$(function () {
    var couponid = getQueryString('couponid');
    // console.log(couponid);
    var coupon = new Coupon(couponid)
    coupon.queryProduct()
    coupon.renderNav();
    coupon.rollTop();
    coupon.areaRoll();
    coupon.slideSwitch()
})
// 创建一个构造函数
var Coupon = function (couponid) {
    this.couponid = couponid;


}
Coupon.prototype = {
    /* 渲染页面 */
    queryProduct: function () {
        var that = this;
        $.ajax({
            type: "get",
            url: 'http://localhost:9090/api/getcouponproduct',

            data: {
                couponid: that.couponid
            },
            success: function (data) {

                // 3. 拿到数据调用模板生成html
                var html = template('goodsListTpl', data);
                // 4. 把html渲染到页面
                $('.product-list').html(html);

            }

        })
    },
    /* 渲染导航条 */
    renderNav: function () {
        var that = this;
        // console.log(this);

        if (that.couponid == 0) {
            $("#header h1").text("肯德基优惠详情");
            $('.discount-footer').append(' <a href="JavaScript:;">肯德基优惠券</a>')
        } else if (that.couponid == 1) {
            $("#header h1").text("必胜客优惠详情");

            $('.discount-footer').append(' <a href="JavaScript:;0">必胜客优惠券</a>')
        } else if (that.couponid == 2) {
            $("#header h1").text("棒约翰优惠详情");

            $('.discount-footer').append(' <a href="JavaScript:;">棒约翰优惠券</a>')
        } else if (that.couponid == 3) {
            $("#header h1").text("哈根达斯优惠详情");

            $('.discount-footer').append(' <a href="JavaScript:;">哈根达斯优惠券</a>')
        }
    },
    /* 返回顶部 */
    rollTop: function () {
        $(".goTop").on('tap', function () {

            mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 1000); //100毫秒滚动到顶
        });
    },
    /* 区域滚动 */
    areaRoll: function () {
        mui('.mui-scroll-wrapper').scroll({
            //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            deceleration: 0.0005,

        });
    },
    /* 轮播图开关 */
    slideSwitch: function () {

        $('.product-list').on('tap', '.liList ', function () {
            $('#slide').show();
            //获得slider插件对象
            var gallery = mui('.mui-slider');


            gallery.slider({
                interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
            });


        })
        $('#slide').on('tap', '.close ', function () {
            $('#slide').hide();


        })
    }
}

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