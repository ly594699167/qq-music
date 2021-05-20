/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/index.less":
/*!****************************!*\
  !*** ./src/css/index.less ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/Audio.js":
/*!*************************!*\
  !*** ./src/js/Audio.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//音乐加载功能

function AudioManage(){
        this.audio = new Audio();
    //gang开始为暂停状态
    this.status = 'pause'
}
AudioManage.prototype = {
    //音乐加载
    load(src){
        this.audio.src = src
        this.audio.load();
        console.log(src,'音乐路径')
       
    },
    //音乐播放
    play(){
        this.audio.play();
        this.status  = 'play'
    },
    //音乐暂停
    pause(){
        this.audio.pause();
        this.status = 'pause'
    },
    end(fn){
        console.log('哈哈')
        this.audio.onended = fn;
    },
    //时间跳转到某一个节点
    playTo(time){
        
        this.audio.currentTime = time;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new AudioManage());

/***/ }),

/***/ "./src/js/Music.js":
/*!*************************!*\
  !*** ./src/js/Music.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Render */ "./src/js/Render.js");
/* harmony import */ var _Audio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Audio */ "./src/js/Audio.js");
/* harmony import */ var _serIndex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serIndex */ "./src/js/serIndex.js");
/* harmony import */ var _listContro__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listContro */ "./src/js/listContro.js");
/* harmony import */ var _Progress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Progress */ "./src/js/Progress.js");






function Music(dom) {
    this.dom = dom;
    //获取下标
    // this.next = 1;
    //用于获取添加的数组
    this.data = [];
    //当前的歌曲索引下标
    this.curIndex = 0;
    //唱片旋转的定时器
    this.rotateTimer = null;
    //图片旋转的角度
    this.deg = 0;
    //索引值对象
    this.indexObj = null;
    //歌曲列表
    this.list = 0;
    //进度条对象
    this.pro = new _Progress__WEBPACK_IMPORTED_MODULE_4__.default.pro();

}
Music.prototype = {
    init() {

        this.getDom();
        this.getData();
        this.musicControl()

    },
    //获取数据函数
    async getData() {
        const Asyncdata = await fetch('../public/mock/data.json')
        this.data = await Asyncdata.json();

        //数据获取成功
        if (this.data) {
            // //列表执行
            this.listPlay();
            //获取索引对象
            this.indexObj = new _serIndex__WEBPACK_IMPORTED_MODULE_2__.default.Index(this.data.length)
            this.loadMusic(this.indexObj.index);
            //拖拽功能
            this.dragPlay();
           
            // Audio.end(this.loadMusic(this.indexObj.pre())
        }
    },
    //音乐加载
    loadMusic(index) {
        let That = this
        ;(0,_Render__WEBPACK_IMPORTED_MODULE_0__.default)(this.data[index]);
        _Audio__WEBPACK_IMPORTED_MODULE_1__.default.load(this.data[index].audioSrc);
        //进度条渲染
        this.pro.init();
       
        //进度条总时间渲染
        this.pro.renderTimge(this.data[index].duration)
        if (_Audio__WEBPACK_IMPORTED_MODULE_1__.default.status === 'play') {
            _Audio__WEBPACK_IMPORTED_MODULE_1__.default.play();
            this.controlBtns[2].className = 'playing'
            //图片旋转
            this.imgRotate(0);     
           //切割时进度条必须跟着走
            this.pro.move(0);   
        }
        this.list.changeselect(index);
        this.curIndex = index;
        _Audio__WEBPACK_IMPORTED_MODULE_1__.default.end(function(){
            That.loadMusic(That.indexObj.next())
        })

    },
    //获取元素
    getDom() {
        this.record = document.querySelector('.songImg img');	//旋转图片
        this.controlBtns = document.querySelectorAll('.control li');	//底部导航里的按钮
    },
    
    //播放,上一首,下一首
    musicControl() {
        const That = this;
        //上一首
        this.controlBtns[1].addEventListener('touchend', function () {
            _Audio__WEBPACK_IMPORTED_MODULE_1__.default.status = 'play'
            That.loadMusic(That.indexObj.pre());
        })
        //播放功能
        this.controlBtns[2].addEventListener('touchend', function () {
            //当是播放状态时
            if (_Audio__WEBPACK_IMPORTED_MODULE_1__.default.status === 'play') {
                _Audio__WEBPACK_IMPORTED_MODULE_1__.default.pause();
                this.className = '';
                That.stopRotate();
                That.pro.stop();

            } else {
                //暂停状态
                _Audio__WEBPACK_IMPORTED_MODULE_1__.default.play();
                this.className = 'playing';
                // Audio.end(function(){
                //     That.loadMusic(That.indexObj.next())
                // })
                That.imgRotate(That.deg);
                That.pro.move();

            }

        })
        //下一首
        this.controlBtns[3].addEventListener('touchend', function () {
            _Audio__WEBPACK_IMPORTED_MODULE_1__.default.status = 'play';
            That.loadMusic(That.indexObj.next());
        })

    },
    //图片旋转
    imgRotate(deg) {
        const that = this;
        clearInterval(this.rotateTimer);
        this.rotateTimer = setInterval(() => {
            deg = deg + 0.2;
            that.record.style.transform = 'rotate(' + deg + 'deg)';
            that.deg = deg;
        }, 1000 / 60)
    },
    //图片旋转停止
    stopRotate() {
        clearInterval(this.rotateTimer);
    },
    //列表操作
    listPlay() {
        const That = this;

        this.list = _listContro__WEBPACK_IMPORTED_MODULE_3__.default.listControl(this.dom, this.data);
        console.log(this.list)
        //列表显示功能
        this.controlBtns[4].addEventListener('touchend', function () {
            console.log(That.list)
            That.list.slideUp();
        })
        //列表中的歌曲绑定事件
        this.list.musicList.forEach((item, index) => {
            item.addEventListener('touchend', () => {
                if (That.curIndex === index) {
                    return;
                }
                _Audio__WEBPACK_IMPORTED_MODULE_1__.default.status = 'play';
                That.indexObj.index = index;
                That.loadMusic(index);
                That.list.slideDown();

            })
        })
    },
    //进行拖拽操作
    dragPlay() {
        const That = this;
        //获取拖拽对象
        this.drag = new _Progress__WEBPACK_IMPORTED_MODULE_4__.default.drag(document.querySelector('.circle'));
        this.drag.start = function () {
            //进度条暂停
            That.pro.stop();

        }
        this.drag.move = function (per) {
            //进度条变化
            That.pro.move(per)
        }
        this.drag.end = function (per) {
            let time = That.data[That.indexObj.index].duration* per;
             _Audio__WEBPACK_IMPORTED_MODULE_1__.default.playTo(time)
            _Audio__WEBPACK_IMPORTED_MODULE_1__.default.play();
            That.controlBtns[2].className = 'playing';
            // Audio.status = 'pause'
            That.imgRotate(That.deg);
            That.pro.move(per);
        }
    }


}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Music(document.getElementById('wrap')));





/***/ }),

/***/ "./src/js/Progress.js":
/*!****************************!*\
  !*** ./src/js/Progress.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Progress() {
    //总的时长
    this.allTime = 0;
    //开始的时长
    this.startTime = 0;
    //百分数
    this.per = 0;
    //定时器
    this.timer = null;
    //暂停后的百分比
    this.endPer = 0;
}
Progress.prototype = {
    init() {
        this.getDom();
    },
    //获取dom元素
    getDom() {
        this.curTime = document.querySelector('.curTime');
        this.circle = document.querySelector('.circle');
        this.frontBg = document.querySelector('.frontBg');
        this.totalTime = document.querySelector('.totalTime');
      
    },
    //时间渲染
    renderTimge(time) {
       
        this.allTime = time;
        time = this.changeTime(time);
        this.totalTime.innerHTML = time;
    },
    //时间转换
    changeTime(time) {
  
        time = Math.round(time);
   
        var m = Math.floor(time / 60);
        var s = time % 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ":" + s;
    },
    //进度条移动
    move(per){
   
        //清理定时器
        cancelAnimationFrame(this.timer);
        const That = this;
        //点击播放时的时间
        this.endPer = per === undefined?this.endPer : per ;
   
        this.startTime = new Date().getTime();
        //歌曲开始
        function frame(){
            //获取当前时间
            let curTime = new Date().getTime();
            //获得百分比,*1000转换成毫秒,加上暂停后的百分比
            const per =That.endPer + (curTime - That.startTime)/(That.allTime*1000);
            if(per<=1){
                //进行改变
                That.update(per);
            } else{
                //清理定时器
                cancelAnimationFrame(That.timer);
            }
            That.timer = requestAnimationFrame(frame);
        }
        frame();
    },
    //进度条改变
    update(per){
        //左边的时间
        let curtime = this.changeTime(this.allTime*per)
        this.curTime.innerHTML = curtime;
       
        //获取父元素的宽度
    
        //进度掉
        this.frontBg.style.width = per *100 +'%';
       
        //小圆行运行距离
        // this.circle
       
        let l = this.circle.parentNode.offsetWidth * per;
        this.circle.style.transform = 'translateX(' + l + 'px)';
    },
    //进度条停止
    stop(){
        this.stopTime = new Date().getTime();
        //点击暂停时的百分比,+号代表以前点击的百分
     
        this.endPer  += (this.stopTime - this.startTime)/(this.allTime*1000);
      
        //清理定时器
        cancelAnimationFrame(this.timer);
    }
}
//拖拽元素
function Drag(obj){
    //要拖拽的dom元素
    this.obj = obj;
    //拖拽时按下的位置
    this.startPointX = 0;
    //按下时已经走的位置
    this.startLeft = 0;
    //移动的百分比
    this.per = 0;
    this.init();
}
Drag.prototype={
    init(){
        const That = this;
        //获得进度条背景
        this.backBg = document.querySelector('.backBg');
        console.log(this.backBg)
        this.obj.style.transform = 'translateX(0)';
        this.obj.addEventListener('touchstart',function(ev){
           //第一根手指按下的位置
           
           That.startPointX = ev.changedTouches[0].pageX;
            //得到已经走了的位置,得到字符串0);
      
            That.startLeft = parseFloat(this.style.transform.split('(')[1]);
            That.start && That.start();
        });
        this.backBg.addEventListener('touchstart',function(ev){
            That.Bgx = ev.changedTouches[0].pageX;
            console.log(That.Bgx)
        })

        this.obj.addEventListener('touchmove',function(ev){
            //得到拖拽的距离
            let disX = ev.changedTouches[0].pageX - That.startPointX;
   
            //小圆点要走的距离
            let l = That.startLeft + disX;
           if(l<0){
               //往左拖拽
               l = 0;
           }else if(l>this.parentNode.offsetWidth){
               l = this.parentNode.offsetWidth
           }
            this.style.transform = 'translaeX('+l+'px)';
            //计算百分比
            That.per = l/this.parentNode.offsetWidth;
            That.move & That.move(That.per);
            ev.preventDefault();
        })
        this.obj.addEventListener('touchend',function(){
            That.end && That.end(That.per);
        })
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    pro: Progress,
    drag:Drag,
});

/***/ }),

/***/ "./src/js/Render.js":
/*!**************************!*\
  !*** ./src/js/Render.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_js_gaussBlur__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../public/js/gaussBlur */ "./src/public/js/gaussBlur.js");
/* harmony import */ var _public_js_gaussBlur__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_public_js_gaussBlur__WEBPACK_IMPORTED_MODULE_0__);

/**
 * 渲染模块
 */

//渲染背景图片
 function renderImg(src){

    window.player.blurImg(src);
    const img = document.querySelector('.songImg img')
    img.src = src;
}
//渲染音乐信息 
  function renderInfo(data){
    const songInfo = document.querySelector('.songInfo').children;
    songInfo[0].innerHTML = data.name;
    songInfo[1].innerHTML = data.album;
    songInfo[2].innerHTML = data.singer;
}
// //渲染是否喜欢
 function renderIsLike(data){
    const isLike = document.querySelector('.control').children;
    isLike[0].className = data?'liking':'';
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(data){
    console.log(data)
    renderImg(data.image);
    renderInfo(data);
    renderIsLike(data.isLike);
}


/***/ }),

/***/ "./src/js/listContro.js":
/*!******************************!*\
  !*** ./src/js/listContro.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * 列表控制
 * wrap:添加的容器
 * data:传递过来的歌曲数据
 */



 function listControl(wrap,data){
     //创建元素
     const div = document.createElement('div');
     const dl = document.createElement('dl');
     const dt = document.createElement('dt');
     const close = document.createElement('div');
     //用于存储所有歌曲的dom
     const musicList = [];
     div.className = 'list';
     dt.innerHTML = '播放列表';
     close.innerHTML = '关闭';
     close.className = 'close'

     //添加元素
     dl.appendChild(dt);
     data.forEach((item,index) => {
         const dd = document.createElement('dd');
         dd.innerHTML = item.name

         //给每一个dd添加点击事件
         dd.addEventListener('touchend',function(){
             changeselect(index);
         })
         dl.appendChild(dd);
         musicList.push(dd);
     });
     changeselect(0);
     div.appendChild(dl);
     div.appendChild(close);
     wrap.appendChild(div);
     const disY = div.offsetHeight;
     close.addEventListener('touchend',slideDown)
     //改变选中歌曲
     function changeselect(index){
        for(let i =0; i<musicList.length;i++){
            musicList[i].className = '';
        }
        musicList[index].className = 'active'
    }
    //列表下滑
    function slideDown(){
        div.style.transition = '.2s'
        div.style.transform='translateY('+disY+'px)';
    }
    //列表上滑
    function slideUp(){
        console.log(disY)
        div.style.transition = '.2s';
        div.style.transform = 'translateY('+0+'px)';
    }
     return {
         musicList,
         slideUp:slideUp,
         changeselect,
         slideDown,
   
     }
 }


 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
     listControl,
 });

/***/ }),

/***/ "./src/js/serIndex.js":
/*!****************************!*\
  !*** ./src/js/serIndex.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Index(len){
    //刚开始的所以
     this.index = 0;
     this.len = len;
}
Index.prototype = {
    //上一首
    pre(){
        return this.getIndex(1)
    },
    //下一首
    next(){
        return this.getIndex(-1);
    },
    /**
     * 
     * @param {*} num 代表上一首还是下一首 
     *
     * @param {*} len 代表数据长度
     */
    getIndex(num,len){
        this.index = (num + this.index +this.len) % this.len
        return this.index;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    Index,
});

/***/ }),

/***/ "./src/public/js/gaussBlur.js":
/*!************************************!*\
  !*** ./src/public/js/gaussBlur.js ***!
  \************************************/
/***/ (() => {

(function (root) {
	function gaussBlur(imgData) {
		var pixes = imgData.data;
		var width = imgData.width;
		var height = imgData.height;
		var gaussMatrix = [],
			gaussSum = 0,
			x, y,
			r, g, b, a,
			i, j, k, len;

		var radius = 10;
		var sigma = 5;

		a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
		b = -1 / (2 * sigma * sigma);
		//生成高斯矩阵
		for (i = 0, x = -radius; x <= radius; x++, i++) {
			g = a * Math.exp(b * x * x);
			gaussMatrix[i] = g;
			gaussSum += g;

		}
		//归一化, 保证高斯矩阵的值在[0,1]之间
		for (i = 0, len = gaussMatrix.length; i < len; i++) {
			gaussMatrix[i] /= gaussSum;
		}
		//x 方向一维高斯运算
		for (y = 0; y < height; y++) {
			for (x = 0; x < width; x++) {
				r = g = b = a = 0;
				gaussSum = 0;
				for (j = -radius; j <= radius; j++) {
					k = x + j;
					if (k >= 0 && k < width) {//确保 k 没超出 x 的范围
						//r,g,b,a 四个一组
						i = (y * width + k) * 4;
						r += pixes[i] * gaussMatrix[j + radius];
						g += pixes[i + 1] * gaussMatrix[j + radius];
						b += pixes[i + 2] * gaussMatrix[j + radius];
						// a += pixes[i + 3] * gaussMatrix[j];
						gaussSum += gaussMatrix[j + radius];
					}
				}
				i = (y * width + x) * 4;
				// 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
				// console.log(gaussSum)
				pixes[i] = r / gaussSum;
				pixes[i + 1] = g / gaussSum;
				pixes[i + 2] = b / gaussSum;
				// pixes[i + 3] = a ;
			}
		}
		//y 方向一维高斯运算
		for (x = 0; x < width; x++) {
			for (y = 0; y < height; y++) {
				r = g = b = a = 0;
				gaussSum = 0;
				for (j = -radius; j <= radius; j++) {
					k = y + j;
					if (k >= 0 && k < height) {//确保 k 没超出 y 的范围
						i = (k * width + x) * 4;
						r += pixes[i] * gaussMatrix[j + radius];
						g += pixes[i + 1] * gaussMatrix[j + radius];
						b += pixes[i + 2] * gaussMatrix[j + radius];
						// a += pixes[i + 3] * gaussMatrix[j];
						gaussSum += gaussMatrix[j + radius];
					}
				}
				i = (y * width + x) * 4;
				pixes[i] = r / gaussSum;
				pixes[i + 1] = g / gaussSum;
				pixes[i + 2] = b / gaussSum;
			}
		}
		//end
		return imgData;
	}

	//1、增加了第二个参数
	function blurImg(src, ele) {
		var canvas = document.createElement('canvas');
		ele=ele||document.body;
		
		//2、这两个值越小，图片就会越模糊
		canvas.width=100;
		canvas.height=100;

		var context = canvas.getContext('2d');

		//3、把img对象放到了这里
		var img = new Image();
		img.src = src;
		img.onload = function () {
			context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
			var imgData=context.getImageData(0, 0, canvas.width, canvas.height);
			var gaussData=gaussBlur(imgData);
			context.putImageData(gaussData, 0, 0);
			var imgSrc = canvas.toDataURL();

			ele.style.backgroundImage='url('+imgSrc+')';
		}
	}

	root.blurImg = blurImg;
})(window.player || (window.player = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/index.less */ "./src/css/index.less");
/* harmony import */ var _js_Music__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/Music */ "./src/js/Music.js");


_js_Music__WEBPACK_IMPORTED_MODULE_1__.default.init();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map