// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        _isTouch: false,
        _tag: null,
        isImage: false,
        isAudio: false,
    },

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchProduct, this); 
    },

    start () {

    },

    onTouchProduct(){
        
        this.node.scale = 1.2;
        setTimeout(() => {
            this.node.scale = 1;
        }, 200);        
    },

    Remove_Node(){
        this.node.destroy();
    },

    update (dt) {},
});
