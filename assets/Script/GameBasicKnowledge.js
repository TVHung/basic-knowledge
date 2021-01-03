cc.Class({
    extends: cc.Component,

    properties: {
        _score: 0,
       _isGameOver: false,
       _level: 1,
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
            cc.find("Canvas/PlayVideoTutorial").active = true;
            cc.find("Canvas/MatchingShapeGame").active = false;
            cc.find("Canvas/SayAnswerGame").active = false;
            cc.find("Canvas/MultipleChoiceGame").active = false;
        }else if(this._level === 2){
            cc.find("Canvas/PlayVideoTutorial").active = false;
            cc.find("Canvas/MatchingShapeGame").active = true;
            cc.find("Canvas/SayAnswerGame").active = false;
            cc.find("Canvas/MultipleChoiceGame").active = false;
        }else if(this._level === 3){
            cc.find("Canvas/PlayVideoTutorial").active = false;
            cc.find("Canvas/MatchingShapeGame").active = false;
            cc.find("Canvas/SayAnswerGame").active = true;
            cc.find("Canvas/MultipleChoiceGame").active = false;
        }else{
            cc.find("Canvas/PlayVideoTutorial").active = false;
            cc.find("Canvas/MatchingShapeGame").active = false;
            cc.find("Canvas/SayAnswerGame").active = false;
            cc.find("Canvas/MultipleChoiceGame").active = true;
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
        this.hideShowGame(); 
    },

    onClickPreLevel(){
        this._level--;
        this.hideShowGame();
    },

    onClickBack(){
        cc.director.loadScene("MainGame");
    },

    update (dt) {
    },
});
