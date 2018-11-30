$(function () {
    // 当当前显示的是第几页数据
    var originalpage = 0;
    // 第一次加载页面调用获取商品总数的函数,渲染分页列表
    getpages();
    // 第一次加载页面调用获取商品数据的函数
    getajax();

    //跳到商品详情页面
    $('.pro-list').on('tap', '.pro-lists', function () {
        var id = $(this).data('id');
        //console.log(id);
        location = 'save-sale.html?id=' + id;
    });

    //返回顶部
    $('.go-top-btn').on('tap', function () {
        goTOP();
    })

    //AJAX请求页面的商品数据
    function getajax() {
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: {
                pageid: originalpage
            },
            success: function (data) {
                var html = template('productListTpl', data);
                $('.pro-list').html(html);
            }
        });
    }

    //第一次加载页面的时候,获取数据总数,渲染分页列表
    function getpages() {
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: {
                pageid: originalpage
            },
            success: function (data) {
                var pageSize = data.pagesize;
                var totalCount = data.totalCount;
                pages = Math.ceil(totalCount / pageSize);
                //console.log(pages);
                var pageArr = [];
                for (var i = 1; i <= pages; i++) {
                    pageArr.push(i);
                }
                //console.log(pageArr)
                var htmlpage = template('pageTpl', {pageArr: pageArr});
                $('.mui-pagination').html(htmlpage);
            }
        });
    }

    //分页功能
    mui.init({
        swipeBack: true //启用右滑关闭功能
    });
    (function ($) {
        $('.mui-pagination').on('tap', 'a', function () {
            var li = this.parentNode;
            var classList = li.classList;
            if (!classList.contains('mui-active') && !classList.contains('mui-disabled')) {
                var active = li.parentNode.querySelector('.mui-active');
                if (classList.contains('mui-previous')) {//previous
                    originalpage--;
                    if (active) {
                        var previous = active.previousElementSibling;
                        console.log('previous', previous);
                        if (previous && !previous.classList.contains('mui-previous')) {
                            $.trigger(previous.querySelector('a'), 'tap');
                        } else {
                            classList.add('mui-disabled');
                        }
                    }
                } else if (classList.contains('mui-next')) {//next
                    originalpage++;
                    if (active) {
                        var next = active.nextElementSibling;
                        if (next && !next.classList.contains('mui-next')) {
                            $.trigger(next.querySelector('a'), 'tap');
                        } else {
                            classList.add('mui-disabled');
                        }
                    }
                } else {//page
                    active.classList.remove('mui-active');
                    classList.add('mui-active');
                    var page = parseInt(this.innerText);
                    originalpage = page - 1;
                    getajax();
                    goTOP();
                    var previousPageElement = li.parentNode.querySelector('.mui-previous');
                    var nextPageElement = li.parentNode.querySelector('.mui-next');
                    previousPageElement.classList.remove('mui-disabled');
                    nextPageElement.classList.remove('mui-disabled');
                    if (page <= 1) {
                        previousPageElement.classList.add('mui-disabled');
                    } else if (page >= 15) {
                        nextPageElement.classList.add('mui-disabled');
                    }
                }
            }
        });
    })(mui);

    // 回到顶部
    function goTOP() {
        //$(window).scrollTop(0);
        var elem = window;
        //获取当前scrollTop的位置
        var curScroll = $(elem).scrollTop();
        //上升的位移
        var speed = 20;
        if (curScroll > 0) {
            setInterval(timer, 1);
        }
        //console.log(curScroll);
        function timer() {
            if (curScroll > 0) {
                curScroll = curScroll - speed;
                $(elem).scrollTop(curScroll);
                //console.log(curScroll);
                if (curScroll <= 0) {
                    $(elem).scrollTop(0);
                    clearInterval(timer);
                    //console.log("清除计时器")
                }
            }
        }
    }
});
