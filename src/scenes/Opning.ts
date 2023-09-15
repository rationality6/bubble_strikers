import PhaserSceneTool from "./PhaserSceneTool";

class OpningScene extends PhaserSceneTool {
  cover: Phaser.GameObjects.Image;

  constructor() {
    super("OpningScene");
  }

  create() {
    this.cover = this.add.image(
      this.gameWidth / 2,
      this.gameHeight / 2,
      "cover"
    );

    this.add.text(
      this.gameWidth / 2 - 123,
      this.gameHeight / 2 + 140,
      ["Bubble Strikers", "   click to start"],
      {
        fontFamily: "Arial",
        fontSize: 35,
        color: "#ffffff",
      }
    );

    this.input.on("pointerdown", () => {
      this.sound.add("daytonaBackgroundMusic", { volume: 0.3 }).play();
      this.scene.start("GameScene");
    });
  }
}

export default OpningScene;