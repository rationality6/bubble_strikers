import PhaserSceneTool from "./PhaserSceneTool";

import Kfx from "../entities/Kfx";

import Bullets from "../groups/Bullets";
import Laser from "../entities/Laser";

import commonMixin from "../mixins/commonMixin";

class GameScene extends PhaserSceneTool {
  kfx: any;
  kfxFX: any;
  kfxFXTween: any;

  background: any;
  bullets: any;
  laser: any;

  bubbleEmitterFrequency: number = 30;

  middleOfBust: boolean = false;

  score: number = 0;
  scoreText: any;

  emitter: any;

  explode: any;
  hitExplode: any;

  stageEnded: boolean = false;

  constructor() {
    super("GameScene");

    Object.assign(this, commonMixin);
  }

  create() {
    this.kfx = new Kfx(this, 100, this.gameHeight + 40);
    
    this.bullets = new Bullets(this);

    this.setBackgroud();
    this.setInputs();

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontFamily: "Arial",
      fontSize: 35,
      color: "#ffffff",
    });

    this.setEmitter();

    this.hitExplode = this.add.particles(0, 0, "bubbles", {
      frame: "redbubble",
      angle: { start: 0, end: 360, steps: 32 },
      lifespan: 800,
      speed: 400,
      quantity: 32,
      scale: { start: 0.5, end: 0 },
      emitting: false,
    });

    this.kfxFX = this.kfx.postFX.addBloom(0xffffff, 1, 1, 0, 9);
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

  async setEmitter() {
    await this.setDelay(4000);

    this.emitter = this.add.particles(0, 0, "bubbles", {
      x: 100,
      y: 30,
      frame: ["bluebubble", "redbubble", "greenbubble", "silverbubble"],
      scale: { min: 0.25, max: 1 },
      rotate: { start: 0, end: 360 },
      speed: { min: 50, max: 100 },
      lifespan: 6000,
      frequency: this.bubbleEmitterFrequency,
      blendMode: "ADD",
      gravityY: 110,
    });

    this.tweens.add({
      targets: this.emitter,
      particleX: 500,
      yoyo: true,
      repeat: -1,
      ease: "sine.inout",
      duration: 1000,
    });

    this.explode = this.add.particles(0, 0, "bubbles", {
      frame: "elec1",
      angle: { start: 0, end: 360, steps: 32 },
      lifespan: 1500,
      speed: 400,
      quantity: 32,
      scale: { start: 0.5, end: 0 },
      emitting: false,
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
      if (this.stageEnded) {
        return;
      }

      this.bullets.fireBullet(this.kfx.x, this.kfx.y - 200);

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

  update(time: number, delta: number): void {
    this.background.tilePositionX -= 5;

    if (this.stageEnded) {
      return;
    }

    this.scoreText.setText(this.score);

    if (!this.emitter) {
      return;
    }

    const bullets = this.bullets.getChildren();

    bullets.forEach((bullet) => {
      if (bullet.active) {
        const particles = this.emitter.overlap(bullet.body);

        if (particles.length > 0) {
          particles.forEach((particle) => {
            this.explode.emitParticleAt(particle.x, particle.y);
            this.score += 1;
            // bullet.kill()
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
        this.score -= 10;
      }

      if (!this.kfxFXTween.isPlaying()) {
        this.kfxFXTween.restart();
        this.kfxFXTween.play();
      }

      this.sound.play("hitBooming", { volume: 0.1 });
      particle.kill();
      this.cameras.main.shake(50, 0.01);
    });

    if (this.emitter.frequency > 3) {
      this.emitter.frequency = this.bubbleEmitterFrequency - this.score / 20;
    }

    this.setStageClearRule("Level2Scene");
  }
}

export default GameScene;
