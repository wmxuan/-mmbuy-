/* 品牌大全的js文件 */
$(function () {

    var mmbuy = new Manmanbuy();
    mmbuy.getBandTitle();
    mmbuy.goBrandList();
    mmbuy.toTop();


});

// 慢慢买构造函数
function Manmanbuy() {}

//根链接
Manmanbuy.prototype.baseURL = "http://localhost:9090";

//获取品牌大全
Manmanbuy.prototype.getBandTitle = function () {
    var that = this;

    $.ajax({
        url: that.baseURL + "/api/getbrandtitle",
        dataType: "json",
        success: function (resp) {

            var arr = resp.result;
            var reg = ['电视', '空调', '播放器', '影院', '冰箱', '洗衣机', '热水', '手机', '相机'];

            //数据重新分组
            var map = {};
            var dest = [];
            for (var i = 0; i < reg.length; i++) {
                // 取出规则
                var patt = reg[i];
                for (var j = 0; j < arr.length; j++) {
                    // 取出一条记录
                    var item = arr[j];
                    //判断记录是否包含指定的字符串,如果包含,就添加到对应的数组中
                    if (item.brandTitle.indexOf(patt) != -1) {
                        if (!map[patt]) {
                            dest.push({
                                category: patt,
                                data: [item]
                            });
                            map[patt] = patt;
                        } else {
                            //已经存在相同类型的数据,就找到对应的数组,追加到后面
                            for (var k = 0; k < dest.length; k++) {
                                var destOne = dest[k];
                                if (destOne.category == patt) {
                                    destOne.data.push(item);
                                }
                            }
                        }
                    }
                }
            }
            var html = template("brandTitleTpl", {
                list: dest
            });
            $("#topTenBrands .brand-list").html(html);
        }
    });
}

// 跳转到品牌列表页
Manmanbuy.prototype.goBrandList = function () {
    var that = this;
    $("#topTenBrands .brand-list").on("tap", ".brand-content>div>a", function () {
        var brandTitleId = $(this).data("brand-title-id");
        location = "/brand-content.html?brandtitleid=" + brandTitleId;
    });
}
//返回顶部
Manmanbuy.prototype.toTop = function () {

    // 返回顶部注册点击事件,返回顶部
    $("#to-top").on("tap", function () {
           
            var elem = window;
            //获取当前scrollTop的位置
            var curScroll = $(elem).scrollTop();

            //上升的位移
            var speed = 3;
            if (curScroll > 0) {
                setInterval(timer, 1);
            }
            console.log(curScroll);
            function timer() {
                if (curScroll > 0) {
                    curScroll = curScroll - speed;
                    $(elem).scrollTop(curScroll);
                    console.log(curScroll);
                    if (curScroll <= 0) {
                        $(elem).scrollTop(0);
                        clearInterval(timer);
                        console.log("清除计时器")
                        $("#to-top").hide();
                    }
                }
            }
    });

    //监听window滚动
    $(window).on("scroll",function(){
        var elem = window;
        //获取当前scrollTop的位置
        var curScroll = $(elem).scrollTop();
        console.log(curScroll);
        if(curScroll>50){
            // 大于50,显示回到顶部
            $("#to-top").show();
        }else{
            //小于50,隐藏
            $("#to-top").hide();
        }
    })


}

