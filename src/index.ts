import Phaser from 'phaser';
import config from './config';

import PreloadLogo from './scenes/PreloadLogo';
import Preload from './scenes/Preload';
import OpningScene from './scenes/Opning';

import GameScene from './scenes/Game';
import Level2Scene from './scenes/Level2';

new Phaser.Game(
  Object.assign(config, {
    scene: [
      PreloadLogo,
      Preload,
      OpningScene,
      GameScene,
      Level2Scene
    ]
  })
);
