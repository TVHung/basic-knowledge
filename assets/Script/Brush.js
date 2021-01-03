cc.Class({
    extends: cc.Component,
 
    properties: {

    },
 
    start (){

    },
 
    onLoad () {
        this.ctx = this.node.getComponent(cc.Graphics);
    },

    setBrushPos (x, y) {
        this.ctx.moveTo(x, y);
    },
 
    setBrushLineWidth(lineWidth) {
        this.ctx.lineWidth = lineWidth;
    },
 
    setBrushColor(color) {
        this.ctx.strokeColor = color;
        this.ctx.fillColor = color;
    },
 
    drawTo (x, y) {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.moveTo(x, y);
    },
    clear (){
        this.ctx.clear();
    },
    close (){
        this.ctx.close();
    },
});