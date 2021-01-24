cc.Class({
    extends: cc.Component,

    properties: {
        videoPlayer: cc.VideoPlayer,
        playVideoArea: cc.Node,
    },

    onLoad() {
        this.videoPlayer.parent = this.videoParent;
    },

    start () {
        this.playVideoArea.on(cc.Node.EventType.TOUCH_END, this.switchPlayPause, this);
    },

    onVideoPlayerEvent (sender, event) {
        if (event === cc.VideoPlayer.EventType.CLICKED) {
            if (this.videoPlayer.isPlaying()) {
                this.videoPlayer.pause();
            } else {
                this.videoPlayer.play();
            }
        }
        else if (event === cc.VideoPlayer.EventType.READY_TO_PLAY || event === cc.VideoPlayer.EventType.META_LOADED) {
            this.playVideoArea.active = true;
        }
        else if (event === cc.VideoPlayer.EventType.PLAYING) {
            this.playVideoArea.active = false;
        }
    },

    toggleFullscreen () {
        if (cc.sys.isBrowser && cc.sys.browserType === cc.sys.BROWSER_TYPE_MOBILE_QQ && cc.sys.browserVersion <= 7.2 && /Nexus 6/.test(navigator.userAgent)) {
            return cc.log('May be crash, so prohibit full screen');
        }
        this.videoPlayer.isFullscreen = true;
    },

    switchPlayPause (){
        if (this.videoPlayer.isPlaying()) {
            this.videoPlayer.pause();
            this.playVideoArea.opacity = 255;
            console.log("pause");
        } else {
            this.videoPlayer.play();
            this.playVideoArea.opacity = 0;
            console.log("play");
        }
    },

    play () {
        this.videoPlayer.play();
        this.playVideoArea.active = false;
    },

    pause () {
        this.videoPlayer.pause();
        this.playVideoArea.active = true;
    },

    skip(){
        this.videoPlayer.stop();
    },

    stop () {
        this.videoPlayer.stop();
    },

    switchOnlineVideo () {
        this.videoPlayer.remoteURL = '';
        this.videoPlayer.resourceType = cc.VideoPlayer.ResourceType.REMOTE;
        this.playVideoArea.active = true;
    },

    update () {
        
    }

});
