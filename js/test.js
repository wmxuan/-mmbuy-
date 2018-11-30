m.define('zepto', function (exports) {
  var $ = m.zepto;
  MMBBrand = {
    config: {
      urlHead: 'http://localhost:9090/',
      param: location.search
    },

    tab: function (tabhead, tabcontent) {
      var tabActive = document.referrer.indexOf('/brandtitle.html') === -1 ? (localStorage.getItem('$tabActive') || 1) : 1;
      $(tabhead).find("[data-title=tab" + tabActive + "]").addClass('mui-active').siblings().removeClass('mui-active');
      $(tabcontent).find("[data-content=tab" + tabActive + "]").addClass('mui-active').siblings().removeClass('mui-active');
      $(tabhead).find('[data-title]').on('click', function (e) {
        $(this).addClass('mui-active').siblings().removeClass('mui-active');
        $(tabcontent).find("[data-content=" + $(this).data('title') + "]").addClass('mui-active').siblings().removeClass('mui-active');
        localStorage.setItem('$tabActive', $(this).index()+1);
      })
      return this;
    },

    tpl: function (data) {

      var that = this;
      $.ajax({
        type: 'get',
        url: that.config.urlHead + data.url,
        data: data.data || that.param,
        dataType: 'json',
        success: function (response) {
          var html = template(data.tpl, response);
          $(data.location).html(html);
        }
      })
      return that;
    },
    scroll: function (elem, time) {
      //获取当前scrollTop的位置
      var curScroll = $(elem).scrollTop();
      console.log(curScroll)
      //上升的位移
      var speed = 10;
      if (curScroll > 0) {
        setInterval(timer, time);
      }

      function timer() {
        if (curScroll > 0) {
          curScroll = curScroll - speed;
          $(elem).scrollTop(curScroll);
          if (curScroll <= 0) {
            $(elem).scrollTop(0);
            clearInterval(timer);
          }
        }
      }
      return this;
    },
    top: function (clickDom, time) {
      var that = this;
      $(clickDom).on("click", function () {
        that.scroll(window, time)
      });
      return that;
    }
  }
  exports('test', MMBBrand);
})