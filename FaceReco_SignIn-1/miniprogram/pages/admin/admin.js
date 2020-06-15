// pages/admin/admin.js
const db = wx.cloud.database();
const sinfo = db.collection('s_info')
Page({
  data: {
    allclasslist:[],
    // stdlist:[],
    sinfo:''
  },  
  onLoad: function (options) {
    db.collection('class').get({
      success: (res) => {
        let that = this;
        that.setData({
          allclasslist:res.data
        })
        // console.log(this.data.allclasslist)
      }
    })
  },
  onShow: function (options) {
    db.collection('s_info').where({
      is_signing:true
    }).get().then(res=>{
      this.setData({
        sinfo:res.data
      })
      console.log(sinfo)
    })
  },
  unsign:function(){
    wx.navigateTo({
      url: '../unsign/unsign',
    })
  },

  set:function(){
    wx.navigateTo({
      url: '../setcheck/setcheck',
    })
  },

  // simple:function(){
  //   std.get().then(res=>{
  //     this.setData({
  //       std:res.data
  //     })
  //   })
  // },
  btn:function(){
    wx.navigateTo({
      url: '../admin/admin',
    })
  },

  classmang:function(){
    wx.navigateTo({
      url: '../classmang/classmang',
    })
  },
  
})