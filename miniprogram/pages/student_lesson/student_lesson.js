// pages/student_lesson/student_lesson.js
Page({

  /**
   * Page initial data
   */
  data: {
    snum: '',
    classlist: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("options.snum",options.snum)
    var that = this
    this.setData({
      snum: options.snum
    })
    console.log("this.data.snum", that.data.snum)
    const db = wx.cloud.database();
    db.collection('c_s').where({
        snum: this.data.snum
      }).get({
        success(res) {
          that.setData({
            classlist: res.data
          });
          console.log("snum", that.data.snum)
          console.log("classlist", that.data.classlist)
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