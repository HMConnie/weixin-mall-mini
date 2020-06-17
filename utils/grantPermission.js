/**
 * 获取设置信息
 */
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (error) => {
                reject(error);
            }
        });
    })
}
/**
 * 引导用户授予
 */
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (error) => {
                reject(error);
            }
        });
    })
}
/**
 * 获取收货地址
 */
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result);
            },
            fail: (error) => {
                reject(error);
            }
        });
    })
}


/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            withCredentials:true,
            success: (result) => {
                resolve(result);
            },
            fail: (error) => {
                reject(error);
            }
        });
    })
}


/**
 * 检查登录是否失效
 */
export const checkSession = () => {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success () {            
              //session_key 未过期，并且在本生命周期一直有效
              resolve();
            },
            fail (error) {
              // session_key 已经失效，需要重新执行登录流程
              console.log(error);
              
              wx.login(); //重新登录
            }
          })
    })
}
