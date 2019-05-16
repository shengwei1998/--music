Page({
  data: {
    musictitle: null,
    musicImg: null,
    musicUrl: null
  },
  // onLoad 会自动接收options这个参数
  onLoad(options) {
    this.setData({
      musictitle: options.musictitle,
      musicImg: decodeURIComponent(options.musicImg),
      musicUrl: decodeURIComponent(options.musicUrl),
    });
  },

  playMusic() {
    // 直接播放音乐
    // 创建音频内部audio对象
    this.audio = wx.createInnerAudioContext();
    // 给audio对象加属性
    this.audio.src = this.data.musicUrl;
    // 开始播放
    this.audio.play();
  },

  onUnload() {
    // 推出就销毁音乐
    this.audio.destroy();
  }
})