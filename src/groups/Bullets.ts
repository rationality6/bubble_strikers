import Bullet from "../entities/Bullet";

class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 1,
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

export default Bullets;
