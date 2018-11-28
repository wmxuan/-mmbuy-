$(function () {
  var m = new MMBBrand();
  m.tab('.tab-wrap', '.content').tpl({
    url: 'api/getbrand',
    data: {
      brandtitleid: m.config.param.split('=')[1]
    },
    tpl: 'brandTop10tpl',
    location: '#brandTop'

  }).tpl({
    url: 'api/getbrandproductlist',
    data: {
      brandtitleid: m.config.param.split('=')[1]
    },
    tpl: 'salesTop10tpl',
    location: '#salesTop'

  }).tpl({
    url: 'api/getproductcom',
    data: {
      productid: m.config.param.split('=')[1]
    },
    tpl: 'pingLunTpl',
    location: '#pingLun'

  })
  // console.log(),
  m.tp2();
})

function MMBBrand() {
  this.v = '1.0';
}
MMBBrand.prototype = {
  constructor: MMBBrand,
  config: {
    urlHead: 'http://localhost:9090/',
    param: location.search

  },

  tab: function (tabhead, tabcontent) {
    $(tabhead).find('[data-title]').on('click', function (e) {
      $(this).addClass('mui-active').siblings().removeClass('mui-active');
      $(tabcontent).find("[data-content=" + $(this).data('title') + "]").addClass('mui-active').siblings().removeClass('mui-active');
    })
    return this;
  },

  tpl: function (data) {

    var that = this;
    $.ajax({
      type: 'get',
      url: that.config.urlHead + data.url,
      data: data.data,
      dataType: 'json',
      success: function (response) {
        var html = template(data.tpl, response);
        $(data.location).html(html);
      }
    })
    return that;
  },
  tp2: function (data) {
    var that = this;
    console.log("tp2 go");
    $('#coment-tab').on('click',function () {
      var id = getQueryString("brandtitleid");
      $.ajax({
        url: that.config.urlHead +"api/getproductcom",
        type: 'get',
        data: {
          productid: id
        },
        dataType: "json",
        success: function (data) {
          console.log(data);
          var html = template('pingLunTpl', data);
          console.log(html);
          $('.mui-table-view').html(html);
        }
      });

    })
    //返回顶部
    $('.to-top').on('tap', function () {
      mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100); //100毫秒滚动到顶
    })
  }
}
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
