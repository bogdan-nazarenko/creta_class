const videoData = {
    handlers: new WeakMap(),
};

export const videoImpl = {
    startVideo(handler, video, button) {
        if (handler.isStarted) return;

        button.disabled = true;
        video.controls = true;
        handler.isStarted = true;
        video.play();

        video.addEventListener("ended", handler, { once: true });
    },

    endVideo(handler, video, button) {
        button.disabled = false;
        video.controls = false;
        handler.isStarted = false;
        video.load();
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

            videoImpl.endVideo(this, video, button);
        }
    },

    init(player) {
        const handler = {
            isStarted: false,
            handleEvent: this.videoHandler,
        };

        player.addEventListener("click", handler);
        videoData.handlers.set(player, handler);
    },

    disable(player) {
        const handler = videoData.handlers.get(player);

        player.removeEventListener("click", handler);
        videoData.handlers.delete(player);
    },
};
