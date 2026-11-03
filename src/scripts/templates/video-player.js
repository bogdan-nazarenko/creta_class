class VideoPlayer {
    static #registry = new WeakMap();

    constructor(player) {
        this.player = document.querySelector(player);
        this.isStarted = false;
        this.video = this.player.querySelector(".video-player__video");
        this.button = this.player.querySelector(".video-player__button");

        this.init();
    }

    handleEvent(event) {
        if (event.type === "click") {
            this.startVideo();
        } else if (event.type === "ended") {
            this.resetVideo();
        }
    }

    startVideo() {
        this.isStarted = true;
        this.button.disabled = true;
        this.video.controls = true;
        this.video.play();
    }

    resetVideo() {
        this.video.controls = false;
        this.video.load();
        this.button.disabled = false;
        this.isStarted = false;
    }

    init() {
        this.player.addEventListener("click", this);
        this.video.addEventListener("ended", this);

        VideoPlayer.#registry.set(this.player, this);
    }

    disable() {
        const handler = VideoPlayer.#registry.get(this.player);

        this.player.removeEventListener("click", handler);
        this.video.removeEventListener("ended", handler);

        VideoPlayer.#registry.delete(this.player);
    }
}

export default VideoPlayer;
