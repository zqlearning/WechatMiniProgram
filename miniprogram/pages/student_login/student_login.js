// pages/student_login/student_login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    snum:"",
    spsd:"",
  
  },
  
  formSubmit:function(e){
    let{snum,spsd}=e.detail.value;
    console.log("sssss",snum,spsd)
    const db = wx.cloud.database();
    var that = this;
    that.setData({
      snum:snum,
      spsd:spsd
    })
    console.log("this.data.snum",this.data.snum)

    db.collection('s_info').where({
        snum:this.data.snum
    }).get({
    // data 传入需要局部更新的数据
    // data: {
    //   // 表示将 done 字段置为 true
    //   done: true
    // },
      success(res) {
        console.log("res.data",res.data)
        // if (! res.data)
        console.log(spsd,res.data[0].spsd)
        if(res.data[0].spsd == spsd){
          console.log("login success",snum,spsd)
          wx:wx.navigateTo({
            url: '../student_index/student_index?snum='+snum,
          })
        }
      }
    })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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