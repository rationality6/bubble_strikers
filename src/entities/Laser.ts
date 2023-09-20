class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "laser");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.x += 200

    this.setDepth(1);
    this.setScale(8);
  }

  fire(x, y) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.scene.middleOfBust = true;

    this.play("bustshot");

    setTimeout(() => {
      this.scene.middleOfBust = false;
    }, 1500);
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

export default Laser;
