const videoData = {
    handlers: new WeakMap(),
};

export const videoImpl = {
    startVideo(handler, video, button) {
        if (handler.isStarted) return;

        handler.isStarted = true;
        button.disabled = true;
        video.controls = true;
        video.play();
    },

    resetVideo(handler, video, button) {
        video.controls = false;
        video.load();
        button.disabled = false;
        handler.isStarted = false;
    },

    videoHandler(event) {
        if (event.type === "click") {
            const player = event.currentTarget;
            const video = player.children[0];
            const button = player.children[1];

            videoImpl.startVideo(this, video, button);
        } else if (event.type === "ended") {
            const video = event.currentTarget;
            const button = video.nextElementSibling;

            videoImpl.resetVideo(this, video, button);
        }
    },

    init(player) {
        const handler = {
            isStarted: false,
            handleEvent: this.videoHandler,
        };

        player.addEventListener("click", handler);

        const video = player.children[0];

        video.addEventListener("ended", handler);

        videoData.handlers.set(player, handler);
    },

    disable(player) {
        const handler = videoData.handlers.get(player);

        player.removeEventListener("click", handler);

        const video = player.children[0];

        video.removeEventListener("ended", handler);

        videoData.handlers.delete(player);
    },
};
