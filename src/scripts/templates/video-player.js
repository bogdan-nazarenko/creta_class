const videoData = {
    handlers: new WeakMap(),
};

export const videoImpl = {
    startVideo(handler) {
        if (handler.isStarted) return;

        const { video, button } = handler;

        handler.isStarted = true;
        button.disabled = true;
        video.controls = true;
        video.play();
    },

    resetVideo(handler) {
        const { video, button } = handler;

        video.controls = false;
        video.load();
        button.disabled = false;
        handler.isStarted = false;
    },

    videoHandler(event) {
        if (event.type === "click") {
            videoImpl.startVideo(this);
        } else if (event.type === "ended") {
            videoImpl.resetVideo(this);
        }
    },

    init(player) {
        const handler = {
            isStarted: false,
            video: player.querySelector(".video-player__video"),
            button: player.querySelector(".video-player__button"),
            handleEvent: this.videoHandler,
        };

        player.addEventListener("click", handler);
        handler.video.addEventListener("ended", handler);

        videoData.handlers.set(player, handler);
    },

    disable(player) {
        const handler = videoData.handlers.get(player);

        player.removeEventListener("click", handler);
        handler.video.removeEventListener("ended", handler);

        videoData.handlers.delete(player);
    },
};
