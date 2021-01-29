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
        result: {
            default: null,
            type: cc.Button
        },
        imgParent: {
            default: [],
            type: cc.Node
        },
        radioButton: {
            default: [],
            type: cc.Toggle
        },
        character: {
            default: null,
            type: cc.Node
        },
        backgroundPhone: {                      //lay toa do phone
            default: null,
            type: cc.Node
        },

        _index: 0,  
        trueResult: 0, 
        _choice: 1,
        _ischoiced: false,
        questionName: "",
        _zoom: false,                           //switch chuyen doi giua zoomin zoomout
    },

    onLoad () {
        this._choice = 1;
        setTimeout(() => {
            this.character.getComponent(cc.Animation).play('monsterIn');
            cc.find("Canvas/Character/Mess").getComponent(cc.Label).string = 'Con hãy chọn đáp\nán đúng!';
            this.node.getComponent("SoundManager").playQuestion("cauhoi", false);
        }, 1000);   
        setTimeout(() => {
            this.character.getComponent(cc.Animation).play('monsterOut');
        }, 3500);

        this.questionName = "question1";
        arrNameImage = new Array();
        cc.loader.loadRes('GameBasicKnowledge/QuestionData.json', function (err, object) {             //get data from json file
            if (err) {
                console.log(err);
                return;
            }
            this.arrNameImage = object.json.questions[this.questionName].nameImage;  
            this.trueResult = object.json.questions[this.questionName].result;
            this.setImage();
        }.bind(this));
    },

    start () {

    },

    setImage(){
        console.log(this.arrNameImage);
        var imageParent = this.imgParent;
        for(let i = 0; i < 4; i++){
            var nameImg = this.arrNameImage[i];
            console.log(nameImg);
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

    radioButtonClicked(toggle) {
        cc.audioEngine.play(this.clickSound, false, 1);
        var index = this.radioButton.indexOf(toggle);
        var title = "RadioButton";
        switch(index) {
            case 0:
                title += "1";
                if(this.radioButton[0].checkMark.node.active === true){
                    this._choice = 1;
                }else{
                    this._choice = 0;
                }
                break;
            case 1:
                title += "2";
                if(this.radioButton[1].checkMark.node.active === true){
                    this._choice = 2;
                }else{
                    this._choice = 0;
                }
                break;
            case 2:
                title += "3";
                if(this.radioButton[2].checkMark.node.active === true){
                    this._choice = 3;
                }else{
                    this._choice = 0;
                }
                break;
            case 3:
                title += "4";
                if(this.radioButton[3].checkMark.node.active === true){
                    this._choice = 4;
                }else{
                    this._choice = 0;
                }
                break;
            default:
                break;
        }
        console.log(this._choice);
        console.log(title);
    },

    onClickRetultButton(){
        if(this._ischoiced === false){
            let isCorrect = false;
            console.log(this._choice);
            console.log(this.trueResult);
            if(this._choice === this.trueResult){
                isCorrect = true;
            }
            if(isCorrect === true){
                this.character.getComponent(cc.Animation).play('monsterIn');
                cc.find("Canvas/Character/Mess").getComponent(cc.Label).string = 'Chúc mừng con đã\ntrả lời đúng';
                this.node.getComponent("SoundManager").playEffectSound("traloidung", false);   
                setTimeout(() => {
                    this.character.getComponent(cc.Animation).play('monsterOut');
                }, 2500);
            }else{
                this.character.getComponent(cc.Animation).play('monsterIn');
                cc.find("Canvas/Character/Mess").getComponent(cc.Label).string = 'Con cần cố gắng\nhơn nữa';
                this.node.getComponent("SoundManager").playEffectSound("traloisai", false);   
                setTimeout(() => {
                    this.character.getComponent(cc.Animation).play('monsterOut');
                }, 2500);
            }
            this._ischoiced = true;
        }
    },

    onClickZoom(){
        this._zoom = !this._zoom;
        var camera = cc.find("Canvas/Main Camera");
        if(this._zoom === true){
            camera.setPosition(this.backgroundPhone.getPosition().x, this.backgroundPhone.getPosition().y);                                    //set vi tri moi
            camera._components[0]._zoomRatio = 1.5                      //set do zoom
        }else{
            //tra la nhu ban dau
            camera.setPosition(0, 0);                                    //set vi tri moi
            camera._components[0]._zoomRatio = 1                      //set do zoom
        }
    },

    update (dt) {},
});
