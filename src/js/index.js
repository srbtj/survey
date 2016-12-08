/** 事件处理 **/
var EventHandle = {
    addEvent : function(obj,eve,cb){
        if(obj.addEventListener){
            obj.addEventListener(eve,cb,false);
        }else if(obj.bindEvent){
            obj.bindEvent(eve,cb);
        }else{
            obj[eve] = cb;
        }
    },
    removeEvent : function(obj,eve,cb){
        if(obj.removeEventListener){
            obj.removeEventListener(eve,cb,false);
        }else if(obj.detachEvent){
            obj.detachEvent(cb,false);
        }else{
            obj[eve] = null;
        }
    }
};

//分享
intWeixin();
function intWeixin(){
    var lineLink = window.location.href;
    //lineLink = lineLink.indexOf("?") > 0 ? lineLink.split("?")[0] : lineLink;
    //lineLink = lineLink.indexOf("#") > 0 ? lineLink.split("#")[0] : lineLink;
    var imgUrl = $("#shareImg").attr("src");
    //if(imgUrl && imgUrl.indexOf("http//")<0){
    //    imgUrl = lineLink+'/'+imgUrl;
    //}
    //console.log(shareData)
    var shareTitle = shareData.shareTitle,
        descContent = shareData.descContent,
        shareLink = shareData.shareLink;
    shareLink = shareLink.indexOf("#") > 0 ? shareLink.split("#")[0] : shareLink;

    var curUrl=window.location.href.split('#')[0];
    curUrl =  encodeURIComponent(curUrl);
    $.ajax({
        type : "get",
        //url : "http://rmrbapi.people.cn/static/weixin/jssdk.php?url="+curUrl,
        url : "http://wei.all-reach.com/Wxapi/pub/jssdk.php?url="+curUrl,
        dataType : "jsonp",
        jsonp: "callback",
        jsonpCallback:"success_jsonpCallback",
        success : function(data){
            wx.config({
                //debug: true,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage"
                ]
            });
        },
        error:function(data){
        }
    });

    wx.ready(function (){
        wx.onMenuShareAppMessage({
            title: shareTitle,
            desc: descContent,
            link: shareLink,
            imgUrl: imgUrl,
            success:function(){
                tongjiObj.tongji_share_all();
                tongjiObj.tongji_share_appMessage();
            }
        });
        wx.onMenuShareTimeline({
            title: shareTitle,
            link: shareLink,
            imgUrl: imgUrl,
            success:function(){
                tongjiObj.tongji_share_all();
                tongjiObj.tongji_share_timeline();
            }
        });
        // QQ
        wx.onMenuShareQQ({
            title: shareTitle, // 分享标题
            desc: descContent,// 分享描述
            link: shareLink, // 分享链接
            imgUrl: imgUrl,// 分享图标
            success: function () {
            },
            cancel: function () {
            }
        });shareLink
        // 新浪
        wx.onMenuShareWeibo({
            title: shareTitle, // 分享标题
            desc: descContent,// 分享描述
            link: shareLink, // 分享链接
            imgUrl: imgUrl,// 分享图标
            success: function () {
            },
            cancel: function () {
            }
        });
    });
};

var Index = function(){

    this.oWrap = $('#wrap').get(0);
    this.oMain = $('#wrap > div').get(0);
    this.bodyWidth = $('body').width();
    this.iNow = 0;
    this.myScroll = null;
    this.oWrap.style.width = this.bodyWidth + 'px';
    css(this.oMain,'translateX',0);

    this.init();
};

Index.prototype = {
    constructor : Index,
    init : function(){
        this.loadImage();
    },
    loadImage : function(){
        var me = this;
        var oImage = new Image();
        var path = './dist/img/';
        var imgArr = [
            'a-choice','b-choice','c-choice','d-choice','e-choice','f-choice',
            'bg','next','next-hover','pre','pre-hover','title-bg'
        ];

        var iNow = 0;
        for(var i= 0,len = imgArr.length;i<len;i++){
            var image = new Image();
            image.src = path + imgArr[i] + '.png';
            image.onload = function(){
                iNow++;
                /*** 预加载动画 **/
                if(iNow == len){
                    $('#loading').hide();
                    $('#wrap').show();
                    me.bindEvent();
                }
            }
        }
    },
    bindEvent : function(){
        this.setHtmlSize();
        this.resizeHtmlSize();
        this.setAllWidth();
        this.scrollText();
    },
    /**set font-size **/
    setHtmlSize : function(){
        var oHtml = document.querySelector('html');
        var fontSize = oHtml.getBoundingClientRect().width / 15;
        oHtml.style.fontSize = fontSize + 'px';
    },
    resizeHtmlSize : function(){
        var resizeEve = 'orientationchange' in window? 'orientationchange' : 'resize';
        var me = this;
        window.addEventListener(resizeEve,function(){
            me.setHtmlSize();
        },false);
    },
    /** 设置 题目宽度 **/
    setAllWidth : function(){
        var aSection = this.oMain.querySelectorAll('.pages');
        var oneWidth = document.querySelector('html').getBoundingClientRect().width;
        this.oMain.style.width = aSection.length + '00%';
        $('.pages').css('width',oneWidth);
    },
    /** 滚动首屏文字 **/
    scrollText : function(){
        var oDiv = document.querySelector('.index-text-info');
        var oSpan = oDiv.querySelector('span');
        var height = oSpan.offsetHeight;
        var pDiv = oDiv.querySelector('.pContainer');
        var allHeight = parseInt(height) + 100;
        pDiv.style.height = allHeight + 'px';

        //oSpan.style.height = parseInt(oSpan.offsetHeight) + 200 + 'px';
        var oBanner = document.querySelector('.banner').offsetHeight;
        var oBannerBtn = document.querySelector('.banner-btn').offsetHeight;

        var myScroll = new MScroll({
            element : oDiv,
            showBar : false
        });

        myScroll.onscrollend = function(target){

        };
        console.log(myScroll.iScroll)

    }
};


new Index();