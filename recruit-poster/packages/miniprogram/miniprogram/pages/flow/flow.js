const { SCENES } = require('../../shared/scenes.js');

const FLOW_STEPS = {
  startup: 7,
  club: 5,
  project: 5,
  event: 5,
};

Page({
  data: {
    sceneName: '',
    stepCount: 0,
  },
  onLoad(options) {
    const sceneId = options.sceneId;
    const scene = SCENES.find((s) => s.id === sceneId);
    this.setData({
      sceneName: scene ? scene.name : '',
      stepCount: FLOW_STEPS[sceneId] || 0,
    });
  },
  goBack() {
    wx.navigateBack();
  },
});
