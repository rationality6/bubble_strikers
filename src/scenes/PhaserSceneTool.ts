class PhaserSceneTool extends Phaser.Scene {
  get gameHeight() {
    return this.game.config.height as number;
  }

  get gameWidth() {
    return this.game.config.width as number;
  }

  constructor(key: string) {
    super(key);
  }

  get isLocal() {
    return location.hostname === "localhost" ||
      location.hostname === "127.0.0.1"
      ? true
      : false;
  }

  setDelay(time: number) {
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, time)
    );
  }

  textBoxRun({ self, name, content }) {
    const COLOR_PRIMARY = 0x3e342e;
    const COLOR_LIGHT = 0x3b5e57;
    const COLOR_DARK = 0x160e04;

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
          () => {
            let icon = textBox.getElement("action").setVisible(false);
            textBox.resetChildVisibleState(icon);
            if (self.isTyping) {
              textBox.stop(true);
            } else if (!self.isLastPage) {
              textBox.typeNextPage();
            } else {
              // Next actions
            }
          },
          textBox
        )
        .on(
          "pageend",
          () => {
            new Audio("assets/sounds/keyboard-typing-2.mp3").play();
            if (self.isLastPage) return;
            let icon = textBox.getElement("action").setVisible(true);
            textBox.resetChildVisibleState(icon);
            // icon.y -= 30;
            // let tween = scene.tweens.add({
            //   targets: icon,
            //   y: "+=30", // '+=100'
            //   ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            //   duration: 500,
            //   repeat: 0, // -1: infinity
            //   yoyo: false,
            // });
          },
          textBox
        )
        .on("complete", function () {
          resolve("all pages typing complete");
        });

      textBox.start(content, 10);
    });
  }
  
}

export default PhaserSceneTool;
