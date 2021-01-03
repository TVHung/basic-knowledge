cc.Class({
    extends: cc.Component,

    properties: {
        clickSound:{
            default: null,
            type: cc.AudioClip
        },
        _tag: null,
        _indexTag: 0,
        _isTouch: false,
        _isConnect: false,
    },

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchProduct, this); 
    },

    start () {

    },

    onTouchProduct(){
        cc.audioEngine.play(this.clickSound, false, 1);
        if(this.node.scale === 1){
            this.node.scale = 1.2;
            this._isTouch = true;
            if(this._isTouch === true){
                window.amountNodeIsTouched--;
            }
        }else{
            this.node.scale = 1;
            this._isTouch = false;
        }
            
        // console.log(window.amountNodeIsTouched);
    },

    Remove_Node(){
        this.node.destroy();
    },

    update (dt) {
        
    },
});
