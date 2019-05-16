Page({
  data: {
    musicList: [],
    pageSize: 15,
    pageNum: 1,
    pageTotal: 1,
    noMore: false
  },

  onLoad() {
    this.getMusicList();
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      pageNum: 1,
      noMore: false
    })
    this.getMusicList(true);
  },
  // 上拉加载
  onReachBottom() {
    if(this.data.pageNum < this.data.pageTotal) {
      this.getMusicList();
    } else {
      this.setData({
        noMore: true
      })
    }
  },

  getMusicList(isPullDown) {
    let _this = this;
    wx:wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://1304ryh.natapp1.cc/api/v1/music',
      data: {
        pageSize: _this.data.pageSize,
        pageNum: _this.data.pageNum,
      },
      method: 'get',
      success(res) {
        let data = res.data;
        if(data.code === 0) {
          let musicList = !isPullDown ? _this.data.musicList : [];
          musicList.push(...data.data.list)
           _this.setData({
             musicList: musicList,
             pageTotal: data.data.pageTotal,
             pageNum: ++_this.data.pageNum
          }) 
        } else {
          wx.showToast({
            title: data.msg,
            image: '/img/cuo.png'
          })
        }  
      },
      complete() {
        wx.hideLoading();
        isPullDown && wx.stopPullDownRefresh();
      }
    })
  },

  play(e) {
    // 当前的target元素元素上会有一个dataset的属性，这个属性里面的内容是元素身上的自定义属性
    let music = e.currentTarget.dataset.item;
    let title = music.title;
    let pic = encodeURIComponent(music.pic);
    let url = encodeURIComponent(music.url);
   
    // 跳转页面
    wx.navigateTo({
      url: `/pages/play/play?musictitle=${title}&musicImg=${pic}&musicUrl=${url}`,
    })
  }
})