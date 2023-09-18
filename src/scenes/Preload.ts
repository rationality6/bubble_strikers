import PhaserSceneTool from "./PhaserSceneTool";

class Preload extends PhaserSceneTool {
  logo: Phaser.GameObjects.Image;

  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.loadLoadingScreen();

    this.load.spritesheet("catLaying", "assets/cat_laying.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("kfx-idle", "assets/kfx_idle.png", {
      frameWidth: 29,
      frameHeight: 145,
    });

    this.load.spritesheet('bustshot', 'assets/bustshot.png', {
      frameWidth: 69,
      frameHeight: 145
    });

    this.load.image("cover", "assets/strikers_cover.jpg");

    this.load.atlas('bubbles', 'assets/particles/bubbles.png', 'assets/particles/bubbles.json');
    
    this.load.image('sky', 'assets/ms3-sky.png');
    

    this.load.audio("daytonaBackgroundMusic", "assets/sounds/daytona.mp3");
  }

  loadingImagesMockup() {
    [...Array(5000).keys()].forEach((i) => {
      this.load.image(`catWalking${i}`, "assets/cat_walking.png");
    });
  }

  loadLoadingScreen() {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    // progressBox.fillRect(240, 270, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;

    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value) => {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 0.8);
      progressBar.fillRect(this.gameWidth / 2 - 160, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", (file) => {
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  create() {
    this.cameras.main.fadeIn(1000, 255, 255, 255);

    this.logo = this.add
      .image(this.gameWidth / 2, this.gameHeight / 2, "interpretLogoWithCat")
      .setScale(0.8);

    setTimeout(() => {
      this.cameras.main.fadeOut(1000, 255, 255, 255);
    }, 1800);

    setTimeout(() => {
      this.scene.start("OpningScene");
    }, 3000);
  }
  update(time: number, delta: number): void {
    if (time > 2000) {
      this.logo.angle += 3;
    }
  }
}

export default Preload;
