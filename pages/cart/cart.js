// pages/cart/cart.js

import { getSetting, openSetting, chooseAddress } from "../../utils/grantPermission"
import { showDialog, showToast } from "../../utils/modeUtils"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collectAddress: {},
        cartList: [],
        totalAmount: {
            "allCheck": true,
            "totalPrice": 0.0,
            "checkCount": 0
        }
    },
    async handleAddressTap(e) {
        let result = await getSetting();
        const scopeAddress = result.authSetting["scope.address"];
        if (scopeAddress === false) {
            await openSetting();
        }
        let collectAddress = await chooseAddress();
        wx.setStorageSync('collect_address', collectAddress)
        this.setData({
            collectAddress
        });
    },
    checkChange(e) {
        const checkArray = e.detail.value;
        let cartList = JSON.parse(JSON.stringify(this.data.cartList));
        cartList.forEach((v, index) => {
            v.checked = checkArray.includes(index + '');
        });
        this.refreshUI(cartList);
    },
    allCheckTap(e) {
        let cartList = JSON.parse(JSON.stringify(this.data.cartList));
        cartList.forEach(v => v.checked = !this.data.totalAmount.allCheck);
        this.refreshUI(cartList);
    },
    async numChange(e) {
        const action = e.currentTarget.dataset.opertaion;
        const goodsId = e.currentTarget.dataset.val;
        let cartList = JSON.parse(JSON.stringify(this.data.cartList));
        let goods = cartList.find(v => v.goods_id === goodsId);
        let goodsNum = action === "add" ? goods.num + 1 : goods.num - 1;
        if (goodsNum < 1) {
            await showDialog({ 'title': '温馨提示', 'content': '确定要删除该商品吗?' });
            cartList.splice(cartList.findIndex(v => v.goods_id === goodsId), 1);
            wx.setStorageSync("cart_goods", cartList);
            showToast({ title: '删除成功' });
        } else {
            goods.num = goodsNum;
            wx.setStorageSync("cart_goods", cartList);
            showToast({ title: '修改成功' });
        }
        this.refreshUI(cartList);
    },
    refreshUI(tempCartList) {
        let cartList = JSON.parse(JSON.stringify(tempCartList));
        let totalAmount = JSON.parse(JSON.stringify(this.data.totalAmount));
        let checkCount = 0;
        let totalPrice = 0;
        cartList.forEach((v, index) => {
            totalPrice += v.checked ? v.price * v.num : 0;
            checkCount += v.checked ? 1 : 0;
        });

        totalAmount.checkCount = checkCount;
        totalAmount.allCheck = checkCount === cartList.length;
        totalAmount.totalPrice = totalPrice;
        this.setData({
            cartList,
            totalAmount
        });
    },
    toPay() {
        let checkCount = this.data.totalAmount.checkCount;
        if (!this.data.collectAddress.userName) {
            showToast({ title: "没有选择收获地址！" });
            return;
        }
        if (checkCount === 0) {
            showToast({ title: "请选择商品！" });
            return;
        }

        let checkGoodsList = this.data.cartList.filter(v => v.checked);
        let checkGoods = JSON.stringify(checkGoodsList);
        let address = JSON.stringify(this.data.collectAddress);
        wx.navigateTo({
            url: '../pay/pay?goods=' + checkGoods + "&address=" + address
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        let collectAddress = wx.getStorageSync("collect_address");
        let cartList = wx.getStorageSync("cart_goods");
        let totalAmount = JSON.parse(JSON.stringify(this.data.totalAmount));
        let checkCount = 0;
        let totalPrice = 0;
        let allCheck = false;

        if (cartList) {
            cartList.forEach((v) => {
                totalPrice += v.checked ? v.price * v.num : 0;;
                checkCount += v.checked ? 1 : 0;
            });
            allCheck = checkCount === cartList.length;
        }
        totalAmount.checkCount = checkCount;
        totalAmount.allCheck = allCheck;
        totalAmount.totalPrice = totalPrice;

        this.setData({
            cartList: cartList,
            collectAddress: collectAddress,
            totalAmount: totalAmount
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