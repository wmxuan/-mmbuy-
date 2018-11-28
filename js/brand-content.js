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
  console.log()
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
  }
}