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
    num_check: false
  },

  //注册表单提交
  register: function (e) {
    let {
      register_name,
      register_num,
      register_psd,
      register_psd2
    } = e.detail.value;

    var that = this;

    // 建立脸集
    wx.request({
      url: 'https://api-cn.faceplusplus.com/facepp/v3/faceset/create', //请求接口
      method: 'POST',
      data: {
        'api_key': 'iQO_T2DQ4EqLMbgWbgl6JEL8cyYXYMRM',
        'api_secret': '-xKKRjPYFu5jaFSCM1oT9tMQ0bFGDLBX',
        'outer_id': register_num,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log('face set created') //打印
        console.log(res.data)
        that.setData({
          num_check : true
        })
      },
      fail: function (e) {
        console.log('creat set fail')
        that.setData({
          num_check : false
        })
      }
    })

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
    } else if (!that.data.num_check) {
      wx.showToast({
        title: '该学号已注册，请重新确认',
        icon: 'none'
      })
    } else {
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
          wx: wx.showToast({
            title: '注册成功, 跳转中...',
          }),

          console.log('register success!'),
          wx.navigateBack({
            delta: 1,
            complete: (res) => {
              console.log('back to login')
            },
          });
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