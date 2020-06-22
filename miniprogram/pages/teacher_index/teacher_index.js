const db = wx.cloud.database();
// pages/student_index/student_index.js
Page({

  /**
   * Page initial data
   */

  data: {
    sname: '',
    snum: '',
    sbphoto: false,
    classlist: [],
    needsign_c: '',
    d1: 'flex',
    d2: 'none',
    b_color: 'black'
  },


  uploadimage: function () {
    wx: wx.navigateTo({
      url: '../takephotos/takephotos?snum=' + this.data.snum,
      success: res => {
        console.log('Access a camera')
      }
    })
  },



  //跳转到学生定位页面
  jump2location: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '需要获取人脸及位置信息',
      success: function (res) {
        if (res.confirm) {
          wx: wx.navigateTo({
            url: '../student_location/student_location?snum=' + that.data.snum + '&cname=' + that.data.needsign_c,
          })
          console.log('弹框后点确定')
        }
        else {
          console.log('弹框后点取消')
        }
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // 同步学生信息
    var that = this
    that.setData({
      snum: options.snum
    })
    console.log("this.data.snum", that.data.snum)

    db.collection('s_info').where({
      snum: that.data.snum
    }).get({
      success(res) {
        that.setData({
          sname: res.data[0].sname,
          sbphoto: res.data[0].sbphoto
        })
      }
    })

    db.collection('c_s').where({
      is_signed: false,
      snum: that.data.snum
    }).get({
      success(res) {
        if (res.data[0].cname != '') {
          that.setData({
            needsign_c: res.data[0].cname,
            d1: 'flex',
            d2: 'none',
          })
          console.log("find")
        }
      },
    })
    if (that.data.needsign_c == '') {
      that.setData({
        d1: 'none',
        d2: 'flex',
      })
      console.log('not find')
    }

    setInterval(function () {
      //循环执行代码 
      if (that.data.b_color == 'black') {
        that.setData({
          b_color: 'red'
        })
      } else {
        that.setData({
          b_color: 'black'
        })
      }
    }, 1000) //循环时间 这里是1秒
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    console.log('onShow')
    var that = this

    db.collection('s_info').where({
      snum: this.data.snum
    }).get({
      success(res) {
        that.setData({
          sbphoto: res.data[0].sbphoto
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})