const { SCENES } = require('../../shared/scenes.js');

Page({
  data: {
    scenes: SCENES,
  },
  onPickScene(e) {
    const id = e.currentTarget.dataset.id;
    const app = getApp();
    app.globalData.sceneId = id;
    app.globalData.answers = {};
    wx.navigateTo({ url: `/pages/flow/flow?sceneId=${id}` });
  },
});
