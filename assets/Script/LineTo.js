cc.Class({
    extends: cc.Component,
    properties: {
        _deleteCheck: 0,
        _isDraw: true,
        _chieuX: 0,
        _chieuY: 0,
        _chuvi: 20,                 //khoang nhan ket noi 
    },
    onLoad () {
        var canvas = cc.find('Canvas');
        this._isDraw = true;
        canvas.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.angle = 0;
        this.node.width = 0;
        this._chuvi = 20;           
        // arrPoint = [{"x":-105, "y":125}, {"x":-105, "y":-30}, {"x":-105, "y":-185}, {"x":88, "y":125}, {"x":88, "y":-30}, {"x":88, "y":-185}];
    },

    calculateTheLengthAndAngle(x, y){                           //tinh goc va do dai line
        this.chieuX = Math.abs(window.posX - x);                //x, y la vi tri node duoc cham vao
        this.chieuY = Math.abs(window.posY - y);
        console.log("posX: " + window.posX + " posY: " + window.posY + " ||ChieuX: " + this.chieuX + " ChieuY: " + this.chieuY);

        //xu ly khi cham vao node hay chua chạm
        this.onTouchNode(x, y);                                 //truyen vao toa do node dang là diem goc

        var khoangCach = Math.sqrt((this.chieuX * this.chieuX) + (this.chieuY * this.chieuY));      //khoang cach
        var theta = Math.atan2(this.chieuY, this.chieuX) * 180 / Math.PI;                           //goc

        
        //xu ly cac goc khac nhau
        if(window.posX < x && window.posY >= y){
            let goccong = 90 - theta;
            theta += goccong * 2;
        }
        if(window.posY < y){
            theta -= theta * 2;
        }
        if(window.posX <= x && window.posY <= y){
            let goccong = (theta + 90) * (-1);
            theta += goccong * 2;
        } 
        if(window.zoom === true){                               //thay doi chieu dai cua line
            khoangCach = khoangCach/1.5;
        }
        
        this.node.angle = theta;
        this.node.width = khoangCach;
        console.log("Khoang cach: " + khoangCach + "Goc: " + theta);
        // console.log("X: " + window.posX + " Y: " + window.posY);
    },

    //truong hop keo den node 
    onTouchNode(x, y){ 
        if(window.nodeConnectCurrent > 0 && window.nodeCurrentTouch > 0){
            var index = window.nodeConnectCurrent - 1;
            var x1, x2, y1, y2;
            if(window.zoom === false){
                x1 = window.arrPoint[index].x - this._chuvi;                    //nếu chạm vào node thì sẽ nối kiểu khác mà ko chạy theo tay nữa
                x2 = window.arrPoint[index].x + this._chuvi;
                y1 = window.arrPoint[index].y - this._chuvi;
                y2 = window.arrPoint[index].y + this._chuvi;                        
            }else{
                this._chuvi = this._chuvi*1.5;
                console.log(window.arrPointZoom[index]);
                x1 = window.arrPointZoom[index].x - this._chuvi;                //neu zoom thi se tinh theo vi tri moi
                x2 = window.arrPointZoom[index].x + this._chuvi;
                y1 = window.arrPointZoom[index].y - this._chuvi;
                y2 = window.arrPointZoom[index].y + this._chuvi; 
            }            
            
            if(window.nodeCurrentTouch <= 3){                                   //neu cham vao node <= 3 thi chi dc noi den node 4,5,6
                if(window.nodeConnectCurrent <= 3){
                    if(x1 <= window.posX && window.posX <= x2 && y1 <= window.posY && window.posY <= y2){               //neu tay keo trong khoảng thì sẽ duoc coi là cham
                        //noi toi node dang cham
                        window.nodeConnectCurrent = 0;
                        console.log("sai roi");
                    }
                }else{
                    if(x1 <= window.posX && window.posX <= x2 && y1 <= window.posY && window.posY <= y2){
                        //xu ly neu den gan node
                        this.handleWhenTouchTrueNode(x, y);
                    }else{
                        //neu cham mà van khong noi và noi den node khac
                        this.handleConnectMuilti();
                    }
                }
            }else{
                if(window.nodeConnectCurrent <= 3){
                    if(x1 <= window.posX && window.posX <= x2 && y1 <= window.posY && window.posY <= y2){
                        this.handleWhenTouchTrueNode(x, y);
                    }else{
                        this.handleConnectMuilti();
                    }
                }else{
                    if(x1 <= window.posX && window.posX <= x2 && y1 <= window.posY && window.posY <= y2){
                        //noi toi node dang cham
                        window.nodeConnectCurrent = 0;
                        console.log("sai roi");
                    }
                }
            }
        }
    },
    
    handleConnectMuilti(){                                                          //xu ly set gia tri mang khi nguoi dung keo den nhieu diem khac nhau
        console.log("nodeConnectCurrent: " + window.nodeConnectCurrent);
        // window.arrChoice[window.nodeConnectCurrent-1] = 0;
        window.arrChoice[window.nodeCurrentTouch-1] = 0;                            //neu khong noi thi tra lai ve 0
        window.arrChoice[window.nodeConnectCurrent-1] = 0;

        window.nodeConnectCurrent = 0;
        // console.log(window.arrChoice[window.nodeConnectCurrent-1] + "->" + window.arrChoice[window.nodeCurrentTouch-1]);
        // console.log(window.arrChoice);
    },

    handleWhenTouchTrueNode(x, y){                                                  //xu ly khi cham den node va keo ra khoi node dich
        //noi toi node dang cham
        window.arrChoice[window.nodeCurrentTouch-1] = window.nodeConnectCurrent;                        //set cac gia tri noi
        window.arrChoice[window.nodeConnectCurrent-1] = window.nodeCurrentTouch;

        //cho duong keo den tam node
        if(window.zoom === false){
            this.chieuX = Math.abs(window.arrPoint[window.nodeConnectCurrent-1].x - x);                 //x, y la vi tri node duoc cham vao
            this.chieuY = Math.abs(window.arrPoint[window.nodeConnectCurrent-1].y - y);     
        }else{
            this.chieuX = Math.abs(window.arrPointZoom[window.nodeConnectCurrent-1].x - x);             //x, y la vi tri node duoc cham vao
            this.chieuY = Math.abs(window.arrPointZoom[window.nodeConnectCurrent-1].y - y); 
        }
                   

        // console.log(window.arrChoice[window.nodeConnectCurrent-1] + "->" + window.arrChoice[window.nodeCurrentTouch-1]);
        // console.log(window.arrChoice);
    },

    onTouchCancel(){
        console.log("TOUCH_CANCEL");
        window.nodeCurrentTouch = 0;
        
        //kiểm tra nếu đang chạm nút kia thì giữ không thì xóa
        if(window.nodeConnectCurrent === 0 && this._isDraw === true){
            this.onDestroy();                                           //vấn đề đang bị xóa nhiều lần
            window.nodeCurrentTouch = 0;
            console.log("Xoa");
        }
        this._isDraw = false;
    },

    onTouchEnd(){
        console.log("TOUCH_END");
        window.nodeCurrentTouch = 0;
        this._isDraw = false;
    },

    onDestroy(){
        this.node.destroy();
    },
    
    start () {

    },

    update (dt) {
        if(this._isDraw === true){
            this._deleteCheck = 0;
            if(window.zoom === false){
                this.calculateTheLengthAndAngle(this.node.x, this.node.y);              //tinh theo vi tri dat node ban dau
            }else{
                var newPosX, newPosY;
                newPosX = window.arrPointZoom[window.nodeCurrentTouch - 1].x;
                newPosY = window.arrPointZoom[window.nodeCurrentTouch - 1].y;
                this.calculateTheLengthAndAngle(newPosX, newPosY);                      //tinh theo vi tri dat node moi
            }
        }
    },
});
