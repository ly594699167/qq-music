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

export default {
    Index,
}