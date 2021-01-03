cc.Class({
    extends: cc.Component,

    properties: {
        objectPrefab: {
            default: null,
            type: cc.Prefab
        },
        arrObjectPrefab: {
            default: [],
            type: cc.Prefab
        },

        clickSound:{
            default: null,
            type: cc.AudioClip
        },

        btnImage1:{
            default: null,
            type: cc.Button
        },
        btnImage2:{
            default: null,
            type: cc.Button
        },
        btnImage3:{
            default: null,
            type: cc.Button
        },
        btnImage4:{
            default: null,
            type: cc.Button
        },
        btnImage5:{
            default: null,
            type: cc.Button
        },
        btnImage6:{
            default: null,
            type: cc.Button
        },
        character: {
            default: null,
            type: cc.Node
        },

        brush1: cc.Node,
        brush2: cc.Node,
        brush3: cc.Node,

        arrResult: "1 4 2 6 3 5",
        _arrChoice: "",
        _index: 0,   
        amountNode: 6,             //số lượng node  
        _onclickBtn1: false,
        _onclickBtn2: false,
        _onclickBtn3: false,
        _onclickBtn4: false,
        _onclickBtn5: false,
        _onclickBtn6: false,
        _isHaveConnect1: false,
        _isHaveConnect2: false,
        _isHaveConnect3: false,
        _isHaveConnect4: false,
        _isHaveConnect5: false,
        _isHaveConnect6: false,
        _numberConnect1: 0,
        _numberConnect2: 0,
        _numberConnect3: 0,
        _numberConnect4: 0,
        _numberConnect5: 0,
        _numberConnect6: 0,
    },

    onLoad () {
        window.amountNodeIsTouched = 0;
        window.amount = this.amountNode;

        if(window.amount == 4){
            cc.find("Canvas/MatchingShapeGame/Btn3").active = false;
            cc.find("Canvas/MatchingShapeGame/Btn6").active = false;
        }
        aresult = new Array(1, 2, 3, 0, 0, 0);


        // if(window.amount == 6){
        //     this.spawnNewProduct(-200, 200);
        //     this.spawnNewProduct(-200, 0);
        //     this.spawnNewProduct(-200, -200);
        //     this.spawnNewProduct(200, 200);
        //     this.spawnNewProduct(200, 0);
        //     this.spawnNewProduct(200, -200);
        // }else{
        //     this.spawnNewProduct(-200, 100);
        //     this.spawnNewProduct(-200, -100);
        //     this.spawnNewProduct(200, 100);
        //     this.spawnNewProduct(200, -100);
        // }
    },

    start(){
        
    },

    onClickBtn1(){
        this._onclickBtn1 = !this._onclickBtn1;
        cc.audioEngine.play(this.clickSound, false, 1);
        if(this._onclickBtn1 === true){
            cc.find("Canvas/MatchingShapeGame/Btn1").scale = 1.1;
            this.brush1.getComponent('Brush').setBrushPos(-250, 200);
        }else{
            cc.find("Canvas/MatchingShapeGame/Btn1").scale = 1;
            this._isHaveConnect1 = false;
            this._numberConnect1 = 0;
            this.brush1.getComponent('Brush').clear();
        }
    },

    onClickBtn2(){
        this._onclickBtn2 = !this._onclickBtn2;
        cc.audioEngine.play(this.clickSound, false, 1);
        if(this._onclickBtn2 === true){
            cc.find("Canvas/MatchingShapeGame/Btn2").scale = 1.1;
            this.brush2.getComponent('Brush').setBrushPos(-250, 0);
        }else{
            cc.find("Canvas/MatchingShapeGame/Btn2").scale = 1;
            this._isHaveConnect2 = false;
            this._numberConnect2 = 0;
            this.brush2.getComponent('Brush').clear();
        }
    },

    onClickBtn3(){
        this._onclickBtn3 = !this._onclickBtn3;
        cc.audioEngine.play(this.clickSound, false, 1);
        if(this._onclickBtn3 === true){
            cc.find("Canvas/MatchingShapeGame/Btn3").scale = 1.1;
            this.brush3.getComponent('Brush').setBrushPos(-250, -200);
        }else{
            cc.find("Canvas/MatchingShapeGame/Btn3").scale = 1;
            this._isHaveConnect3 = false;
            this._numberConnect3 = 0;
            this.brush3.getComponent('Brush').clear();
        }
    },

    onClickBtn4(){
        this._onclickBtn4 = !this._onclickBtn4;
        cc.audioEngine.play(this.clickSound, false, 1);
        // if(this._onclickBtn4 === true){
        //     cc.find("Canvas/MatchingShapeGame/Btn4").scale = 1.1;
        // }else{
        //     cc.find("Canvas/MatchingShapeGame/Btn4").scale = 1;
        // }
        if(this._onclickBtn1 === true && this._isHaveConnect1 === false){
            this._numberConnect4 = 1;
            this._numberConnect1 = 4;
            cc.find("Canvas/MatchingShapeGame/Btn4").scale = 1.1
            this.brush1.getComponent('Brush').drawTo(250, 200);
            this.brush1.getComponent('Brush').close();
            this._isHaveConnect1 = true;
        }
        if(this._onclickBtn2 === true && this._isHaveConnect2 === false){
            this._numberConnect4 = 2;
            this._numberConnect2 = 4;
            cc.find("Canvas/MatchingShapeGame/Btn4").scale = 1.1
            this.brush2.getComponent('Brush').drawTo(250, 200);
            this.brush2.getComponent('Brush').close();
            this._isHaveConnect2 = true;
        }
        if(this._onclickBtn3 === true && this._isHaveConnect3 === false){
            this._numberConnect4 = 3;
            this._numberConnect3 = 4;
            cc.find("Canvas/MatchingShapeGame/Btn4").scale = 1.1
            this.brush3.getComponent('Brush').drawTo(250, 200);
            this.brush3.getComponent('Brush').close();
            this._isHaveConnect3 = true;
        }
    },

    onClickBtn5(){
        this._onclickBtn5 = !this._onclickBtn5;
        cc.audioEngine.play(this.clickSound, false, 1);
        // if(this._onclickBtn5 === true){
        //     cc.find("Canvas/MatchingShapeGame/Btn5").scale = 1.1;
        // }else{
        //     cc.find("Canvas/MatchingShapeGame/Btn5").scale = 1;
        // }
        if(this._onclickBtn1 === true && this._isHaveConnect1 === false){
            this._numberConnect5 = 1;
            this._numberConnect1 = 5;
            cc.find("Canvas/MatchingShapeGame/Btn5").scale = 1.1;
            this.brush1.getComponent('Brush').drawTo(250, 0);
            this.brush1.getComponent('Brush').close();
            this._isHaveConnect1 = true;
        }
        if(this._onclickBtn2 === true && this._isHaveConnect2 === false){
            this._numberConnect5 = 2;
            this._numberConnect2 = 5;
            cc.find("Canvas/MatchingShapeGame/Btn5").scale = 1.1;
            this.brush2.getComponent('Brush').drawTo(250, 0);
            this.brush2.getComponent('Brush').close();
            this._isHaveConnect2 = true;
        }
        if(this._onclickBtn3 === true && this._isHaveConnect3 === false){
            this._numberConnect5 = 3;
            this._numberConnect3 = 5;
            cc.find("Canvas/MatchingShapeGame/Btn5").scale = 1.1;
            this.brush3.getComponent('Brush').drawTo(250, -0);
            this.brush3.getComponent('Brush').close();
            this._isHaveConnect3 = true;
        }
    },

    onClickBtn6(){
        this._onclickBtn6 = !this._onclickBtn6;
        cc.audioEngine.play(this.clickSound, false, 1);
        // if(this._onclickBtn6 === true){
        //     cc.find("Canvas/MatchingShapeGame/Btn6").scale = 1.1;
        // }else{
        //     cc.find("Canvas/MatchingShapeGame/Btn6").scale = 1;
        // }
        if(this._onclickBtn1 === true && this._isHaveConnect1 === false){
            this._numberConnect6 = 1;
            this._numberConnect1 = 6;
            cc.find("Canvas/MatchingShapeGame/Btn6").scale = 1.1;
            this.brush1.getComponent('Brush').drawTo(250, -200);
            this.brush1.getComponent('Brush').close();
            this._isHaveConnect1 = true;
        }
        if(this._onclickBtn2 === true && this._isHaveConnect2 === false){
            this._numberConnect6 = 2;
            this._numberConnect2 = 6;
            cc.find("Canvas/MatchingShapeGame/Btn6").scale = 1.1;
            this.brush2.getComponent('Brush').drawTo(250, -200);
            this.brush2.getComponent('Brush').close();
            this._isHaveConnect2 = true;
        }
        if(this._onclickBtn3 === true && this._isHaveConnect3 === false){
            this._numberConnect6 = 3;
            this._numberConnect3 = 6;
            cc.find("Canvas/MatchingShapeGame/Btn6").scale = 1.1;
            this.brush3.getComponent('Brush').drawTo(250, -200);
            this.brush3.getComponent('Brush').close();
            this._isHaveConnect3 = true;
        }
    },

    onCLickAnswer(){
        console.log("---------------------");
        console.log("Box 1 connect to " + this._numberConnect1);
        console.log("Box 2 connect to " + this._numberConnect2);
        console.log("Box 3 connect to " + this._numberConnect3);
        console.log("Box 4 connect to " + this._numberConnect4);
        console.log("Box 5 connect to " + this._numberConnect5);
        console.log("Box 6 connect to " + this._numberConnect6);


        this._arrChoice = "1 " + this._numberConnect1 + " 2 " + this._numberConnect2 + " 3 " + this._numberConnect3;
        console.log(this._arrChoice); 
        this._onclickBtn5 = !this._onclickBtn5;
        var result = this.checkAnswer(this._arrChoice, this.arrResult);
        console.log("Ket qua: " + result);

        this.character.getComponent(cc.Animation).play('monsterIn');
        if(result === true){
            cc.find("Canvas/Character/Mess").getComponent(cc.Label).string = 'Con hãy chọn đáp\nán đúng!';
            this.node.getComponent("SoundManager").playEffectSound("traloidung", false);   
        }else{
            cc.find("Canvas/Character/Mess").getComponent(cc.Label).string = 'Con hãy chọn đáp\nán đúng!';
            this.node.getComponent("SoundManager").playEffectSound("traloisai", false);   
        }
        setTimeout(() => {
            this.character.getComponent(cc.Animation).play('monsterOut');
        }, 2500);
    },

    checkAnswer(arr1, arr2){
        //compare 2 arr
        var isCorrect = true;
        if(arr1.length != arr2.length){
            isCorrect = false;
        }else{
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) {
                    isCorrect = false
                    break;
                }
            }
        }
        return isCorrect;
    },

    // spawnNewProduct(x, y) {
    //     var newBox = cc.instantiate(this.objectPrefab);
    //     newBox._tag = this._index + 1;
    //     newBox.setPosition(x, y);

    //     var nameImage = "so_" + newBox._tag;
    //     cc.loader.loadRes('MatchingShape/' + nameImage, cc.SpriteFrame, function (err, spriteFrame) {
    //         if (err) {
    //             cc.error(err.message || err);
    //             return;
    //         }else{
    //             newBox.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    //         }
    //     });

    //     this.node.addChild(newBox);
    //     this.arrObjectPrefab[this._index] = newBox;
    //     this._index++;
    // },

    // handleConnect(){
    //     if(window.amountNodeIsTouched === 3){
    //         window.amountNodeIsTouched = 0;
    //     }
    //     if(this.arrObjectPrefab[0].getComponent('Object')._isTouch === true){
    //         this._isHaveConnect = true;
    //         this.brush1.getComponent('Brush').setBrushPos(-200, 200);
    //     }
    //     if(this.arrObjectPrefab[1].getComponent('Object')._isTouch === true){
    //         this._isHaveConnect = true;
    //         this.brush2.getComponent('Brush').setBrushPos(-200, 0);
    //     }   
    //     if(this.arrObjectPrefab[2].getComponent('Object')._isTouch === true){
    //         this._isHaveConnect = true;
    //         this.brush3.getComponent('Brush').setBrushPos(-200, -200);
    //     }

    //     if(this.arrObjectPrefab[3].getComponent('Object')._isTouch === true && this._isHaveConnect === true){
    //         if(this.arrObjectPrefab[3].getComponent('Object')._isConnect === false){
    //             this.brush1.getComponent('Brush').drawTo(200, 200);
    //             this.brush1.getComponent('Brush').close();
    //             this.arrObjectPrefab[3].getComponent('Object')._isConnect = true;
    //         }
    //     }
    //     if(this.arrObjectPrefab[4].getComponent('Object')._isTouch === true && this._isHaveConnect === true){
    //         if(this.arrObjectPrefab[4].getComponent('Object')._isConnect === false){
    //             this.brush2.getComponent('Brush').drawTo(200, 0);
    //             this.brush2.getComponent('Brush').close();
    //             this.arrObjectPrefab[4].getComponent('Object')._isConnect = true;
    //         }
    //     }
    //     if(this.arrObjectPrefab[5].getComponent('Object')._isTouch === true && this._isHaveConnect === true){
    //         if(this.arrObjectPrefab[5].getComponent('Object')._isConnect === false){
    //             this.brush3.getComponent('Brush').drawTo(200, -200);
    //             this.brush3.getComponent('Brush').close();
    //             this.arrObjectPrefab[5].getComponent('Object')._isConnect = true;
    //         }
    //     }
    // },

    update (dt) {
        // this.handleConnect();
    },
});
