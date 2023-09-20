class CatCannon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "cat-cannon");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.setDepth(1);
    this.setScale(3);

    this.play("catLaying");
  }

  fire(x, y) {
    this.body.reset(x, y);

    this.setVelocityY(-700);

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

export default CatCannon;
