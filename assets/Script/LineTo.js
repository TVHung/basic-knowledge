cc.Class({
    extends: cc.Component,
    properties: {
        _isDraw: true,
    },
    onLoad () {
        var canvas = cc.find('Canvas');
        this._isDraw = true;
        canvas.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchCancel, this);
    },

    calculateTheLengthAndAngle(x, y){
        this.node.angle = 0;
        this.node.width = 0;
        let chieuX = Math.abs(window.posX - x);
        let chieuY = Math.abs(window.posY - y);
        var khoangCach = Math.sqrt((chieuX * chieuX) + (chieuY * chieuY));
        var theta = Math.atan2(chieuY, chieuX) * 180 / Math.PI;
        if(window.posX < x && window.posY >= y){
            let goccong = 90 - theta;
            theta += goccong * 2;
        }
        if(window.posY < y){
            theta -= theta * 2;
        }
        if(window.posX <= x && window.posY <= y){
            let goccong = (theta + 90) * (-1);
            theta += goccong * 2;
        } 
        this.node.angle = theta;
        this.node.width = khoangCach;
    },

    onTouchCancel(){
        this.node.destroy();
        this._isDraw = false;
    },

    start () {

    },

    update (dt) {
        if(this._isDraw === true){
            this.calculateTheLengthAndAngle(this.node.x, this.node.y);
        }
    },
});
