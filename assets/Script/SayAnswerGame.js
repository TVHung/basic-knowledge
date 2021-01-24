// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    properties: {
        btnProduct: {
            default: null,
            type: cc.Button
        },
        btnRecord: {
            default: null,
            type: cc.Button
        },
        _index: 0,
        nameImage: "",
    },

    onLoad () {
        
    },

    start () {

    },

    onCLickImage(){
        this.node.getComponent("SoundManager").playSoundAnswer(this.nameImage, false);   
    },

    onClickStartRecord(){
    
    },

    onClickStopRecord(){

    },

    onClickPlayRecord(){
        
    },

    update (dt) {},
});
