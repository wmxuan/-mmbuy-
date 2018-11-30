$(function(){
    //区域滑动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 ,
    });
    //获取地址栏参数productId键和categoryid键的值
    var productId = getQueryString('productId');
    var categoryid = getQueryString('categoryid'); 
    /* 1.实现商品分类名称动态渲染 */
     //调用ajax根据分类id获取分类名称
    $.ajax({
        url:'http://localhost:9090/api/getcategorybyid',
        data:{categoryid: categoryid},
        success:function(result){
            console.log(result);                             
            //拿到数据调用模版生成html
            var html = template('categoryTpl',result);
            $('.product-nav').html(html);     
        }
    })  
   // 2. 实现商品详情渲染
     //发送ajax请求根据id渲染商品
     $.ajax({
         url:'http://localhost:9090/api/getproduct',
         data:{productid:productId},
         success:function(result){
              console.log(result);
              var html = template('productTpl',result);
              $('.product-parameter').html(html);                
         }
     })
   //3.实现评论的渲染
     //发送ajax的请求根据id渲染商品
       $.ajax({
           url:'http://localhost:9090/api/getproductcom',
           data:{productid:productId},
           success:function (result){
               console.log(result);
               var html = template('commentTpl',result);
               $('.evaluate-content ul').html(html);
               
           }
       })
   //返回顶部
   $('.return').click(function(){
    mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1000);  
   })
   
})
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









