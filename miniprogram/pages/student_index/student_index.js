// pages/student_index/student_index.js
Page({

  /**
   * Page initial data
   */

  data: {
    sname: '',
    snum: '',
    classlist: [],
    needsign_c: '',
    d1:'flex',
    d2:'none',
    b_color:'black'
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

   //跳转到学生信息页面
   jump2myinfo:function(e){
    wx:wx.navigateTo({
      url: '../student_info/student_info?snum='+this.data.snum,
    })
  },

  //跳转到学生定位页面
  jump2location:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '需要获取人脸及位置信息',
      success:function(res){
            if(res.confirm){
              wx:wx.navigateTo({
                url: '../student_location/student_location?snum='+that.data.snum+'&cname='+that.data.needsign_c,
              })
              console.log('弹框后点确定')
            }else{
                console.log('弹框后点取消')
            }
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
    
    db.collection('c_s').where({
      is_signed: false,
      snum: that.data.snum
    }).get({
      success(res){
        if(res.data[0].cname!=''){
          that.setData({
            needsign_c: res.data[0].cname,
            d1: 'flex',
            d2: 'none',
          })
          console.log("find")
        }
      },
    })
    if(that.data.needsign_c==''){
      that.setData({
        d1: 'none',
        d2: 'flex',
      })
      console.log('not find')
    }

    setInterval(function () { 
      //循环执行代码 
      if(that.data.b_color=='black'){
        that.setData({
          b_color : 'red'
        })
      }else{
        that.setData({
          b_color : 'black'
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