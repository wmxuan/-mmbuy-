$(function () {
    var mmb = new MMB();
    mmb.getSiteNav();
});

var MMB = function () {

}

MMB.prototype = {
    baseUrl: 'http://localhost:9090',
    getSiteNav: function () {
        var that = this;
        $.ajax({
            url: that.baseUrl + '/api/getsitenav',
            success: function (data) {
                var html = template('siteNavTpl', data);
                $('.getSiteTpl').html(html);
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 
                });
            }
        });
    }
};
