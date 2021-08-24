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
export default new AudioManage();