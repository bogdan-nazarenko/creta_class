import { videoImpl } from "../templates/video-player.js";

const guide = document.querySelector(".guide");
const player = guide.querySelector(".video-player");

videoImpl.init(player);
