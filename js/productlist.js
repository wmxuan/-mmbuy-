$(function(){
     //区域滑动
    //mui('.mui-scroll-wrapper').scroll({
    //    deceleration: 0.0005 ,
    //});
    /* 实现商品分类名称动态渲染 */
     //商品根据url搜索
       //获取地址栏参数categoryid键的值
       var categoryid = getQueryString('categoryid');
    //    categoryid=11,
       //1.调用ajax根据分类id获取分类名称
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
   /*实现商品列表动态渲染*/
   //刚刷新是在第一页       
     var page = 1;
     sendajax();     
    //  翻页处理
    // page=1;  
     //上一页
     $('.pageup').click(function (){
         if(page==1){
             return;
         }else{
            page--;
            sendajax();
         }        
     }) 
     //下一页
     $('.pagedown').click(function (){
        page++;   
        sendajax();        
      }) 
    //返回顶部
    $('.return').click(function(){
    mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1000);  
   })
 //调用ajax根据搜索的内容请求商品列表数据的函数
   function sendajax(){
    $.ajax({
        url:'http://localhost:9090/api/getproductlist',
        data:{categoryid:categoryid,pageid: page || 1},
        success:function(result){
           if(result.result.length==0){
            //    alert("没有数据了")
            page--;
            return false;
           }
           //滚动回顶部
           mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,0);
           //模版
            var html = template('productlistTpl',result);
            $('.product-content ul').html(html);          
        }
    })
 }
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