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


 export default {
     listControl,
 }