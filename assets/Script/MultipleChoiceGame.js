// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        objectChoice: {
            default: null,
            type: cc.Prefab
        },   
        arrObjectPrefab: {
            default: [],
            type: cc.Prefab
        },
        result: {
            default: null,
            type: cc.Button
        },
        character: {
            default: null,
            type: cc.Node
        },
        _index: 0,  
        trueResult: "", 
    },

    onLoad () {
        setTimeout(() => {
            this.spawnNewProduct(-200, 200);
            this.spawnNewProduct(-200, 50);
            this.spawnNewProduct(-200, -100);
            this.spawnNewProduct(200, 200);
            this.spawnNewProduct(200, 50);
            this.spawnNewProduct(200, -100);
            cc.find("Canvas/MultipleChoiceGame/btnResult").active = true;
        }, 2500);
        arrResult = new Array();
        var i = 0;
        while(this.trueResult.split(" ")[i] != null){
            arrResult[i] = this.trueResult.split(" ")[i];
            i++;
        }

        this.character.getComponent(cc.Animation).play('monsterIn');
        cc.find("Canvas/Character/Mess").getComponent(cc.Label).string = 'Con hãy chọn đáp\nán đúng!';
        this.node.getComponent("SoundManager").playQuestion("cauhoi", false);   
        setTimeout(() => {
            this.character.getComponent(cc.Animation).play('monsterOut');
        }, 2500);
    },

    start () {

    },

    spawnNewProduct(x, y) {
        var newBox = cc.instantiate(this.objectChoice);
        newBox._tag = this._index + 1;
        newBox.setPosition(x, y);

        var nameImage = "so_" + newBox._tag;
        cc.loader.loadRes('MatchingShape/' + nameImage, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err.message || err);
                return;
            }else{
                newBox.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });

        this.node.addChild(newBox);
        this.arrObjectPrefab[this._index] = newBox;
        this._index++;
    },

    onClickRetultButton(){
        var isCorrect = true;
        var arrChoice = new Array();
        var j = 0;
        for(var i = 0; i < 6; i++){
            if(this.arrObjectPrefab[i].getComponent('ObjectChoice')._isTouch === true){
                arrChoice[j] = "" + (i+1);
                j++;
            }
        }
        //compare 2 arr
        if(arrChoice.length != arrResult.length){
            isCorrect = false;
        }else{
            for (let i = 0; i < arrResult.length; i++) {
                if (arrResult[i] !== arrChoice[i]) {
                    isCorrect = false
                    break;
                }
            }
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
        
    },

    update (dt) {},
});
