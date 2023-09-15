import initAnimations from "../anims/kfxAnims";

class Kfx extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 100, scene.gameHeight + 200, "kfx-idle");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setSize(45, 45);
    this.setOffset(-9, 5);

    initAnimations(this.scene.anims);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.setScale(2.5);
    this.setCollideWorldBounds(true);
    this.play("kfx-idle", true);
  }

  update(...args: any[]): void {

  }
}

export default Kfx;
