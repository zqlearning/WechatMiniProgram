// pages/student_login/student_login.js
Page({

  /**
   * Page initial data
   */
  data: {
    snum: "",
    spsd: "",

  },

  //登录表单提交
  formSubmit: function (e) {
    let {
      snum,
      spsd
    } = e.detail.value;
    console.log("sssss", snum, spsd)
    const db = wx.cloud.database();
    var that = this;
    that.setData({
      snum: snum,
      spsd: spsd
    })
    console.log("this.data.snum", that.data.snum)

    db.collection('s_info').where({
      snum: that.data.snum
    }).get({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        // done: true
      },
      success(res) {
        console.log("res.data", res.data)
        if (!res.data) {
          console.log('spsd:', res.data[0].spsd)
        }
        if (res.data[0].spsd == spsd) {
          console.log("login success", snum, spsd)
          wx: wx.navigateTo({
              url: '../student_index/student_index?snum=' + snum,
            }),
            wx.showToast({
              title: '登入成功'
            })
        }
        else {
          console.log('password error!'),
            wx.showToast({
              title: 'x_x 密码错误',
              icon: 'none'
            })
        }
      },
    })
  },

  jump2student_register: function () {
    wx: wx.navigateTo({
      url: '../student_register/student_register',
      success: function (res) {
        console.log("jump to register!")
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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