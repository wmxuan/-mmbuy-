$(function() {

    var mmb = new MMB();
    mmb.getIndexMenu();
    mmb.getIndexProduct();

    //获得slider插件对象 初始化轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
    //获取区域滚动的父容器 调用初始化区域滚动插件的函数
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });


    $("#menu").on("tap",".more",function(){
        var appear = $(this).data('appear');
        console.log(appear);
        if(appear == 1){
            appear = 2;
            $(".disappear").show();
        }else {
            appear = 1;
            $(".disappear").hide();
        }
        $(this).data("appear",appear);
    });


    //返回顶部


    $("#toto").on("tap", function () {
            
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1000);//100毫秒滚动到顶

    });




});

 var MMB = function(){

 }

 MMB.prototype = {
     baseURL:"http://localhost:9090",

     //获取菜单栏函数
    getIndexMenu:function(){
        $.ajax({
        url: this.baseURL + '/api/getindexmenu',
        success: function (data) {
            // console.log(data);
            var html = template('menuTpl', data);
            $('#menu').html(html);
        }
    })
},

    //获取超值折扣函数
    getIndexProduct:function(){
         $.ajax({
             url: this.baseURL + "/api/getmoneyctrl",
             success: function (data) {
                 // console.log(data);
                 var html = template("productTpl", data);
                 $(".productList ul").html(html);
                 // mui('.mui-scroll-wrapper').scroll({
                 //     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                 // });
             }
         })

    },


 }
