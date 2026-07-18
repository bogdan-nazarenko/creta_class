const videoData = {
    handlers: new WeakMap(),
};

export const videoImpl = {
    startVideo(event) {
        const player = event.currentTarget;
        const video = player.children[0];
        const button = player.children[1];

        if (this.isStarted) return;

        button.disabled = true;
        video.controls = true;
        this.isStarted = true;
        video.play();

        video.addEventListener(
            "ended",
            () => {
                button.disabled = false;
                video.controls = false;
                this.isStarted = false;
                video.load();
            },
            { once: true }
        );
    },

    init(player) {
        const handler = {
            isStarted: false,
            handleEvent: this.startVideo,
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
