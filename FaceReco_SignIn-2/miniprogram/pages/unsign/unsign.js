// pages/unsign/unsign.js
const db = wx.cloud.database();
const sinfo = db.collection('s_info')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onShow: function (options) {
    sinfo.where({
      is_signing:false
    }).get().then(res=>{
      this.setData({
        sinfo:res.data
      })
      console.log(sinfo)
    })
  },

})