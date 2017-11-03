# Monkey-Tracking
将统计代码标签直接添加到dom对象中，方便页面添加代码和代码测试。

使用方法：

HTML标签添加对应属性：

    <button id="but" MkGaLabel="aa">提交</button>

ga统计代码初始化:

    MonkeyTracking.init({
        UAID: ['UA-59062826-5'],
        category: 'a',
        action: 'b',
    }）

也可以直接调用统计方法。

事件统计方法：

    MonkeyTracking.send_EV({
        label: ''
    })
    
其中category和action不填写时候，会取init初始化中的category、action。

页面统计方法

    MonkeyTracking.send_PV({
        label: ''
    })

当前版本只支持GA，如果需要兼容其它统计代码，可以重写MonkeyTracking._sendEV方法，直接调用MonkeyTracking.send_EV统计方法，（注意区分send_PV和_sendEV两个方法，以免混淆使用）例如：

    MonkeyTracking._sendEV = function () {
        _fn.apply(this, arguments);
        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        var img1 = new Image();
        img1.src="http://5317903.fls.doubleclick.net/activityi;src=5317903;type=super0;cat="+arguments.catName1+";ord=" + a + "?" ;
        var img2 = new Image();
        img2.src="http://5317903.fls.doubleclick.net/activityi;src=5317903;type=super0;cat="+arguments.catName2+";ord=1;num=" + a + "?" ;
    }
 


