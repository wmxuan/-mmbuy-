$(function(){
        /* 渲染页面 */

        $.ajax({
            url: 'http://localhost:9090/api/getcoupon',
            success: function(data) {
            //  console.log( data);
              // 3. 拿到数据调用模板生成html
            var html = template('navListTpl', data);
            // 4. 把html渲染到页面
            $('.navList').html(html);
            }
        }) 
          
})