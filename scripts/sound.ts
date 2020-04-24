class Sound {
    private _sound;
    private _fade;

    constructor(file: string, loop: boolean = false) {
        this._sound = document.createElement("audio");
        this._sound.src = file;
        this._sound.setAttribute("preload", "auto");
        this._sound.setAttribute("controls", "none");
        this._sound.style.display = "none";
        this._sound.loop = loop;
        this._sound.load();
        document.body.appendChild(this._sound);
    }

    Play(volume: number = 1) {
        if (this._fade != null) {
            clearInterval(this._fade);
            this._fade = null;
        }

        this._sound.volume = volume;
        this._sound.currentTime = 0;
        this._sound.play().then();
    }

    Stop() {
        let _this = this;
        _this._fade = setInterval(function () {

            if (_this._sound.volume > 0.1) {
                _this._sound.volume -= 0.1;
            }
            else {
                clearInterval(_this._fade);
                _this._fade = null;
                _this._sound.pause();
            }
        }, 200);
    }
}