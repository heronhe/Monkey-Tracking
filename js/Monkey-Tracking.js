var MonkeyTracking = (function () {

    //基础参数值
    var baseOpt = {
        gaUAID: [],
        gaSendList: [],
        category: null,
        action: null,
    };

    //是否是数组
    function isArray(o){
        return Object.prototype.toString.call(o)=='[object Array]';
    }

    //是否移动端
    var isMobile = (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i).test(navigator.userAgent);
    //触发事件类型
    var EventHandle = isMobile ? 'touchstart' : 'click';

    function createGa(){
        var i = 0, lgt = baseOpt.gaUAID.length, _gaName;
        while(i < lgt){
            _gaName = 'mkga' + i;
            baseOpt.gaSendList.push(_gaName);

            ga('create', baseOpt.gaUAID[i], 'auto', {'name': _gaName});
            ga(_gaName + '.send', 'pageview');

            i++;
        };
    }

    //添加dom事件
    function addDomEvent(){
        document.addEventListener('DOMContentLoaded', function () {
            var domAll = document.body.getElementsByTagName("*"), _ele;
            for(var i = 0, lgt = domAll.length; i < lgt; i++){
                _ele = domAll[i];
                if(_ele.getAttribute('MkGaLabel'))
                    _ele.addEventListener(EventHandle, function () {
                        MonkeyTracking.send_EV({dom: this});
                    })
            }
        }, false);
    }

    var MonkeyTracking = {
        init: function (_p) {
            //ga默认引入
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

            for(var param in _p){
                if(param == 'UAID'){
                    if(isArray(_p.UAID)){
                        baseOpt.gaUAID = _p.UAID;
                    } else if(typeof _p.UAID === 'string'){
                        baseOpt.gaUAID.push(_p.UAID);
                    }
                } else{
                    baseOpt[param] = _p[param];
                }
            }
            createGa();
            addDomEvent();
        },

        //事件统计
        send_EV: function (_p) {
            var s = this;
            s._sendEV(_p)
        },

        //pv统计
        send_PV: function (_p) {
            var s = this;
            s._sendPV(_p);
        },

        //统计Event
        _sendEV: function (_p) {
            var i = 0, lgt = baseOpt.gaSendList.length;
            if(typeof _p !='object')
                return;

            var category = _p.category || baseOpt.category,
                action = _p.action || baseOpt.action,
                label = _p.label || _p.dom.getAttribute('MkGaLabel');

            while(i < lgt){
                ga(baseOpt.gaSendList[i] + '.send', 'event', category, action, label);
                i++;
            };

        },

        //统计Pv
        _sendPV: function (_p) {
            var i = 0, lgt = baseOpt.gaSendList.length;
            if(typeof _p !='object')
                return;

            while(i < lgt){
                ga(baseOpt.gaSendList[i] + '.send', 'pageview', _p.label);
                i++;
            };
        }
    };

    return MonkeyTracking;

})();
