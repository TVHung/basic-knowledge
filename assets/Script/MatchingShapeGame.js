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
        backgroundPhone: {                      //lay toa do phone
            default: null,
            type: cc.Node
        },

        arrResult: "1 4 2 6 3 5",
        _arrChoice: "",
        _index: 0,   
        matchingNameGame: "question1",          //ten bai hoc
        amountNode: 6,                          //số lượng node 
        _isConnecting: false,                   //trang thai co dang noi hay khong
        _zoom: false,                           //switch chuyen doi giua zoomin zoomout

    },
    onLoad () {
        // cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        window.zoom = false;
        window.nodeCurrentTouch = 0;                                //node đang được chạm hiện tại (1-6), 0 la dang khong cham
        window.nodeConnectCurrent = 0;                              //node dang duoc noi den, neu khong thi gia tri bang 0
        window.arrChoice = new Array();                             //mang chua ket qua da noi
        window.arrChoice = [0, 0, 0, 0, 0, 0];                      //khoi tao gia tri mac dinh

        aresult = new Array(1, 2, 3, 0, 0, 0);                      //mang chua ket qua chon, ban cu

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

        console.log(this.backgroundPhone.getPosition().x);
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
        for(var i = 0; i < 6; i++){
            this.DrawLine(i);
            this.onTouchConnect(i);
        }
    },

    DrawLine(index){                                    //xử lý khi nhấn vào 1 node và bắt đầu kéo vẽ
        this.pointParent[index].on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            window.posX = this.pointParent[index].x;
            window.posY = this.pointParent[index].y;
            cc.audioEngine.play(this.clickSound, false, 1);
            this.handlePairNode(index);
            this.handleDeleteWhenClickAgain(index);
            this.arrLine[index] = this.spawnNewLine(this.pointParent[index].x, this.pointParent[index].y);       
        }, this);  
        
    },

    handlePairNode(index){                                       //xu ly cac cap node da duoc noi voi nhau
        window.nodeCurrentTouch = index + 1;
    },

    onTouchConnect(index){                             //xử lý khi chạm đến điểm nối thứ 2
        this.pointParent[index].on(cc.Node.EventType.MOUSE_ENTER, function (touch, event) {
            if(window.nodeCurrentTouch > 0){           //neu da cham node
                cc.audioEngine.play(this.clickSound, false, 1);
                window.nodeConnectCurrent = index + 1;  
                this.handleDeleteWhenConnectNodeConnected(index);
            }else{                                      //neu chua cham node
                window.nodeConnectCurrent = 0;
            }
        }, this);
        //xử lý khi node đã được nối thì không nối được nữa
    },

    handleDeleteWhenClickAgain(index){                           //xử lý xóa kết nối khi nhấn lại vào nút đã kết nối
        //trường hợp chạm vào node ban đầu
        if(!cc.isValid(this.arrLine[index])){                      //chưa tồn tại thì kiểm tra đã được nối chưa
            //trường hợp chạm vào node được kết nối đến nên chưa tồn tại đường vẽ
            if(window.arrChoice[index] > 0){
                var indexConnect = window.arrChoice[index] - 1;
                if(cc.isValid(this.arrLine[indexConnect]) === true){  
                    this.arrLine[indexConnect].getComponent("LineTo").onDestroy();      // xoa tai vi tri duoc noi den
                }
                window.arrChoice[index] = 0;
                window.arrChoice[indexConnect] = 0;
            }
        }else{
            if(cc.isValid(this.arrLine[index]) === true){                       
                this.arrLine[index].getComponent("LineTo").onDestroy();                 //xoa tai vi tri da noi ban dau
            }
            var indexConnect = window.arrChoice[index] - 1;
            window.arrChoice[index] = 0;
            window.arrChoice[indexConnect] = 0;
            console.log(window.arrChoice);
        }
    },

    handleDeleteWhenConnectNodeConnected(index){                                         //kiem tra khi noi den node da noi va xoa duong noi kia
        var indexConnect = window.arrChoice[index] - 1;                                 //vi tri node goc
        console.log(indexConnect);
        console.log(window.nodeConnectCurrent);
        if((window.nodeCurrentTouch <= 3 && index >= 3 ) || (window.nodeCurrentTouch > 3 && index < 3 )){ //kiem tra vi tri noi den khong duoc cung ben voi node noi
            if(indexConnect >= 0){                                                          //neu ma node duoc noi toi da co ket noi
                if(cc.isValid(this.arrLine[index]) === true){
                    console.log("xoa noi");                                                 //neu ket noi duoc noi la o node noi, thi xoa
                    this.arrLine[index].getComponent("LineTo").onDestroy();                 //xoa tai vi tri da noi 
                }else if(cc.isValid(this.arrLine[indexConnect]) === true){   
                    console.log("xoa goc");                                                 //neu ket noi o node duoc noi, thi xoa
                    this.arrLine[indexConnect].getComponent("LineTo").onDestroy();                 //xoa tai vi tri da noi 
                }
                window.arrChoice[index] = 0;
                window.arrChoice[indexConnect] = 0;
            }
        }                                                    
    },

    onCLickAnswer(){
        this._arrChoice = "1 " + window.arrChoice[0] + " 2 " + window.arrChoice[1] + " 3 " + window.arrChoice[2];
        console.log(this._arrChoice); 
        // this._onclickBtn5 = !this._onclickBtn5;
        var result = this.checkAnswer(this._arrChoice, this.arrResult);
        console.log("Ket qua: " + result);

        this.character.getComponent(cc.Animation).play('monsterIn');
        if(result === true){
            cc.find("Canvas/Character/Mess").getComponent(cc.Label).string = 'Chúc mừng con đã\nchọn đúng!';
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
        // compare 2 arr
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

    onClickZoom(){
        this._zoom = !this._zoom;
        window.zoom = this._zoom;
        
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

    update (dt) {

    },
});
