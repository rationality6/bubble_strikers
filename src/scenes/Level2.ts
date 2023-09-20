import PhaserSceneTool from "./PhaserSceneTool";
import Kfx from "../entities/Kfx";

import Bullets from "../groups/Bullets";

import commonMixin from "../mixins/commonMixin";

class Level2Scene extends PhaserSceneTool {
  kfx: any;
  kfxFX: any;
  kfxFXTween: any;

  background: any;
  bullets: any;

  bubbleEmitterFrequency: number = 30;

  middleOfBust: boolean = false;

  score: number = 0;
  scoreText: any;

  emitter: any;

  explode: any;
  hitExplode: any;

  stageEnded: boolean = false;

  constructor() {
    super("Level2Scene");

    Object.assign(this, commonMixin);
  }

  create() {
    this.kfx = new Kfx(this, 100, this.gameHeight + 40);;

    this.bullets = new Bullets(this);

    this.setBackgroud();
    this.setInputs();

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontFamily: "Arial",
      fontSize: 35,
      color: "#ffffff",
    });

    this.emitter = this.add.particles(300, 100, "star", {
      angle: { min: 240, max: 300 },
      speed: { min: 200, max: 300 },
      lifespan: 7000,
      gravityY: 180,
      quantity: 1,
    });
    const fx = this.emitter.postFX.addBokeh(0.5, 10, 0.2);

    this.explode = this.add.particles(300, 100, "bubbles", {
      frame: "elec1",
      angle: { start: 0, end: 360, steps: 32 },
      lifespan: 1500,
      speed: 400,
      quantity: 32,
      scale: { start: 0.5, end: 0 },
      emitting: false,
    });

    this.hitExplode = this.add.particles(300, 100, "bubbles", {
      frame: "redbubble",
      angle: { start: 0, end: 360, steps: 32 },
      lifespan: 800,
      speed: 400,
      quantity: 32,
      scale: { start: 0.5, end: 0 },
      emitting: false,
    });

    this.kfxFX = this.kfx.postFX.addBloom(0xffffff, 1, 1, 1, 3);
    this.kfxFX.setActive(false);

    this.kfxFXTween = this.tweens.add({
      targets: this.kfxFX,
      blurStrength: 2,
      yoyo: true,
      duration: 100,
      paused: true,
      onComplete: () => {
        this.kfxFXTween.restart();
        this.kfxFXTween.pause();
      },
    });
  }

  setBackgroud() {
    this.background = this.add.tileSprite(
      0,
      0,
      this.gameHeight,
      this.gameWidth - 10,
      "sky"
    );
    this.background.rotation = Math.PI / 2;
    this.background.setScale(3.2, 3.2);
  }

  getTime() {
    let d = new Date();
    return d.getTime();
  }

  setInputs() {
    this.input.on("pointermove", (pointer) => {
      if (this.stageEnded) {
        return;
      }
      this.kfx.x = pointer.worldX;
    });

    this.input.on("pointerdown", (pointer) => {
      this.bullets.fireBullet(this.kfx.x, this.kfx.y);

      if (this.firstClickTime == 0) {
        this.firstClickTime = this.getTime();
        return;
      }

      let elapsed = this.getTime() - this.firstClickTime;

      if (elapsed < 350) {
        console.log("double click");
      }
      this.firstClickTime = 0;
    });
  }

  update() {
    this.background.tilePositionX -= 5;

    if (this.stageEnded) {
      return;
    }
    this.scoreText.setText(this.score);

    const bullets = this.bullets.getChildren();

    bullets.forEach((bullet) => {
      if (bullet.active) {
        const particles = this.emitter.overlap(bullet.body);

        if (particles.length > 0) {
          particles.forEach((particle) => {
            console.log(particle.x)
            this.explode.emitParticleAt(particle.x, particle.y);
            this.score += 1;
            particle.kill();
            this.cameras.main.shake(50, 0.01);
          });
        }
      }
    });

    const emitterParticles = this.emitter.overlap(this.kfx.body);
    emitterParticles.forEach((particle) => {
      this.hitExplode.emitParticleAt(particle.x, particle.y);
      this.kfx.health -= 1;

      if (this.score > 0) {
        this.score -= 100;
      }

      if (!this.kfxFXTween.isPlaying()) {
        this.kfxFXTween.restart();
        this.kfxFXTween.play();
      }

      this.sound.play("hitBooming", { volume: 0.1 });
      particle.kill();
      this.cameras.main.shake(50, 0.01);
    });

    if (this.emitter.frequency > 5) {
      this.emitter.frequency = this.bubbleEmitterFrequency - this.score / 20;
    }

    this.setStageClearRule("EndingScene");
  }
}

export default Level2Scene;
