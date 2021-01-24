cc.Class({
    extends: cc.Component,

    properties: {
        clickSound:{
            default: null,
            type: cc.AudioClip
        },
        lineTo: {
            default: null,
            type: cc.Prefab
        },
        arrLine: {
            default: [],
            type: cc.Prefab
        },
        lineParent: {
            default: null,
            type: cc.Node
        },
        pointParent:{
            default: [],
            type: cc.Node
        },
        imgParent: {
            default: [],
            type: cc.Node
        },
        character: {
            default: null,
            type: cc.Node
        },

        arrResult: "1 4 2 6 3 5",
        _arrChoice: "",
        _index: 0,   
        matchingNameGame: "question1",          //ten bai hoc
        amountNode: 6,                          //số lượng node 
        _isConnecting: false,                    //trang thai co dang noi hay khong

        _connet1: -1,                        //trang thai ket noi cua button 1 
        _connet2: -1,
        _connet3: -1,
        _connet4: -1,
        _connet5: -1,
        _connet6: -1,      
    },
    onLoad () {
        // cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        window.amountNodeIsTouched = 0;
        window.amount = this.amountNode;
        aresult = new Array(1, 2, 3, 0, 0, 0);

        this.matchingNameGame = "question1";
        arrNameImage = new Array();
        cc.loader.loadRes('GameBasicKnowledge/MatchingGameData.json', function (err, object) {             //get data from json file
            if (err) {
                console.log(err);
                return;
            }else{
                this.arrNameImage = object.json.questions[this.matchingNameGame].nameImage;  
                this.arrResult = object.json.questions[this.matchingNameGame].result;
                this.setImage();
            }
        }.bind(this));
        this.onTouchPoint();
    },

    setImage(){
        var imageParent = this.imgParent;
        for(let i = 0; i < 6; i++){
            var nameImg = this.arrNameImage[i];
            cc.loader.loadRes('GameBasicKnowledge/ImageQuestion/' + nameImg, cc.SpriteFrame, function (err, spriteFrame) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }else{
                    imageParent[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }
            });
        }
    },

    spawnNewLine(x, y) {
        var newLine = cc.instantiate(this.lineTo);
        this.node.addChild(newLine);
        newLine.setPosition(x, y);
        newLine.parent = this.lineParent;
        return newLine;
    },

    onTouchPoint(){
        this.pointParent[0].on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            this._connet1 = 0;
            this.DrawLine(0);
        }, this);
        this.pointParent[1].on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            this._connet2 = 0;
            this.DrawLine(1);
        }, this);
        this.pointParent[2].on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            this._connet3 = 0;
            this.DrawLine(2);
        }, this);
        this.pointParent[3].on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            this._connet4 = 0;
            this.DrawLine(3);
        }, this);
        this.pointParent[4].on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            this._connet5 = 0;
            this.DrawLine(4);
        }, this);
        this.pointParent[5].on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            this._connet6 = 0;
            this.DrawLine(5);
        }, this);

        this.pointParent[0].on(cc.Node.EventType.TOUCH_END, function (touch, event) {
            console.log("noi 1");
        }, this);
        this.pointParent[1].on(cc.Node.EventType.TOUCH_END, function (touch, event) {
            console.log("noi 2");
        }, this);
        this.pointParent[2].on(cc.Node.EventType.TOUCH_END, function (touch, event) {
            console.log("noi 3");
        }, this);
        this.pointParent[3].on(cc.Node.EventType.TOUCH_END, function (touch, event) {
            console.log("noi 4");
        }, this);
        this.pointParent[4].on(cc.Node.EventType.TOUCH_END, function (touch, event) {
            console.log("noi 5");
        }, this);
        this.pointParent[5].on(cc.Node.EventType.TOUCH_END, function (touch, event) {
            console.log("noi 6");
        }, this);

    },

    DrawLine(index){
        window.posX = this.pointParent[index].x;
        window.posY = this.pointParent[index].y;
        cc.audioEngine.play(this.clickSound, false, 1);
        this.arrLine[index] = this.spawnNewLine(this.pointParent[index].x, this.pointParent[index].y);
        // this.arrLine[0].getComponent("LineTo").calculateTheLengthAndAngle(this.pointParent[0].x, this.pointParent[0].y);
    },

    onCLickAnswer(){
        // this._arrChoice = "1 " + this._numberConnect1 + " 2 " + this._numberConnect2 + " 3 " + this._numberConnect3;
        // console.log(this._arrChoice); 
        // this._onclickBtn5 = !this._onclickBtn5;
        // var result = this.checkAnswer(this._arrChoice, this.arrResult);
        // console.log("Ket qua: " + result);

        // this.character.getComponent(cc.Animation).play('monsterIn');
        // if(result === true){
        //     cc.find("Canvas/Character/Mess").getComponent(cc.Label).string = 'Con hãy chọn đáp\nán đúng!';
        //     this.node.getComponent("SoundManager").playEffectSound("traloidung", false);   
        // }else{
        //     cc.find("Canvas/Character/Mess").getComponent(cc.Label).string = 'Con hãy chọn đáp\nán đúng!';
        //     this.node.getComponent("SoundManager").playEffectSound("traloisai", false);   
        // }
        // setTimeout(() => {
        //     this.character.getComponent(cc.Animation).play('monsterOut');
        // }, 2500);
    },
    checkAnswer(arr1, arr2){
        //compare 2 arr
        // var isCorrect = true;
        // if(arr1.length != arr2.length){
        //     isCorrect = false;
        // }else{
        //     for (let i = 0; i < arr1.length; i++) {
        //         if (arr1[i] !== arr2[i]) {
        //             isCorrect = false
        //             break;
        //         }
        //     }
        // }
        // return isCorrect;
    },

    update (dt) {

    },
});
