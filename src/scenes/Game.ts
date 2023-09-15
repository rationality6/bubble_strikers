import PhaserSceneTool from "./PhaserSceneTool";
import Kfx from "../entities/Kfx";

class GameScene extends PhaserSceneTool {
  kfx: any;
  bg: any;
  bullets: any;

  score: number = 0;
  scoreText: any;

  constructor() {
    super("GameScene");
  }

  create() {
    this.kfx = new Kfx(this);
    this.kfx.setDepth(1);

    this.bullets = new Bullets(this);

    this.input.on("pointermove", (pointer) => {
      this.kfx.x = pointer.worldX;
    });
    this.input.on("pointerdown", (pointer) => {
      this.bullets.fireBullet(this.kfx.x, this.kfx.y);
    });

    this.bg = this.add.tileSprite(
      0,
      0,
      this.gameHeight,
      this.gameWidth - 10,
      "sky"
    );
    this.bg.rotation = Math.PI / 2;
    this.bg.setScale(3.2, 3.2);

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
      frequency: 20,
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

  update() {
    this.scoreText.setText(this.score);
    this.bg.tilePositionX -= 2;

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

    if (this.emitter.frequency > 1) {
      this.emitter.frequency = 20 - this.score / 50;
    }
  }
}

export default GameScene;

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bullet");
  }

  fire(x, y) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocityY(-900);
  }

  kill() {
    this.setActive(false);
    this.setVisible(false);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= -32) {
      this.kill();
    }
  }
}

class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 30,
      key: "bullet",
      active: false,
      visible: false,
      classType: Bullet,
    });
  }

  fireBullet(x, y) {
    let bullet = this.getFirstDead(true);

    if (bullet) {
      bullet.fire(x, y);
    }
  }
}
