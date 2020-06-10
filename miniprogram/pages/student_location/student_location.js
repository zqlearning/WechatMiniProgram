// pages/student_location/student_location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dis:'',
    latitude:'',
    longitude:'',
    t_lat:'', 
    t_lng:'',
    snum:'',
    cname:''
  },

  jump2FaceReco: function(e){
    var that = this
    var dis = that.getDistance(this.data.latitude, this.data.longitude, this.data.t_lat, this.data.t_lng)
    console.log('student_location:',this.data.latitude, this.data.longitude)
    console.log(that.data.cname,'teacher_location:',that.data.t_lat,that.data.t_lng)
    var inCircle = dis < 1000 ? true : false;
    if(inCircle){
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      wx:wx.navigateTo({
        url: '../student_FaceReco/student_FaceReco',
      })
      console.log(dis)
    }else{
      wx.showToast({
        title: '不处于规定范围内',
        icon: 'none',
        duration: 2000
      })
      console.log(dis)
    }
  },

  //计算两个位置间距离
  getDistance: function (lat1, lng1, lat2, lng2) {
        lat1 = lat1 || 0;
        lng1 = lng1 || 0;
        lat2 = lat2 || 0;
        lng2 = lng2 || 0;
        var rad1 = lat1 * Math.PI / 180.0;
        var rad2 = lat2 * Math.PI / 180.0;
        var a = rad1 - rad2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var r = 6378137;
    
        return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0);
      },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.cname = options.cname;
    //获取当前学生位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          latitude : res.latitude,
          longitude : res.longitude
        })
        console.log(res)
      },
      fail(err){
        console.log(err)
      }
    })

    const db = wx.cloud.database();

    db.collection('class').where({
      cname: that.data.cname
    }).get({
      success(res) {
        that.setData({
          t_lat: res.data[0].latitude,
          t_lng: res.data[0].longitude,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})