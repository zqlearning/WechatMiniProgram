// pages/student_index/student_index.js
Page({

  /**
   * Page initial data
   */

  data: {
    sname: '',
    snum: '',
    classlist: []
  },

  mine: function () {
    var that = this;
    wx:wx.navigateTo({
      url: '../student_lesson/student_lesson?snum='+that.data.snum,
      success: res => {
        console.log('go to lesson list')
      }
    })
  },

  // uploadimage: function () {
  //   wx:wx.navigateTo({
  //     url: '../camera/camera',
  //     success: res => {
  //       console.log('Access a camera')
  //     }
  //   })
  // },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      snum: options.snum
    })
    console.log("this.data.snum", this.data.snum)
    const db = wx.cloud.database();

    db.collection('s_info').where({
      snum: that.data.snum
    }).get({
      success(res) {
        that.setData({
          sname: res.data[0].sname
        })
      }
    })

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