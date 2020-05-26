// pages/teacher_index/teacher_index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classes:[]
  },


  //添加课程
  addclass:function(e){
    console.log("add classing")
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      snum:options.snum
    })
    console.log("this.data.snum",this.data.snum)
    const db = wx.cloud.database();
    db.collection('class').get({
      success(res){
        that.setData({
          classes:res.data
        });
        console.log("snum",that.data.snum)
        console.log("classlist",that.data.classes)
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