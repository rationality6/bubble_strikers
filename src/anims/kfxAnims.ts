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

  anims.create({
    key: "bustshot",
    frames: anims.generateFrameNumbers("bustshot", {
      start: 0,
      end: 15,
    }),
    frameRate: 10,
    repeat: 0,
  });
};
