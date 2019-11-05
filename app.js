//app.js
import http from "./utils/http.js"
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const data = {
          code: res.code
        }
        const url = '/api/v1/Wx/getUserKey'
        http(url, data, "POST").then(res => {
          // console.log(res)
        
        })

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
   
  },

  // 获取手机号
  // getPhoneNumber(n) {
  //   return new Promise((resolve, reject) => {
  //     var openid = wx.getStorageSync('openid');
  //     let a = ""
  //     let b = n.detail.encryptedData
  //     let c = n.detail.iv
  //     c = encodeURIComponent(c)
  //     a = encodeURIComponent(b);
  //     // console.log("openid:" + openid)
  //     // console.log('errmsg', e.detail.errMsg)
  //     // console.log('iv', e.detail.iv)
  //     // console.log('encry', e.detail.encryptedData)
  //     http({
  //       s: "Wxmini.dataDecode",
  //       openid: openid,
  //       encryptedData: a,
  //       iv: c
  //     }, "POST").then(res => {
  //       let number = res.data.data.phoneNumber;
  //       wx.setStorageSync('phone', number)
  //       http({
  //         s: "Wxmini.addPhoneNum",
  //         openid: openid,
  //         phone: number
  //       }, "POST").then(res => {
  //         wx.setStorageSync("isNotSame", false)
  //         resolve()
  //       })
  //     })
  //   })

  // },

  
  

  globalData: {
    userInfo: null,
    http: "http://192.168.31.9"
  }
})