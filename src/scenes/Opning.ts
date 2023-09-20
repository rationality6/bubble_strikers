import PhaserSceneTool from "./PhaserSceneTool";

class OpningScene extends PhaserSceneTool {
  cover: Phaser.GameObjects.Image;

  TEXT1: string;
  constructor() {
    super("OpningScene");

    this.TEXT1 = `
"KFX 의 수습 조종사의 마지막 시험날"


뭐라고? 2000개나 터트려야 패스라고?


2000개가 장난인줄아나...


(숫자에 놀라지 말자.)


(마음을 비우고, 집중해.)


(지금까지 해온 연습들을 생각해.)


한 번에 하나씩 해내면 될꺼야.


(깊게 숨을 들이마셨다가) 후 시작해보자.
`;
  }

  async create() {
    this.cover = this.add.image(
      this.gameWidth / 2,
      this.gameHeight / 2,
      "pilot"
    );

    this.cover.setScale(1.6);

    await this.textBoxRun({
      self: this,
      name: "카나",
      content: this.TEXT1,
    });

    // this.add.text(
    //   this.gameWidth / 2 - 155,
    //   this.gameHeight / 2 + 120,
    //   ["Bubble Strikers", "   click to start"],
    //   {
    //     fontFamily: "Arial",
    //     fontSize: 45,
    //     color: "#ffffff",
    //   }
    // );

    this.input.on("pointerdown", () => {
      this.sound.add("daytonaBackgroundMusic", { volume: 0.1 }).play();
      this.scene.start("GameScene");
    });
  }
}

export default OpningScene;
