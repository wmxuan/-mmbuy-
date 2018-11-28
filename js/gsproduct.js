$(function () {
    function Mmbuy() {

    }
    Mmbuy.prototype = {
        baseurl: "http://localhost:9090/",
        shopId:0,
        areaId:0,
        choice: function () {
            var that = this;
            $("#choice a").on("tap", function () {
                $(".areaul,.shopul,.yuanul").hide();
                if ($(this).find("i").hasClass("fa-caret-up")){
                    $(this).find("i").removeClass("fa-caret-up").addClass("fa-caret-down");
                    $(".areaul,.shopul,.yuanul").hide();
                    return false;
                }else{
                    if ($(this).hasClass("area")) {
                        $(".areaul").show();
                    } else if ($(this).hasClass("shop")) {
                        $(".shopul").show();
                    } else {
                        $(".yuanul").show();
                    }
                }
                $(this).find("i").removeClass("fa-caret-down").addClass("fa-caret-up");
                $(this).siblings().find("i").removeClass("fa-caret-up").addClass("fa-caret-down");
            })
        },
        sendajax: function (url) {
            var that = this;
            $.ajax({
                url: that.baseurl + url ||"api/getgsproduct",
                datatype: "json",
                data:{
                    shopid:that.shopId,
                    areaid:that.areaId,
                },
                success: function (data) {
                    if (url == "api/getgsshoparea") {
                        var html = template("choiceareaTpl", data);
                        $(".areaul").html(html);
                    } else if (url == "api/getgsshop") {
                        var html = template("choiceshopTpl", data);
                        $(".shopul").html(html);
                    } else if (url =="api/getgsproduct"){ 
                        data.nowshopId = that.shopId;
                        data.nowareaId = that.areaId;
                        console.log(data);
                        var html = template("commodityTpl",data);
                        $(".mui-scroll").html(html);
                        mui('.mui-scroll-wrapper').scroll({
                            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                        });
                    }
                }
            })
        },
        changeId:function () {
            var that =this;
            $("#option").on("tap", "li a",function () {
                $(".areaul,.shopul,.yuanul").hide();
                $("#choice a").find("i").removeClass("fa-caret-up").addClass("fa-caret-down");
                if($(this).data("shopid")!=undefined){
                    that.shopId= $(this).data("shopid");
                    $(".shop").html($(this).text() +'<i class="fa fa-caret-down"></i>');
                } else if ($(this).data("areaid") != undefined){
                    that.areaId = $(this).data("areaid");
                    $(".area").html($(this).text().slice(0, 2) +'<i class="fa fa-caret-down"></i>');
                }else{
                    return false;
                }
                $(this).find("i").addClass("fa-check");
                $(this).parent().siblings().find("i").removeClass("fa-check");
                console.log(that.shopId,that.areaId);
                that.sendajax("api/getgsproduct");
             })
          }  
    }
    var mmbuy = new Mmbuy();
    mmbuy.choice();
    mmbuy.sendajax("api/getgsshop");
    mmbuy.sendajax("api/getgsshoparea");
    mmbuy.sendajax("api/getgsproduct");
    mmbuy.changeId();


})