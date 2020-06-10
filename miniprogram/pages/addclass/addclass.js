// pages/addclass/addclass.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  addclassfunc:function(e){
    let{cname_add,ccredit_add}=e.detail.value;
    if(!cname_add || !ccredit_add ){
      wx.showToast({
        title: '请将信息填写完整',
        icon:'none'
      })
    }else{
      db.collection('class').add({
        data:{
          cname:cname_add,
          ccredit:ccredit_add,
          is_signing:false
        },
        success: res => {
          wx.showToast({
            title: '课程添加成功',
          })
        },
        fail: res => {
          console.log(err)
        }
      })
    }
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