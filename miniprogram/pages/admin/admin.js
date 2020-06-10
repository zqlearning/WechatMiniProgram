// pages/admin/admin.js
const db = wx.cloud.database();
Page({
  data: {
    allclasslist:[],
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

  set:function(){
    wx.navigateTo({
      url: '../setcheck/setcheck',
    })
  },
  
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