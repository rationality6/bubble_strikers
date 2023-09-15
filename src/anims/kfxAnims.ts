export default (anims) => {
  anims.create({
    key: "kfx-idle",
    frames: anims.generateFrameNumbers("kfx-idle", {
      start: 0,
      end: 10,
    }),
    frameRate: 10,
    repeat: -1,
  });
};
