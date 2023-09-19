import PhaserSceneTool from "./PhaserSceneTool";

class OpningScene extends PhaserSceneTool {
  cover: Phaser.GameObjects.Image;

  constructor() {
    super("OpningScene");
  }

  async create() {
    this.cover = this.add.image(
      this.gameWidth / 2,
      this.gameHeight / 2,
      "pilot"
    );

    this.cover.setScale(1.6);

    
    await textBoxRun({
      self: this,
      name: "카나",
      content: TEXT1,
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
      this.sound.add("daytonaBackgroundMusic", { volume: 0.3 }).play();
      this.scene.start("GameScene");
    });
  }
}

export default OpningScene;



const TEXT1 = `
뭐라고? 2000개나 맞춰야 패스라고?


(숫자에 놀라지 말자.)


(마음을 비우고, 집중해.)


(지금까지 해온 연습들을 생각해.)


한 번에 하나씩 해내면 될꺼야.


(깊게 숨을 들이마셨다가) 후 시작해보자.
`;


const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

function textBoxRun({ self, name, content }) {
  return new Promise((resolve, reject) => {
    let textBox = self.rexUI.add
      .textBox({
        x: 300,
        y: 720,
        innerBackground: self.rexUI.add.roundRectangle({
          radius: 20,
          color: COLOR_DARK,
          strokeColor: COLOR_LIGHT,
          strokeWidth: 2,
        }),

        text: self.rexUI.add.BBCodeText(0, 0, "", {
          fixedWidth: 400,
          fixedHeight: 65,

          fontSize: 20,
          wrap: {
            mode: "word",
            width: 500,
          },
        }),

        title: self.rexUI.add.label({
          width: 150,
          background: self.rexUI.add.roundRectangle({
            radius: 10,
            color: COLOR_PRIMARY,
            strokeColor: COLOR_LIGHT,
            strokeWidth: 2,
          }),
          text: self.add.text(0, 0, name, { fontSize: 24 }),
          align: "center",
          space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            icon: 10,
            text: 10,
          },
        }),

        action: self.add
          .image(0, 0, "nextPage")
          .setTint(COLOR_LIGHT)
          .setVisible(false),

        space: {
          // For innerSizer
          innerLeft: 20,
          innerRight: 20,
          innerTop: 30,
          innerBottom: 20,

          title: -20,
          titleLeft: 30,
          icon: 10,
          text: 10,
        },
      })
      .layout();

    let scene = self;
    textBox
      .setInteractive()
      .on(
        "pointerdown",
        function () {
          let icon = this.getElement("action").setVisible(false);
          this.resetChildVisibleState(icon);
          if (self.isTyping) {
            this.stop(true);
          } else if (!self.isLastPage) {
            this.typeNextPage();
          } else {
            // Next actions
          }
        },
        textBox
      )
      .on(
        "pageend",
        function () {
          new Audio("assets/sounds/keyboard-typing-2.mp3").play();
          if (self.isLastPage) return;
          let icon = this.getElement("action").setVisible(true);
          this.resetChildVisibleState(icon);
          icon.y -= 30;
          let tween = scene.tweens.add({
            targets: icon,
            y: "+=30", // '+=100'
            ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: 0, // -1: infinity
            yoyo: false,
          });
        },
        textBox
      )
      .on("complete", function () {
        console.log("all pages typing complete");
        resolve();
      });
    //.on('type', function () {
    //})

    textBox.start(content, 10);
  });
}
