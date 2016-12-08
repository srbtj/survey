// JavaScript Document
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
function css(element, attr , val){
	if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'|| attr=='rotateY'|| attr=='rotateZ'|| attr=='scaleX'|| attr=='scaleY'|| attr=='translateY'|| attr=='translateX'|| attr=='translateZ'){
		return setTransform(element, attr , val);
	}
	if(arguments.length == 2){
		var val = element.currentStyle?element.currentStyle[attr]:getComputedStyle(element)[attr];
		if(attr=='opacity'){
			val = Math.round(val*100);
		}
		return parseFloat(val);
	} else {
		switch(attr){
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
			case 'borderWidth':
			case 'borderLeftWidth':
			case 'borderRightWidth':
			case 'borderTopWidth':
			case 'borderBottomWidth':
				val = val < 0 ? 0 : val;
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				element.style[attr] = val +"px";
				break;
			case 'opacity':
				element.style.filter= "alpha(opacity:"+val+")";
				element.style.opacity= val/100;
				break;	
			default:
				element.style[attr]=val;	
		}
	}
}
function setTransform(element,attr,val){
	if(!element["transform"]){
		element["transform"] = {};
	}
	if(typeof val == "undefined"){
		val = element["transform"][attr];
		if(typeof val == "undefined"){
			val = 0;
			element["transform"][attr] = 0;
		}
		return val;
	} else {
		var str = "";
		element["transform"][attr] = val;
		for(var s in element["transform"])	 {
			switch(s){
				case 'rotate':
				case 'rotateX':
				case 'rotateY':
				case 'rotateZ':
					str += s+"("+element["transform"][s]+"deg) ";
					break;
				case 'translateX':
				case 'translateY':
				case 'translateZ':
					str += s+"("+element["transform"][s]+"px) ";
					break;
				default:
					str += s+"("+element["transform"][s]+") ";
			}
		}

		if(attr === 'translateY'){
			element.style.WebkitTransition = element.style.transition = 'transform 0s';
		}else{
			element.style.WebkitTransition = element.style.transition = 'transform .5s';

		}
		element.style.MozTransform = element.style.msTransform  = element.style.WebkitTransform = element.style.transform = str;
	}
}
function MScroll(init){
	this.showBar = false;
	this.dir = "y";
	this.isOver = true;
	this.offMove = false;
	this.offScroll = false;
	for(var s in init){
		this[s] = init[s];
	}
	var _this = this;
	this.Scroll =  this.element.children[0]; /*为 element下的第0个子元素*/
	this.startPage = 0;   /* 记录用户按下去时的手指坐标 */
	this.startTranslate = 0; /* 记录用户按下去时，iScroll的数值 */
	this.iScroll = 0; /* 滚动的距离 */
	/*this.lastTime/this.lastTranslate/this.timeDis/this.translateDis 用来计算用户滑动玩缓冲动画的距离*/
	this.lastTime = 0;  /* 记录上次move触发事件的时候的时间戳 */
	this.lastTranslate = 0; /* 记录上次move触发事件的时候的iScroll值 */
	this.timeDis = 0;  /*记录上次move的时间戳和当前次move时间戳的差值*/
	this.translateDis = 0; /*记录上次move的iScroll值和当前次moveiScroll值的差值*/
	this.backout = 0; /* 回弹距离，默认100 */
	this.timer = 0; /* 记录定时器 */
	var isMove = false; /* 判断用户是否触发了touchmove */
	this.minTranslate = this.dir == "y"?(this.element.clientHeight - this.Scroll.offsetHeight):(this.element.clientWidth - this.Scroll.offsetWidth); /* 滑动的时候，iscroll向上滑动（或者向右滑动）的最大距离(数值为为负值，所有标min) */
	if(this.showBar){ /* 判断是否加滚动条*/
		this.scrollBar = document.createElement("div");
		if(this.dir == "y"){
			this.scale =  this.element.clientHeight  / this.Scroll.offsetHeight;
		 	this.scrollBar.style.cssText="width:4px;position:absolute;background:rgba(0,0,0,.5);right:0;top:0;border-radius:2px;min-height:4px; opacity:0; transition:.2s opacity;";
			this.scrollBar.style.height = this.element.clientHeight * this.scale +"px";
			
		} else {
			this.scale =   this.element.clientWidth  / this.Scroll.offsetWidth;
			this.scrollBar.style.cssText="height:4px;position:absolute;background:rgba(0,0,0,.5);left:0;bottom:0;border-radius:2px;min-width:4px;opacity:0; transition:.2s opacity;";
			this.scrollBar.style.width = this.element.clientWidth * this.scale +"px";
		}
		/*
			this.scale  滑动距离 和 this.scroll 滑动距离之间的比例 
			this.scrollBar 滚动条元素
		*/
		this.element.appendChild(this.scrollBar);
	}
	this.element.addEventListener("touchstart",
		function(e){
			isMove = false;
			_this.toStart(e);
		},
		false
	);
	this.element.addEventListener("touchmove",
		function(e){
			isMove = true;
			_this.toMove(e);
			e.preventDefault();
		},
		false
	);
	this.element.addEventListener("touchend",
		function(e){
			if(!isMove){
				return;
			}
			_this.toEnd(e);
		},
		false
	);
}
MScroll.prototype = {
	toStart: function(e){ /* 用户手指按下，准备开始滑动 */
		this.onscrollstart &&  this.onscrollstart();
		clearInterval(this.timer);
		var touch = e.changedTouches[0];
		this.startPage = this.dir == "y"? touch.pageY : touch.pageX;
		this.startTranslate = this.iScroll;
		this.lastTime = new Date().getTime(); // 100
		this.lastTranslate = this.iScroll;
		this.timeDis = 0;
		this.translateDis = 0; 
		if(this.showBar){
			this.scrollBar.style.opacity = 1;
		}
	},
	toMove: function(e){  /* 用户手指移动，跟随用户手指滑动 */
		if(this.offScroll){
			return;
		}
		var touch = e.changedTouches[0];
		var nowPage = this.dir == "y"? touch.pageY : touch.pageX;
		var nowTime = new Date().getTime(); 
		this.iScroll = this.startTranslate + (nowPage - this.startPage);
		if(this.minTranslate -  this.backout > this.iScroll && this.isOver){
			this.iScroll = this.minTranslate - this.backout;
		}
		if(this.iScroll > this.backout  && this.isOver){
			this.iScroll = this.backout;
		}
		this.timeDis = nowTime - this.lastTime; 
		this.lastTime = nowTime;
		this.translateDis = this.iScroll - this.lastTranslate; 
		this.lastTranslate =  this.iScroll;
		this.setTranslate();
	},
	toEnd: function(e){ /* 用户手指抬起 */
		var type = "easeOutStrong";
		/* 计算缓冲距离 */
		var speed = this.translateDis / this.timeDis*10;
		speed = this.timeDis == 0 ? 0 : speed; 
		speed = Math.abs(speed) > 5? speed*15 : speed*5;
		var target = speed + this.iScroll;
		
		if( this.minTranslate > target  && this.isOver ){
			target = this.minTranslate;
			type = "backOut";
		}
		if(target > 0  && this.isOver){
			target = 0;
			type = "backOut";
		}
		this.move(target - this.iScroll,type); /*执行用户手指抬起时的缓冲动画 */
		
		this.onscrollend &&  this.onscrollend(target);
	},
	setTranslate: function(){
		this.onscroll&&this.onscroll();
		if(this.offMove){
			return;
		}
		if(this.dir == "y"){
			this.scrollBar&&css(this.scrollBar,"translateY", -this.iScroll * this.scale);
			css(this.Scroll,"translateY",this.iScroll);
		} else {
			this.scrollBar&&css(this.scrollBar,"translateX", -this.iScroll * this.scale)
			css(this.Scroll,"translateX",this.iScroll);
		}
	},
	move: function(dis,type,time,callBack){
	var _this = this;
	var t = 0;
	var b = this.iScroll;
	var c = dis;
	var d = 0;
	if(!time){
		d = 40;
	} else {
		d = time / 20;
	}
	clearInterval(this.timer);
	this.timer = setInterval(
		function(){
			t++;
			if(t >= d){
				clearInterval(_this.timer);
				callBack&&callBack();
				if(_this.showBar){
					_this.scrollBar.style.opacity = 0;
				}
			}
			var val = Tween[type](t,b,c,d);
			_this.iScroll = 	val;
			_this.setTranslate();
		},
		20
	);
	},
	reSize: function(){
			this.minTranslate = this.dir == "y"?(this.element.clientHeight - this.Scroll.offsetHeight):(this.element.clientWidth - this.Scroll.offsetWidth);
			this.scale =  this.dir == "y"? this.element.clientHeight  / this.Scroll.offsetHeight:this.element.clientWidth  / this.Scroll.offsetWidth;
			if( this.dir == "y"){
				this.scrollBar.style.height = this.element.clientHeight * this.scale +"px";
			} else {
				this.scrollBar.style.width = this.element.clientWidth * this.scale +"px";
			}
			this.setTranslate();
	}
};