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
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.debug.setDisplayStats(false);
        this.initEventListener();
        this.hideShowGame();
    },

    hideShowGame(){
        if(this._level === 1){
            let time = 0;           
            if(this._onClickNextOrBack === false){
                cc.find("Canvas/PlayVideoTutorial").getComponent(cc.Animation).play('sauLenGiua');
                cc.find("Canvas/MatchingShapeGame").getComponent(cc.Animation).play('giuaLenTruoc');
                time = 1000;
            }
            cc.find("Canvas/PlayVideoTutorial").active = true;
            setTimeout(() => {
                
                cc.find("Canvas/MatchingShapeGame").active = false;
                cc.find("Canvas/SayAnswerGame").active = false;
                cc.find("Canvas/MultipleChoiceGame").active = false;
            }, time);

        }else if(this._level === 2){
            if(this._onClickNextOrBack === false){
                cc.find("Canvas/MatchingShapeGame").getComponent(cc.Animation).play('sauLenGiua');
                cc.find("Canvas/SayAnswerGame").getComponent(cc.Animation).play('giuaLenTruoc');
            }else{
                cc.find("Canvas/PlayVideoTutorial").getComponent(cc.Animation).play('giuaVeSau');
                cc.find("Canvas/MatchingShapeGame").getComponent(cc.Animation).play('truocVeGiua');
            }
            cc.find("Canvas/MatchingShapeGame").active = true;
            setTimeout(() => {
                cc.find("Canvas/PlayVideoTutorial").active = false;
            
                cc.find("Canvas/SayAnswerGame").active = false;
                cc.find("Canvas/MultipleChoiceGame").active = false;
            }, 1000);
            
        }else if(this._level === 3){
            if(this._onClickNextOrBack === false){
                cc.find("Canvas/SayAnswerGame").getComponent(cc.Animation).play('sauLenGiua');
                cc.find("Canvas/MultipleChoiceGame").getComponent(cc.Animation).play('giuaLenTruoc');
            }else{
                cc.find("Canvas/MatchingShapeGame").getComponent(cc.Animation).play('giuaVeSau');
                cc.find("Canvas/SayAnswerGame").getComponent(cc.Animation).play('truocVeGiua');
            }
            cc.find("Canvas/SayAnswerGame").active = true;
            setTimeout(() => {
                cc.find("Canvas/PlayVideoTutorial").active = false;
                cc.find("Canvas/MatchingShapeGame").active = false;

                cc.find("Canvas/MultipleChoiceGame").active = false;
            }, 1000);
            
        }else{
            if(this._onClickNextOrBack === true){
                cc.find("Canvas/SayAnswerGame").getComponent(cc.Animation).play('giuaVeSau');
                cc.find("Canvas/MultipleChoiceGame").getComponent(cc.Animation).play('truocVeGiua');
            }
            cc.find("Canvas/MultipleChoiceGame").active = true;
            setTimeout(() => {
                cc.find("Canvas/PlayVideoTutorial").active = false;
                cc.find("Canvas/MatchingShapeGame").active = false;
                cc.find("Canvas/SayAnswerGame").active = false;
            
            }, 1000);
        }
        //hide and show button
        if(this._level === 4){
            cc.find("Canvas/NextGame").active = false;
        }else{
            cc.find("Canvas/NextGame").active = true;
        }
        if(this._level === 1){
            cc.find("Canvas/PreGame").active = false;
        }else{
            cc.find("Canvas/PreGame").active = true;
        }
    },

    initEventListener() {  
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
        this._level++;
        this._onClickNextOrBack = true;
        this.hideShowGame(); 
    },

    onClickPreLevel(){
        this._level--;
        this._onClickNextOrBack = false;
        this.hideShowGame();
    },

    onClickBack(){
        cc.director.loadScene("MainGame");
    },

    update (dt) {
    },
});
