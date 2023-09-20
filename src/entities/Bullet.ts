class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bullet");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.setDepth(1);
    this.setScale(3);

    this.scene.anims.create({
      key: "catLaying",
      frames: this.anims.generateFrameNumbers("catLaying", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.play("catLaying")
  }

  fire(x, y) {
    this.body.reset(x, y);

    this.setVelocityY(-700)

    this.setActive(true);
    this.setVisible(true);
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
  update() {}
}

export default Bullet;
