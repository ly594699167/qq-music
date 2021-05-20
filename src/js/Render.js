import '../public/js/gaussBlur'
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
export default function(data){
    console.log(data)
    renderImg(data.image);
    renderInfo(data);
    renderIsLike(data.isLike);
}
