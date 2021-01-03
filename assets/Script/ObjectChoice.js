// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        clickSound:{
            default: null,
            type: cc.AudioClip
        },
        _isTouch: false,
        _tag: null,
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
        }else{
            this.node.scale = 1;
            this._isTouch = false;
        }
        
    },

    Remove_Node(){
        this.node.destroy();
    },

    update (dt) {},
});
