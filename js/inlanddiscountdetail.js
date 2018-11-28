// $(function(){
//     var id=getQueryString('id');
//     console.log(id);
//     var baseUrl='http://localhost:9090/';
//     $.ajax({
//         url:baseUrl+'api/getdiscountproduct',
//         data:{productid:id},
//         success:function(data){
//             console.log(data);
//             var html=template('discountTpl',data);
//             console.log(html)
//             $('#main').html(html);
//         }
//     })

//     //回到顶部
//     $("#goUp").on("tap", function () {
            
//             var elem = window;
//             //获取当前scrollTop的位置
//             var curScroll = $(elem).scrollTop();
    
    
//             //上升的位移
//             var speed = 10;
//             if (curScroll > 0) {
//                 setInterval(timer, 1);
//             }
//             console.log(curScroll);
//             function timer() {
//                 if (curScroll > 0) {
//                     curScroll = curScroll - speed;
//                     $(elem).scrollTop(curScroll);
//                     console.log(curScroll);
//                     if (curScroll <= 0) {
//                         $(elem).scrollTop(0);
//                         clearInterval(timer);
//                         console.log("清除计时器")
//                     }
//                 }
//             }
//     });

// })




// function getQueryString(name) {
//     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) {
//     	  // 用了另一种转码方式 我们是默认转码方式 使用decodeURI
//         // return unescape(r[2]);
//         return decodeURI(r[2]);
//     }
//     return null;
// }   


$(function(){
    var mmbuy=new Mmbuy();
    mmbuy.queryInfo();
    mmbuy.goUp();
})
var Mmbuy=function(){

}
Mmbuy.prototype={
  
    queryString:function(name){
        var that=this;
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
              // 用了另一种转码方式 我们是默认转码方式 使用decodeURI
            // return unescape(r[2]);
            return decodeURI(r[2]);
        }
        return null;
    },
    queryInfo:function(){
        var that=this;
        that.id=that.queryString('id');
        console.log(that.id);
        var baseUrl='http://localhost:9090/';
        $.ajax({
            url:baseUrl+'api/getdiscountproduct',
            data:{productid:that.id},
            success:function(data){
                console.log(data);
                var html=template('discountTpl',data);
                console.log(html)
                $('#main').html(html);
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
                }
            }
        }
    });

    }
}