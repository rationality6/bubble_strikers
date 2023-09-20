import Phaser from "phaser";

import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

const SHARED_CONFIG = {
  debug: false,
};

export default {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  parent: "game",
  backgroundColor: "transparent",
  scale: {
    width: 600,
    height: 900,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: SHARED_CONFIG.debug,
    },
  },

  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: UIPlugin,
        mapping: "rexUI",
      },
    ],
    // global: [
    //   { key: 'SceneWatcher', plugin: PhaserSceneWatcherPlugin, start: true }
    // ]
  },
};


