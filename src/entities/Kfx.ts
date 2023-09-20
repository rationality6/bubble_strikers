import initAnimations from "../anims/kfxAnims";

class Kfx extends Phaser.Physics.Arcade.Sprite {
  health: number = 10;

  constructor(scene: any, x: number, y: number, key: string) {
    super(scene, x, y, "kfx-idle");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setSize(5, 5);
    this.setOffset(12, 18);

    initAnimations(this.scene.anims);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.setScale(2.5);
    this.setCollideWorldBounds(true);

    this.setDepth(1);

    this.play("kfx-idle", true);
    this.body.reset(x, y);
  }

  update(...args: any[]): void {}
}

export default Kfx;
