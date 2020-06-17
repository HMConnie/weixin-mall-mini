//index.js

import { request } from "../../request/request"
import regeneratorRuntime from "../../lib/runtime/runtime"


Page({
    data: {
        swiperList: [],
        catList: [],
        floorList: []
    },
    async loadData() {
        let bannerResult = await request({ "url": "/home/swiperdata" }); //banner
        let cartItemResult = await request({ "url": "/home/catitems" }) //导航分类
        let floorDataResult = await request({ "url": "/home/floordata" }); //楼层
        this.setData({
            swiperList: bannerResult,
            catList: cartItemResult,
            floorList: floorDataResult
        });
        wx.stopPullDownRefresh();
    },
    floorImageTap(e) {
        const imageIndex = e.currentTarget.dataset.imageIndex;
        const parentIndex = e.currentTarget.dataset.parentIndex;
        let floorData = this.data.floorList[parentIndex].product_list[imageIndex];
        let navUrl = floorData.navigator_url.replace('/pages/goods_list', "../goods_list/goods_list");
        wx.navigateTo({ url: navUrl });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadData();
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.loadData();
    }
})