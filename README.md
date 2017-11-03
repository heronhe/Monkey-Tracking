# Monkey-Tracking
将统计代码标签直接添加到dom对象中，方便页面添加代码和代码测试。
当前版本只支持GA，如果需要兼容其它统计代码，只需重写MonkeyTracking._sendEV方法，例如：
    MonkeyTracking._sendEV = function () {
        _fn.apply(this, arguments);
        
        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        var img1 = new Image();
        img1.src="http://5317903.fls.doubleclick.net/activityi;src=5317903;type=super0;cat="+arguments.catName1+";ord=" + a + "?" ;
        var img2 = new Image();
        img2.src="http://5317903.fls.doubleclick.net/activityi;src=5317903;type=super0;cat="+arguments.catName2+";ord=1;num=" + a + "?" ;
    }

使用方法：

MonkeyTracking.init(）

ga统计代码初始化，
