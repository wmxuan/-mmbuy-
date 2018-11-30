// $(function(){
//     var baseUrl='http://localhost:9090/';
//     //发起ajax请求渲染商品
//     $.ajax({
//          url:baseUrl+'api/getinlanddiscount',
//          success:function(data){
//              console.log(data);
//              var html=template('queryProductTpl',data);
//             //  console.log(html)
//              $('.product-content .mui-row').html(html);
//          }
//     })


//     // 回到顶部
//     $("#goUp").on("tap", function () {
            
//         var elem = window;
//         //获取当前scrollTop的位置
//         var curScroll = $(elem).scrollTop();


//         //上升的位移
//         var speed = 10;
//         if (curScroll > 0) {
//             setInterval(timer, 1);
//         }
//         console.log(curScroll);
//         function timer() {
//             if (curScroll > 0) {
//                 curScroll = curScroll - speed;
//                 $(elem).scrollTop(curScroll);
//                 console.log(curScroll);
//                 if (curScroll <= 0) {
//                     $(elem).scrollTop(0);
//                     clearInterval(timer);
//                     console.log("清除计时器")
//                 }
//             }
//         }
//     });


// })



$(function(){
    var mmbuy=new Mmbuy();
    mmbuy.queryProduct();
    mmbuy.goUp();

})
var Mmbuy=function(){

}
Mmbuy.prototype={
    // 渲染商品
    queryProduct:function(){
        var baseUrl='http://localhost:9090/';
        //发起ajax请求渲染商品
        $.ajax({
             url:baseUrl+'api/getinlanddiscount',
             success:function(data){
                 console.log(data);
                 var html=template('queryProductTpl',data);
                //  console.log(html)
                 $('.product-content .mui-row').html(html);
             }
        })
    
    },
    // 回到顶部
    goUp:function(){
        // 回到顶部
    $("#goUp").on("tap", function () {
            
        var elem = window;
        //获取当前scrollTop的位置
        var curScroll = $(elem).scrollTop();


        //上升的位移
        var speed = 10;
        if (curScroll > 0) {
            setInterval(timer, 1);
        }
        // console.log(curScroll);
        function timer() {
            if (curScroll > 0) {
                curScroll = curScroll - speed;
                $(elem).scrollTop(curScroll);
                // console.log(curScroll);
                if (curScroll <= 0) {
                    $(elem).scrollTop(0);
                    clearInterval(timer);
                    // console.log("清除计时器")
                }
            }
        }
    });

    }
}