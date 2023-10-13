import PhaserSceneTool from "./PhaserSceneTool";

class OpeningScene extends PhaserSceneTool {
  cover: Phaser.GameObjects.Image;

  TEXT1: string;
  constructor() {
    super("OpeningScene");

    this.TEXT1 = `
"KFX 수습 조종사의 마지막 시험날"


뭐라고? 5000개나 터트려야 패스라고?


5000개가 장난인줄아나...


(숫자에 놀라지 말자.)


(마음을 비우고, 집중해.)


(지금까지 해온 연습들을 생각해.)


한 번에 하나씩 해내면 될꺼야.


(깊게 숨을 들이마셨다가) 후 시작해보자.


애프터버너 온!
`;
  }

  async create() {
    this.cover = this.add.image(
      this.gameWidth / 2,
      this.gameHeight / 2,
      "pilot"
    );

    this.cover.setScale(1.6);

    this.sound.play("tooMany", { volume: 0.5 });

    await this.textBoxRun({
      self: this,
      name: "김민주",
      content: this.TEXT1,
    });

    this.sound.add("afterBunnerOn", { volume: 0.5 }).play();

    this.input.on("pointerdown", () => {
      this.sound.play("daytonaBackgroundMusic", { volume: 0.1 });
      this.scene.start("GameScene");
    });
  }
}

export default OpeningScene;
