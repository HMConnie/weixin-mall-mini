// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userTab: [{
      "id": 1,
      "num": 0,
      "name": "收藏的店铺",
      "url": '../collect/collect?id=0'
    },
    {
      "id": 2,
      "num": 0,
      "name": "收藏的商品",
      "url": '../collect/collect?id=1'
    },
    {
      "id": 3,
      "num": 0,
      "name": "关注的商品",
      "url": '../collect/collect?id=2'
    },
    {
      "id": 4,
      "num": 0,
      "name": "我的足迹",
      "url": '../collect/collect?id=3'
    }
    ],
    userOrder: [{
      "id": 1,
      "icon": "icon-ding_dan",
      "name": "全部订单",
      "url": '../order/order?id=0'
    },
    {
      "id": 2,
      "icon": "icon-yixianshi",
      "name": "待付款",
      "url": '../order/order?id=1'
    },
    {
      "id": 3,
      "icon": "icon-gouwuche",
      "name": "待收货",
      "url": '../order/order?id=2'
    },
    {
      "id": 4,
      "icon": "icon-tuihuotuikuan_dianpu",
      "name": "退款/退货",
      "url": '../order/order?id=3'
    }
    ],
    otherItems: [{
      "id": 1,
      "left": "管理收获地址",
      "right": ''
    },
    {
      "id": 2,
      "left": "联系客服",
      "right": '010-88888888'
    },
    {
      "id": 3,
      "left": "意见反馈",
      "right": ''
    },
    {
      "id": 4,
      "left": "关于我们",
      "right": ''
    }
    ]

  },
  handleUserInfo(e) {
    let userInfo = e.detail.userInfo;
    wx.setStorageSync("userInfo", userInfo);
    this.setData({
      userInfo
    });
  },
  orderTap(e) {
    const index = e.currentTarget.dataset.operation;
    let url = this.data.userOrder[index].url;
    wx.navigateTo({ url: url });
  },
  collectTap(e) {
    const index = e.currentTarget.dataset.operation;
    let url = this.data.userTab[index].url;
    wx.navigateTo({ url: url });
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
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
    let userTab = JSON.parse(JSON.stringify(this.data.userTab));
    const collect = wx.getStorageSync("collect");
    if (collect) {
      userTab.forEach((v, index) => {
        switch (index) {
          case 0:
            v.num = collect.collectShops.length;
            break;
          case 1:
            v.num = collect.collectGoods.length;
            break;
          case 2:
            v.num = collect.followGoods.length;
            break;
          case 3:
            v.num = collect.myFooter.length;
            break;
        }
      });
    }

    this.setData({
      userTab
    });

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