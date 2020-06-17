// pages/category/category.js
import { request } from "../../request/request"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        categoryList: [],
        contentList: [],
        scrollTop: 0
    },
    Categorys: [], //定义成员变量
    categoryTap(e) {
        const checkIndex = e.currentTarget.dataset.opration;
        const categoryList = JSON.parse(JSON.stringify(this.data.categoryList))
        categoryList.forEach(v => {
            v.checked = false;
        })

        categoryList[checkIndex].checked = true;
        this.setData({
            categoryList: categoryList,
            contentList: this.Categorys[checkIndex].children,
            scrollTop: 0
        })

    },
    async loadData() {
        this.Categorys = await request({ "url": "/categories" });
        wx.setStorageSync('cates', { "time": Date.now(), "categorys": this.Categorys });

        let categoryList = [];
        this.Categorys.forEach((item, index) => {
            categoryList.push({
                "cat_id": item.cat_id,
                "cat_name": item.cat_name,
                "checked": index === 0
            })
        })
        this.setData({
            categoryList: categoryList,
            contentList: this.Categorys[0].children
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let cates = wx.getStorageSync("cates");
        if (!cates) {
            this.loadData();
        } else {
            this.Categorys = cates.categorys;
            let categoryList = [];
            this.Categorys.forEach((item, index) => {
                categoryList.push({
                    "cat_id": item.cat_id,
                    "cat_name": item.cat_name,
                    "checked": index === 0
                })
            })
            this.setData({
                categoryList: categoryList,
                contentList: this.Categorys[0].children
            })
            if (Date.now() - cates.time > 1000 * 30) { //刷新数据
                this.loadData();
            }
        }

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})