// pages/student_register/student_register.js
Page({

  /**
   * Page initial data
   */
  data: {
    register_name: "",
    register_num: "",
    register_psd: "",
    register_psd2: "",
  },

  //注册表单提交
  register: function (e) {
    let {
      register_name,
      register_num,
      register_psd,
      register_psd2
    } = e.detail.value;
    if (!register_name || !register_num || !register_psd || !register_psd2) {
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none'
      })
    } else if (register_psd != register_psd2) {
      wx.showToast({
        title: '两次密码不一致！请重新输入!',
        icon: 'none'
      })
    } else {
      // 没有做学号比较
      const db = wx.cloud.database()
      db.collection('s_info').add({
        data: {
          sname: register_name,
          snum: register_num,
          spsd: register_psd,
          sbphoto: false,
          sphoto: null
        },
        success: res => {
          console.log('register success!'),
          wx.navigateBack({
            delta: 1,
            complete: (res) => {
              console.log('back to login')
            },
          }),
          wx.showToast({
            title: '注册成功',
          });
          // ({
          //   url: '../student_index/student_index?snum=' + register_num,
          // })
        },
        fail: res => {
          console.log('register failed!')
        }
      })
    }
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