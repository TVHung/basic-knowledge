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
        backgroundPhone: {                      //lay toa do phone
            default: null,
            type: cc.Node
        },
        _index: 0,
        nameImage: "",
        _zoom: false,                           //switch chuyen doi giua zoomin zoomout
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

    onClickZoom(){
        this._zoom = !this._zoom;
        var camera = cc.find("Canvas/Main Camera");
        if(this._zoom === true){
            camera.setPosition(this.backgroundPhone.getPosition().x, this.backgroundPhone.getPosition().y);                                    //set vi tri moi
            camera._components[0]._zoomRatio = 1.5;                      //set do zoom
        }else{
            //tra la nhu ban dau
            camera.setPosition(0, 0);                                    //set vi tri moi
            camera._components[0]._zoomRatio = 1;                      //set do zoom
        }
    },

    update (dt) {},
});
