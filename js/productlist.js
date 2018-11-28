$(function(){
     //区域滑动
    //mui('.mui-scroll-wrapper').scroll({
    //    deceleration: 0.0005 ,
    //});
    /* 实现商品分类名称动态渲染 */
     //商品根据url搜索
       //获取地址栏参数search键的值
    //    var search = getQueryString('search');
       //1.调用ajax根据分类id获取分类名称
       $.ajax({
           url:'http://localhost:9090/api/getcategorybyid',
           data:{categoryid: 30},
           success:function(result){
               console.log(result); 
               
               //拿到数据调用模版生成html
               var html = template('categoryTpl',result);
               $('.product-nav').html(html);   
               mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 ,
            });   
           }
       })  
   /*实现商品列表动态渲染*/       
     var page = 1;
     sendajax();
     
     //调用ajax根据搜索的内容请求商品列表数据
     
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


   function sendajax(){
    $.ajax({
        url:'http://localhost:9090/api/getproductlist',
        data:{categoryid:3,pageid: page || 1},
        success:function(result){
            console.log(result);
            console.log(result.result.length); 
           if(result.result.length==0){
            //    alert("没有数据了")
            page--;
            return false;
           }
           mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,0);

            var html = template('productlistTpl',result);
            $('.product-content ul').html(html);
            
        }
    })
 }
})