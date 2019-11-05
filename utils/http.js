import md5 from './md5.js';
const baseUrl = "http://192.168.31.9"  //https://testapi.baodi520.com http://192.168.31.164  tzl:http://192.168.31.26 lc:http://192.168.31.9" tgapi_staging.baodi520.com
const key = "qifengverygood2019"
export default function (url,data, method) {
  return new Promise((resolve, reject) => {
    let f = data
    f.version="1.0.0"
    let a = Object.keys(f).sort()
    let b = ""
    let c = f
    let e = ""
    let d = []
    for (let i in a) {
      b = b + data[a[i]]
    }
    // b = b + key
    let md5s = md5(b)
    
    wx.request({
      url: baseUrl+url+'?sign='+md5s,
      method: method,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res);
      },
      complete: function () {
      }
    })
  })
}
