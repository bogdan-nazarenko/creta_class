const videoData = {
    players: document.querySelectorAll(".video-player"),
    handlers: [],
};

const videoImpl = {
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

    init() {
        videoData.players.forEach((player) => {
            const handler = {
                isStarted: false,
                handleEvent: this.startVideo,
            };

            player.addEventListener("click", handler);
            videoData.handlers.push(handler);
        });
    },

    disable() {
        videoData.players.forEach((player, index) => {
            player.removeEventListener("click", videoData.handlers[index]);
        });

        videoData.handlers.length = 0;
    },
};

videoImpl.init();
