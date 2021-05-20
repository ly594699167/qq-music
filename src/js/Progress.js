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
export default {
    pro: Progress,
    drag:Drag,
}