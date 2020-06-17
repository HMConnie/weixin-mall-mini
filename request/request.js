/**封装链式网络请求，类似RxJava***/
const BASE_URL = "https://api-hmugo-web.itheima.net/api/public/v1";
let showLoadingCount = 0; //显示loading框的次数
export const request = (params) => {
    showLoadingCount++;
    wx.showLoading({ title: '加载中', mask: true });
    const method = params["method"] === undefined ? "GET" : params["method"];

    let data = {};//去除数据undefined的属性
    Object.keys(params).forEach(key => {
        let value = params[key];
        if (key != 'url' && key != "method" && value != undefined) {
            data[key] = value;
        }
    });

    return new Promise((resolve, reject) => {
        wx.request({
            data: data,
            method: method,
            url: BASE_URL + params.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                showLoadingCount--;
                if (showLoadingCount === 0) {
                    wx.hideLoading();
                }
            }
        });
    })
}