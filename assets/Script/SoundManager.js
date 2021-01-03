cc.Class({
    extends: cc.Component,
    editor: {
        menu:"CustomComponent/AudioControl",
    },
    properties: {
        backGroupSound: {
            default: null,
            type: cc.AudioClip
        },

        loop: true,
        
        soundVolume: {
            default: 1,
            range: [0,1,0.1],
            slide: true,
            notify: function() {
                this.setVolume();
            }
        },

        audioClipPool: {
            default: [],
            type: cc.AudioClip
        },

        audioClipQuestion: {
            default: [],
            type: cc.AudioClip
        },

        audioCLipAnswer: {
            default: [],
            type: cc.AudioClip
        },
        
        _isPlaying: false,
        _audioId: null,
        _EffectId: null,
    },

    //Âm thanh nền
    playBackGroundSound () {
        cc.audioEngine.stopAll();
        this._audioId = cc.audioEngine.play(this.backGroupSound, this.loop, this.soundVolume);
    },

    //hiệu ứng âm thanh khi chơi game
    playEffectSound (command, loop) {
        if (loop === null && loop === undefined) {
            var loop = this.loop;
        }
        if (command !== null || command !== undefined) {
            switch (command) {
                case "traloidung":
                    this._EffectId = cc.audioEngine.playEffect(this.audioClipPool[0], loop);
                    break;
                case "traloisai":
                    this._EffectId = cc.audioEngine.playEffect(this.audioClipPool[1], loop);
                    break;
                default:
                    console.error("Command is invalid");
            }
        }
    },

    playQuestion (command, loop) {
        if (loop === null && loop === undefined) {
            var loop = this.loop;
        }
        if (command !== null || command !== undefined) {
            switch (command) {
                case "cauhoi":
                    this._EffectId = cc.audioEngine.playEffect(this.audioClipQuestion[0], loop);
                    break;
                default:
                    console.error("Command is invalid");
            }
        }
    },

    playSoundAnswer(command, loop){
        if (loop === null && loop === undefined) {
            var loop = this.loop;
        }
        if (command !== null || command !== undefined) {
            switch (command) {
                case "a":
                    this._EffectId = cc.audioEngine.playEffect(this.audioCLipAnswer[0], loop);
                    break;
                case "b":
                    this._EffectId = cc.audioEngine.playEffect(this.audioCLipAnswer[1], loop);
                    break;
                case "c":
                    this._EffectId = cc.audioEngine.playEffect(this.audioCLipAnswer[2], loop);
                    break;
                case "d":
                    this._EffectId = cc.audioEngine.playEffect(this.audioCLipAnswer[3], loop);
                    break;
                case "e":
                    this._EffectId = cc.audioEngine.playEffect(this.audioCLipAnswer[4], loop);
                    break;
                default:
                    console.error("Command is invalid");
            }
        }
    },

    pauseMusic () {
        cc.audioEngine.pauseAll();      //dừng tất cả âm thanh
    },

    resumeMusic () {
        cc.audioEngine.resumeAll();     //tạm dừng tất cả âm thanh
    },

    setVolume() {
        cc.audioEngine.setVolume(this.soundVolume);     //thiết lập âm lượng
    },

    stopAll () {
        cc.audioEngine.stopAll();       //dừng lại tất cả
        this._audioId = null;
    },
});
