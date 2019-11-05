var app = getApp();
var amapFile = require('../../utils/amap-wx.js')
var markersData = [];
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */

  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    

  },

  getStadium: function() {
    const data = {

    }
    const url = ''
    http(url, data, "POST").then(res => {
      let that = this;
      if (res.statusCode === 200) {
       
      }

    })
  },

  // 验证是否登录过期
  rejister: function(e) {
    var that = this
    wx.checkSession({
      success: function(res) {
        console.log(res, '登录未过期')
      },
      fail: function(res) {
        console.log(res, '登录过期了')
        //再次调用wx.login()
        wx.login({
          success: function(res) {
            console.log(res.code)
            //发送请求
            http({
              s: "Wxmini.getUserKey",
              code: res.code
            }, "POST").then(res => {
              console.log(res)
              wx.setStorageSync('openid', res.data.data.userdata.openid)
              wx.setStorageSync('userId', res.data.data.userdata.id)
            })
          }
        })
      }
    })
  },

  // 获取手机号

  getPhoneNumber: function(e) {
    console.log(2222222)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    var detail = e.detail;
    const data = {
      "openid": openid,
      "encryptedData": detail.encryptedData,
      "iv": detail.iv
    }
    const url = '/api/v1/user/get_activity'
    http(url, data, "POST").then(res => {
      console.log(res)
      let that = this;
      if (res.statusCode === 200) {
        console.log(res.data.phoneNumber);
        wx.setStorageSync("phonenumber", res.data.phoneNumber);
      }

    })
  },
})