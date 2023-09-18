import PhaserSceneTool from "./PhaserSceneTool";
import Kfx from "../entities/Kfx";

import Bullets from "../groups/Bullets";

class GameScene extends PhaserSceneTool {
  kfx: any;
  background: any;
  bullets: any;

  bubbleEmitterFrequency: number = 30;

  middleOfBust: boolean = false;

  score: number = 0;
  scoreText: any;

  emitter: any;

  constructor() {
    super("GameScene");
  }

  create() {
    this.kfx = new Kfx(this);

    this.bullets = new Bullets(this);

    this.setBackgroud();
    this.setInputs();

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontFamily: "Arial",
      fontSize: 35,
      color: "#ffffff",
    });

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

    this.emitter.createC

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

  setInputs() {
    this.input.on("pointermove", (pointer) => {
      this.kfx.x = pointer.worldX;
    });

    this.input.on("pointerdown", (pointer) => {
      this.bullets.fireBullet(this.kfx.x, this.kfx.y);
    });
  }

  update() {
    this.scoreText.setText(this.score);
    this.background.tilePositionX -= 5;

    const bullets = this.bullets.getChildren();

    bullets.forEach((bullet) => {
      if (bullet.active) {
        const particles = this.emitter.overlap(bullet.body);

        if (particles.length > 0) {
          particles.forEach((particle) => {
            this.explode.emitParticleAt(particle.x, particle.y);
            this.score += 1;
            particle.kill();
            this.cameras.main.shake(50, 0.01);
          });
        }
      }
    });

    const particles = this.emitter.overlap(this.kfx.body);
    particles.forEach((particle) => {
      console.log("hit");
    })

    if (this.emitter.frequency > 5) {
      this.emitter.frequency = this.bubbleEmitterFrequency - this.score / 100;
    }
  }
}

export default GameScene;
