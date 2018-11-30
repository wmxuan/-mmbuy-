m.use(['test', 'zepto'], function () {
  var test = m.test,
    $ = Zepto;
   
  test.tab('.tab-wrap', '.content').tpl({
    url: 'api/getbrand',
    data: {
      brandtitleid: test.config.param.split('=')[1]
    },
    tpl: 'brandTop10tpl',
    location: '#brandTop'

  }).tpl({
    url: 'api/getbrandproductlist',
    data: {
      brandtitleid: test.config.param.split('=')[1]
    },
    tpl: 'salesTop10tpl',
    location: '#salesTop'

  }).tpl({
    url: 'api/getproductcom',
    data: {
      productid: test.config.param.split('=')[1]
    },
    tpl: 'pingLunTpl',
    location: '#pingLun'

  }).top('.to-top', 2)


})