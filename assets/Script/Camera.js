// const MINI_CAMERA_Z = 100;
// cc.Class({
//     extends: cc.Component,

//     properties: {
//         target: {
//             default: null,
//             type: cc.Node
//         },
//         miniMapCamera: {
//             default: null,
//             type: cc.Camera
//         },
//         cameraInfo: {
//             default: null,
//             type: cc.Graphics
//         },
//         renderTextureSprite: {
//             default: null,
//             type: cc.Sprite
//         },
//     },

//     onLoad () {
//         cameraPos = cc.v3(0, 0, MINI_CAMERA_Z);
//         cameraOrthoSize = 1;
    
//         _renderTexture: cc.RenderTexture = new cc.RenderTexture();
//         _tweens: cc.Tween[] = [];
//     },

//     onEnable () {
//         cc.view.on('design-resolution-changed', this._delayInitRenderTexture, this);
//     },

//     onDisable () {
//         cc.view.off('design-resolution-changed', this._delayInitRenderTexture, this);
//     },

//     _delayInitRenderTexture () {
//         // should calculate size after canvas updated
//         this.scheduleOnce(this._initRenderTexture.bind(this), 0.1);
//     },

//     _initRenderTexture () {
//         let { width: canvasWidth, height: canvasHeight } = cc.Canvas.instance.node;
//         let width = canvasWidth * 0.2;
//         let height = canvasHeight * 0.2;

//         this._renderTexture.initWithSize(width, height);
//         this.miniMapCamera.targetTexture = this._renderTexture;

//         let spriteFrame = new cc.SpriteFrame();
//         spriteFrame.setTexture(this._renderTexture);
//         this.renderTextureSprite.spriteFrame = spriteFrame;

//         let deviceWidth = canvasWidth, deviceHeight = canvasHeight;
//         if (!CC_EDITOR) {
//             deviceWidth = cc.game.canvas.width / cc.view._scaleX;
//             deviceHeight = cc.game.canvas.height / cc.view._scaleY;
//         }

//         let node = this.renderTextureSprite.node;
//         node.x = deviceWidth / 2 - width / 2;
//         node.y = deviceHeight / 2 - height / 2;
//         node.width = width;
//         node.height = height;
//     },

//     start () {
//         this._initRenderTexture();
        
//         if (!CC_EDITOR) {
//             let t = cc.tween(this.target)
//                 .by(6, {angle: 360})
//                 .repeatForever()
//                 .start()
//             this._tweens.push(t);

//             t = cc.tween(this)
//                 .set({cameraPos: cc.v3(0, 0, MINI_CAMERA_Z), cameraOrthoSize: cc.Canvas.instance.node.height / 2})
//                 .to(6, {cameraOrthoSize: this.target.width / 2})
//                 .delay(1)
//                 .to(3, {cameraPos: cc.v3(100, 0, MINI_CAMERA_Z)})
//                 .union()
//                 .repeatForever()
//                 .start()
//             this._tweens.push(t);
//         }
//         else {
//             this.cameraOrthoSize = cc.Canvas.instance.node.height / 2;
//         }
//     },

//     onDestroy () {
//         this._tweens.forEach(t => {
//             t.stop();
//         })
//     },

//     update (dt) {
//         let orthoHeight = this.cameraOrthoSize;
//         let orthoWidth = orthoHeight * (this._renderTexture.width / this._renderTexture.height);
        
//         this.cameraInfo.clear();

//         // draw mini camera border
//         let renderTextureNode = this.renderTextureSprite.node;
//         this.cameraInfo.rect(renderTextureNode.x - renderTextureNode.width/2, renderTextureNode.y - renderTextureNode.height/2, renderTextureNode.width, renderTextureNode.height);
//         this.cameraInfo.strokeColor = cc.Color.YELLOW;
//         this.cameraInfo.stroke();

//         // draw mini camera ortho size
//         this.cameraInfo.rect(this.cameraPos.x - orthoWidth, this.cameraPos.y - orthoHeight, orthoWidth * 2, orthoHeight * 2);
//         this.cameraInfo.strokeColor = cc.Color.BLUE;
//         this.cameraInfo.stroke();
        
//         this.miniMapCamera.node.position = this.cameraPos;
//         this.miniMapCamera.orthoSize = this.cameraOrthoSize;
//     }
// });
