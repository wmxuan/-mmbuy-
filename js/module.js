~(function (win) {
  var dom = document,
    config = {
      modules: {}, // 模块物理路径
      status: {}, // 模块加载状态
      base: 'js/', // 模块文件夹
      timeout: 10, // 加载模块超时时间
    },
    M = function () {
      this.v = '1.0';
    };

  M.prototype = {
    constructor: M, // 构造器

    modules: {},

    // 定义模块
    define: function (deps, proxy) {
      var that = this,
        type = typeof deps === 'function', // 判断第一个参数是否是函数
        callback = function (modules) { // 设置回调函数 
          typeof proxy === 'function' && proxy(function (name, exports) {
            m[name] = exports;
            config.status[name] = true;
          }, modules)
        };

      // 设置依赖模块和回调函数
      type && (
        proxy = deps,
        deps = []
      )

      // 调用 use 函数
      that.use(deps, callback);
    },

    // 加载模块
    use: function (deps, callback, exports) {
      var that = this,
        deps = typeof deps === 'string' ? [deps] : deps;
      // zepto 处理
      if (win.Zepto) {
        for (var i = 0; i < deps.length; i++) {
          if (deps[i] === 'zepto' || deps[i] === 'Zepto') {
            deps.splice(i, 1);
          }
        }
        m.zepto = m.$ = win.$;
      }

      // 没有依赖模块
      if (deps.length === 0) {

        return callback(), that;
      }


      // 设置加载模块的状态
      var item = deps[0],
        time = 0,
        exports = exports || [],
        onscriptload = function () { // 文件加载完成
          poll();
        },
        oncallback = function () { // 
          exports.push({
            item: m[item]
          })
          deps.length > 1 ? that.use(deps.slice(1), callback, exports) : callback.call(this, exports);
        },
        poll = function () { // 轮询 第一个模块 有没有加载完成
          if (time * 4 >= config.timeout * 1000) {
            console.log('没有该模块');
            return that;
          } else {
            config.status[item] ? callback() : setTimeout(poll, 4);
          }
        };



      if (!config.modules[item]) { // 第一次加载模块
        var head = dom.getElementsByTagName('head')[0],
          _script = dom.createElement('script'),
          url = ((config.base || '') + (that.modules[item] || item)).replace(/\.js$/, '') + '.js';


        _script.type = 'text/javascript';
        _script.charset = 'UTF-8';
        _script.async = true;
        _script.src = url;
        head.appendChild(_script);

        // 监听script加载事件
        if (_script.addEventListener) {
          _script.addEventListener('load', function (e) {
            if (e.type === 'load') {
              onscriptload(url);
            }
          }, false);
        } else {
          _script.attachEvent('onreadystatechange', function (e) {
            var readyRegExp = navigator.platform === 'PLaySTATION 3' ? /^complete$/ : /^(complete|loaded)$/
            if (readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
              onscriptload(url);
            }
          })
        }
        config.modules[item] = url;
      } else {
        poll();

      }
    },

    // 设置全局配置
    setConfig: function (options) {
      var options = options || {};
      for (var k in options) {
        config[k] = options[k];
      }

      return this;
    },

    // 扩展路径
    extend: function (options) {
      var options = options || {};
      for (var k in options) {
        if (!(this.modules[k] || config.modules[k])) {
          this.modules[k] = options[k];
        }
      }
      return this;
    }

  }

  // 添加到全局中
  win.m = new M();
}(window))