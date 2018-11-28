$(function() {
    var mmb  = new Mmp();
    mmb.navigation();
    mmb.Trigger();
    mmb.PottomPatten();
    mmb.ssb();
})
var Mmp = function() {
    this.data=1;
}
Mmp.prototype = {
    
    navigation: function() {
        var thar = this;
        $.ajax({
            url: 'http://localhost:9090/api/getbaicaijiatitle',
            success: function (obj) {
                console.log(obj);
                var html = template('slideTpl', obj);
                $('.baicaijia-ul').html(html);

            }
        })
    },
    Trigger: function() {
        var thar = this;
        $('.baicaijia-ul').on('click', 'li', function() {
            var d= $(this).data("id");
            console.log(d);
            thar.data=d;
           thar.PottomPatten()
            $(this).children().addClass('active').parent().siblings().children().removeClass('active');
            console.log(this);
            
            
        })
    },
    PottomPatten: function() {
        var thar = this;
        console.log(thar);
        
        
        $.ajax({
            url: 'http://localhost:9090/api/getbaicaijiaproduct',
            data:{ titleid : thar.data },

            success:function(obj){
                console.log(obj);
                
                var html = template('cartProductTpl', obj);
                 $('.wfwe').html(html)
                
            }
        })

    },
    ssb: function() {
        $(".to-top").on("tap", function () {
            
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

