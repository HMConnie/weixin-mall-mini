// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      "tab_id": 1,
      "tab_name": "收藏的店铺",
      "checked": true
    },
    {
      "tab_id": 2,
      "tab_name": "收藏的商品",
      "checked": false
    },
    {
      "tab_id": 3,
      "tab_name": "关注的商品",
      "checked": false
    },
    {
      "tab_id": 4,
      "tab_name": "我的足迹",
      "checked": false
    }
    ],
    collectData: {
      collectShops: [],
      collectGoods: [],
      followGoods: [],
      myFooter: []
    }
  },
  tabTap(e) {
    const index = e.detail;
    let tabs = JSON.parse(JSON.stringify(this.data.tabs));
    tabs.forEach((v, i) => {
      v.checked = index == i;
    });
    this.setData({
      tabs: tabs
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const index = options.id;
    let tabs = JSON.parse(JSON.stringify(this.data.tabs));
    tabs.forEach((v, i) => {
      v.checked = index == i;
    });

    
    let collectData = wx.getStorageSync("collect");
    this.setData({
      tabs,
      collectData
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})