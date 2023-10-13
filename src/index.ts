import Phaser from "phaser";
import config from "./config";

import PreloadLogo from "./scenes/PreloadLogo";
import Preload from "./scenes/Preload";
import OpeningScene from "./scenes/Opening";

import GameScene from "./scenes/Game";
import Level2Scene from "./scenes/Level2";
import EndingScene from "./scenes/Ending";

new Phaser.Game(
  Object.assign(config, {
    scene: [
      PreloadLogo,
      Preload,
      OpeningScene,
      GameScene,
      Level2Scene,
      EndingScene,
    ],
  })
);
