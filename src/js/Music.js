import render from './Render'
import Audio from './Audio'
import Index from './serIndex'
import listControl from './listContro'
import Pro from './Progress'

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
    this.pro = new Pro.pro();

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
            this.indexObj = new Index.Index(this.data.length)
            this.loadMusic(this.indexObj.index);
            //拖拽功能
            this.dragPlay();
           
            // Audio.end(this.loadMusic(this.indexObj.pre())
        }
    },
    //音乐加载
    loadMusic(index) {
        let That = this
        render(this.data[index]);
        Audio.load(this.data[index].audioSrc);
        //进度条渲染
        this.pro.init();
       
        //进度条总时间渲染
        this.pro.renderTimge(this.data[index].duration)
        if (Audio.status === 'play') {
            Audio.play();
            this.controlBtns[2].className = 'playing'
            //图片旋转
            this.imgRotate(0);     
           //切割时进度条必须跟着走
            this.pro.move(0);   
        }
        this.list.changeselect(index);
        this.curIndex = index;
        Audio.end(function(){
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
            Audio.status = 'play'
            That.loadMusic(That.indexObj.pre());
        })
        //播放功能
        this.controlBtns[2].addEventListener('touchend', function () {
            //当是播放状态时
            if (Audio.status === 'play') {
                Audio.pause();
                this.className = '';
                That.stopRotate();
                That.pro.stop();

            } else {
                //暂停状态
                Audio.play();
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
            Audio.status = 'play';
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

        this.list = listControl.listControl(this.dom, this.data);
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
                Audio.status = 'play';
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
        this.drag = new Pro.drag(document.querySelector('.circle'));
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
             Audio.playTo(time)
            Audio.play();
            That.controlBtns[2].className = 'playing';
            // Audio.status = 'pause'
            That.imgRotate(That.deg);
            That.pro.move(per);
        }
    }


}
export default new Music(document.getElementById('wrap'));



