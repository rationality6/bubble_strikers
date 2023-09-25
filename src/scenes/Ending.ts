import PhaserSceneTool from "./PhaserSceneTool";

class EndingScene extends PhaserSceneTool {
  constructor() {
    super("EndingScene");
  }

  create() {
    this.cameras.main.fadeIn(1000, 255, 255, 255);

    this.logo = this.add
      .image(this.gameWidth / 2, this.gameHeight / 2, "interpretLogoWithCat")
      .setScale(0.8);

    setTimeout(() => {
      this.cameras.main.fadeOut(1000, 255, 255, 255);
    }, 1800);

    this.add.text(
      this.gameWidth / 2 - 245,
      this.gameHeight / 2 - 190,
      [
        "Thank you for playing.",
        "Bubble Strikers Alpha Ended",
        "해주셔서 감사합니다 🥹🥹🥹",
      ],
      {
        fontFamily: "Arial",
        fontSize: 45,
        color: "#ffffff",
      }
    );
  }
}

export default EndingScene;
