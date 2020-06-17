// pages/pay/pay.js

import { getSetting, openSetting, chooseAddress } from "../../utils/grantPermission"
import { showDialog, showToast, showLoading } from "../../utils/modeUtils"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collectAddress: {},
        cartList: [],
        totalAmount: {
            "totalPrice": 0.0,
            "checkCount": 0
        }
    },
    weixinPay(e) {
        showLoading({ title: "支付中..." });
        setTimeout(() => {
            wx.removeStorage({ key: 'cart_goods'});
            wx.hideLoading();
            wx.switchTab({ url: '../cart/cart'})

        }, 2000);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let collectAddress = JSON.parse(options.address);
        let cartList = JSON.parse(options.goods);
        let totalAmount = JSON.parse(JSON.stringify(this.data.totalAmount));

        let checkCount = 0;
        let totalPrice = 0;
        cartList.forEach((v, index) => {
            totalPrice += v.checked ? v.price * v.num : 0;;
            checkCount += v.checked ? 1 : 0;
        });

        totalAmount.checkCount = checkCount;
        totalAmount.totalPrice = totalPrice;

        this.setData({
            cartList: cartList,
            collectAddress: collectAddress,
            totalAmount: totalAmount
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