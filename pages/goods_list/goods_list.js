// pages/goods_list/goods_list.js
import { request } from "../../request/request"
import regeneratorRuntime from "../../lib/runtime/runtime"
import { showToast } from "../../utils/modeUtils"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
            "tab_id": 1,
            "tab_name": "综合",
            "checked": true
        },
        {
            "tab_id": 2,
            "tab_name": "销量",
            "checked": false
        },
        {
            "tab_id": 3,
            "tab_name": "价格",
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
            tabs: tabs
        });
    },
    paging: {
        "pageSize": 10,
        "curPage": 1,
        "pageCount": 1,
        "cat_id": 0,
        "query": ''
    },
    async loadData() {
        let result = await request({
            "url": "/goods/search",
            "cid": this.paging.cat_id,
            "pagenum": this.paging.curPage,
            "pagesize": this.paging.pageSize,
            "query": this.paging.query
        });

        let count = result.total / this.paging.pageSize;
        let pageCount = (result.total % this.paging.pageSize > 0) ? count + 1 : count
        this.paging.pageCount = pageCount;

        let goodsList = JSON.parse(JSON.stringify(this.data.goodsList));
        if (this.paging.curPage === 1) {
            goodsList = result.goods;
        } else {
            result.goods.forEach(v => {
                goodsList.push(v);
            });
        }
        this.setData({
            goodsList: goodsList
        })
        wx.stopPullDownRefresh();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.paging.query = options.query;
        this.paging.cat_id = options.cat_id;
        this.loadData();
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

        this.paging.curPage = 1;
        this.loadData();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let pageCount = this.paging.curPage + 1;
        if (pageCount > this.paging.pageCount) {
            showToast({ title: '没有更多数据了' });
            return
        }
        this.paging.curPage = pageCount;
        this.loadData();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})