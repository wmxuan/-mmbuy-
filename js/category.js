/* 比较搜索的js文件 */
$(function () {

    var mmbuy = new Manmanbuy();
    mmbuy.getCategoryTitle();
    mmbuy.getCategoryList();
    mmbuy.goProductList();
    mmbuy.toTop();
});

// 慢慢买构造函数
function Manmanbuy() {

}

//根链接
Manmanbuy.prototype.baseURL = "http://localhost:9090";

// 获取分类标题
Manmanbuy.prototype.getCategoryTitle = function () {
    var that = this;

    $.ajax({
        url: that.baseURL+"/api/getcategorytitle",
        data: {},
        dataType: "json",
        success: function (resp) {
            // 渲染分类标题
            var html = template("categoryTitleTpl", resp);
            $("#main .title").html(html);
        }
    });
}

//获取分类列表
Manmanbuy.prototype.getCategoryList = function(){
    var that = this;

    // 给标题中的a标签注册点击事件
    $("#main .title").on("tap", "li>a", function () {
        // 获取分类标题的id
        var titleId = $(this).data("title-id");
        // 获取a链接对应的产品
        var product = $(this).siblings(".product");

        // 根据分类标题id请求产品列表
        $.ajax({
            url: that.baseURL+"/api/getcategory",
            data: {
                titleid: titleId
            },
            dataType: "json",
            success: function (resp) {
                // 渲染分类列表
                var html = template("categoryListTpl", resp);
                product.html(html);
            }
        });
    });
}

//去到商品页面
Manmanbuy.prototype.goProductList = function(){
    var that = this;

    // 给标题中的a标签注册点击事件
    $("#main .title").on("tap", ".product div>a", function () {
        // 获取分类的id
        var categoryId = $(this).data("category-id");
        console.log(categoryId);

        //跳转到商品列表页面
        location = that.baseURL+"/productList.html?categoryid="+categoryId;
    });
}

//返回顶部
Manmanbuy.prototype.toTop = function () {

    // 返回顶部注册点击事件,返回顶部
    $(".to-top").on("tap", function () {
           
            var elem = window;
            //获取当前scrollTop的位置
            var curScroll = $(elem).scrollTop();

            //上升的位移
            var speed = 3;
            if (curScroll > 0) {
                setInterval(timer, 1);
            }
            
            function timer() {
                if (curScroll > 0) {
                    curScroll = curScroll - speed;
                    $(elem).scrollTop(curScroll);
                   
                    if (curScroll <= 0) {
                        $(elem).scrollTop(0);
                        clearInterval(timer);
                    }
                }
            }
    });

}