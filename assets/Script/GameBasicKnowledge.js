cc.Class({
    extends: cc.Component,

    properties: {
        _score: 0,
       _isGameOver: false,
       _level: 1,
       _onClickNextOrBack: true,                //kiếm tra xem đang nhấn next hay back để xử lý phần animation
    },

    start () {
        
    },

    onLoad () {
        window.width = 1280;
        window.height = 720;
        window.posX = 0;
        window.posY = 0;
        this._level = 1;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.debug.setDisplayStats(false);
        this.initEventListener();
        this.hideShowGame();
    },

    hideShowGame(){
        let time = 1000;
        if(this._level === 1){   
            cc.find("Canvas/PlayVideoTutorial").active = true;
            setTimeout(() => {
                
                cc.find("Canvas/MatchingShapeGame").active = false;
                cc.find("Canvas/SayAnswerGame").active = false;
                cc.find("Canvas/MultipleChoiceGame").active = false;
            }, time);
            
            if(this._onClickNextOrBack === false){                              //neu click back tu game truoc
                cc.find("Canvas/PlayVideoTutorial").getComponent(cc.Animation).play('sauLenGiua');
                cc.find("Canvas/MatchingShapeGame").getComponent(cc.Animation).play('giuaLenTruoc');
                time = 1000;
            }

        }else if(this._level === 2){
            cc.find("Canvas/MatchingShapeGame").active = true;
            setTimeout(() => {
                cc.find("Canvas/PlayVideoTutorial").active = false;
            
                cc.find("Canvas/SayAnswerGame").active = false;
                cc.find("Canvas/MultipleChoiceGame").active = false;
            }, time);

            if(this._onClickNextOrBack === false){                              //neu back tu game truoc
                cc.find("Canvas/MatchingShapeGame").getComponent(cc.Animation).play('sauLenGiua');
                cc.find("Canvas/SayAnswerGame").getComponent(cc.Animation).play('giuaLenTruoc');
            }else{                                                              //neu next game tiep theo
                cc.find("Canvas/PlayVideoTutorial").getComponent(cc.Animation).play('giuaVeSau');
                cc.find("Canvas/MatchingShapeGame").getComponent(cc.Animation).play('truocVeGiua');
            }

        }else if(this._level === 3){
            cc.find("Canvas/SayAnswerGame").active = true;
            setTimeout(() => {
                cc.find("Canvas/PlayVideoTutorial").active = false;
                cc.find("Canvas/MatchingShapeGame").active = false;

                cc.find("Canvas/MultipleChoiceGame").active = false;
            }, time);

            if(this._onClickNextOrBack === false){                               //neu back tu game truoc
                cc.find("Canvas/SayAnswerGame").getComponent(cc.Animation).play('sauLenGiua');
                cc.find("Canvas/MultipleChoiceGame").getComponent(cc.Animation).play('giuaLenTruoc');
            }else{                                                              //neu next game tiep theo
                cc.find("Canvas/MatchingShapeGame").getComponent(cc.Animation).play('giuaVeSau');
                cc.find("Canvas/SayAnswerGame").getComponent(cc.Animation).play('truocVeGiua');
            }
        }else{
            cc.find("Canvas/MultipleChoiceGame").active = true;
            setTimeout(() => {
                cc.find("Canvas/PlayVideoTutorial").active = false;
                cc.find("Canvas/MatchingShapeGame").active = false;
                cc.find("Canvas/SayAnswerGame").active = false;
            
            }, time);

            if(this._onClickNextOrBack === true){                               //neu back ve game truoc
                cc.find("Canvas/SayAnswerGame").getComponent(cc.Animation).play('giuaVeSau');
                cc.find("Canvas/MultipleChoiceGame").getComponent(cc.Animation).play('truocVeGiua');
            }
        }
    },

    handleChangeGame(time, level, ani1, ani2, ani3, ani4){                     //xu ly chuyen man hinh game
        if(this._onClickNextOrBack === false){
            cc.find("Canvas/PlayVideoTutorial").getComponent(cc.Animation).play(ani1);
            cc.find("Canvas/MatchingShapeGame").getComponent(cc.Animation).play(ani2);
        }else{
            cc.find("Canvas/SayAnswerGame").getComponent(cc.Animation).play(ani3);
            cc.find("Canvas/MultipleChoiceGame").getComponent(cc.Animation).play(ani4);
        }
        if(level === 1){
            cc.find("Canvas/PlayVideoTutorial").active = true;
        }else if(level === 2){
            cc.find("Canvas/MatchingShapeGame").active = true;
        }else if(level === 3){
            cc.find("Canvas/SayAnswerGame").active = true;
        }else{
            cc.find("Canvas/MultipleChoiceGame").active = true;
        }
            
        setTimeout(() => {
            if(level != 1){
                cc.find("Canvas/PlayVideoTutorial").active = false;
            }
            if(level != 2){
                cc.find("Canvas/MatchingShapeGame").active = false;
            }
            if(level != 3){
                cc.find("Canvas/SayAnswerGame").active = false;
            }
            if(level != 4){
                cc.find("Canvas/MultipleChoiceGame").active = false;
            }
        }, time);
    },

    initEventListener() {                               //lay toa do theo thoi gian thuc
        this.node.on(cc.Node.EventType.TOUCH_START, (event)=>{  

        },this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event)=>{  
            let pos = event.getLocation();
            window.posX = pos.x - window.width/2;
            window.posY = pos.y - window.height/2;
            // console.log(window.posX + ": " + window.posY);
        },this);
    },

    onClickSkip(){
        cc.director.loadScene("MainGame");
    },

    onClickNextLevel(){
        if(this._level < 4){
            this._level++;
            this._onClickNextOrBack = true;
            this.hideShowGame(); 
        }
    },

    onClickPreLevel(){
        if(this._level > 1){
            this._level--;
            this._onClickNextOrBack = false;
            this.hideShowGame();
        }
    },

    onClickBack(){
        cc.director.loadScene("MainGame");
    },

    update (dt) {
    },
});
