export default {
  addStageClearText() {
    this.add.text(
      this.gameWidth / 2 - 120,
      this.gameHeight / 2,
      ["Stage", "   Clear"],
      {
        fontFamily: "Arial",
        fontSize: 75,
        color: "#ffffff",
      }
    );
  },

  setStageClearRule() {
    if (this.score >= 2000) {
      this.stageEnded = true;
      this.emitter.explode();
      this.emitter.stop();

      this.addStageClearText();

      setTimeout(() => {
        this.stageClearAnimations();
      }, 6000);
    }
  },

  stageClearAnimations() {
    this.kfx.setCollideWorldBounds(false);
    this.kfx.setVelocityY(-900);

    setTimeout(() => {
      this.scene.start("Level2Scene");
    }, 2000);
  },
};
