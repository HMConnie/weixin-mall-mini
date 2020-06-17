// pages/goods_detail/goods_detail.js
import { request } from "../../request/request"
import regeneratorRuntime from "../../lib/runtime/runtime"
import { showToast } from "../../utils/modeUtils"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsDetail: [],
        collected: false // 修改收藏图标样式
    },
    imageTap(e) {
        const pics = JSON.parse(JSON.stringify(this.data.goodsDetail.pics));
        let urls = pics.map(v => v.pics_big_url);
        let index = e.currentTarget.dataset.opertaion;
        let current = urls[index];
        wx.previewImage({
            current: current,
            urls: urls
        });
    },

    tapView(e) {
        let opertaion = e.currentTarget.dataset.opertaion;
        let goods_id = this.data.goodsDetail.goods_id;
        let goods_image = this.data.goodsDetail.goods_small_logo;
        let goods_name = this.data.goodsDetail.goods_name;
        let goods_price = this.data.goodsDetail.goods_price;
        if (opertaion === "joinCar") {
            let cartGoods = wx.getStorageSync("cart_goods");
            let goods;
            if (cartGoods && cartGoods.length > 0) {
                goods = cartGoods.find(v => v.goods_id === goods_id);
            } else {
                cartGoods = [];
            }
            if (goods) {
                goods.num += 1;
            } else {
                goods = { "goods_id": goods_id, "num": 1, "image": goods_image, "name": goods_name, "price": goods_price, "checked": true };
                cartGoods.push(goods);
            }
            wx.setStorageSync("cart_goods", cartGoods);

            showToast({ title: '加入成功' });
        } else {

        }


    },
    collect(e) {
        let goodsDetail = JSON.parse(JSON.stringify(this.data.goodsDetail));
        let collectData = wx.getStorageSync("collect");
        if (!collectData) {
            collectData = { collectShops: [], collectGoods: [], followGoods: [], myFooter: [] };
        } else {
            let findObj = collectData.collectGoods.find(v => v.goods_id === goodsDetail.goods_id);
            if (findObj) {
                showToast({title:"已经收藏过了~"});
                return;
            }
        }
        collectData.collectGoods.push(goodsDetail);
        wx.setStorageSync("collect", collectData);

        showToast({title:"收藏成功~"});

        this.setData({
            collected: true
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let goodsDetail = await request({ "url": "/goods/detail", "goods_id": options.goods_id });
        this.setData({ goodsDetail: goodsDetail });

        let collectData = wx.getStorageSync("collect");
        if (collectData && collectData.collectGoods) {
            let findObj = collectData.collectGoods.find(v => { v.goods_id === goodsDetail.goods_id });
            if (findObj) {
                this.setData({
                    collected: true
                })

            }
        }
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