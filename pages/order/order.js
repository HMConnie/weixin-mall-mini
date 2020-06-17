// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      "tab_id": 1,
      "tab_name": "全部",
      "checked": true
    },
    {
      "tab_id": 2,
      "tab_name": "待付款",
      "checked": false
    },
    {
      "tab_id": 3,
      "tab_name": "待收货",
      "checked": false
    },
    {
      "tab_id": 4,
      "tab_name": "退款/退货",
      "checked": false
    }
    ],
    goodsList: []
  },
  tabTap(e) {
    const index = e.detail;
    let tabs = JSON.parse(JSON.stringify(this.data.tabs));
    tabs.forEach((v, i) => {
      v.checked = index == i;
    });
    this.setData({
      tabs
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
    this.setData({
      tabs
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