/**
 * 显示普通对话框
 */
export const showDialog = (params) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: params.title,
            content: params.content,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                if (result.confirm) {
                    resolve(result);
                }
            },
            fail: (error) => {
                reject(error);
            }
        });
    })
}


/**
* 显示普通对话框
*/
export const showToast = (params) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: params.title,
            duration: 1500,
            mask: true,
            success: (result) => {
                resolve(result);
            },
            fail: (error) => {
                reject(error);
            }

        });


    })
}

export const showLoading = (params) => {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: params.title,
            mask: true,
            success: (result)=>{
                resolve(result)
            },
            fail: (error)=>{
                reject(error)
            }
        });


    })
}


