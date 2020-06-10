// pages/classaddstudent/classaddstudent.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classname:'',

  },

  classaddstudentfunc:function(e){
    var that=this;
    let{sname_add,snum_add}=e.detail.value;
    if(!sname_add || !snum_add ){
      wx.showToast({
        title: '请将信息填写完整',
        icon:'none'
      })
    }else{
      db.collection('s_info').where({
        sname:sname_add,
        snum:snum_add
      }).get({
        success: res => {
          if(res.data.length===0){
            wx.showToast({
              title: '没有该学生！',
              icon:'none'
            })
          }else{
            db.collection('c_s').add({
            data:{
              cname:that.data.classname,
              sname:sname_add,
              snum:snum_add,
            is_signed:false,
           },
        success: res => {
          wx.showToast({
            title: '添加学生成功',
          })
        },
        fail: res => {
          console.log(err)
        }
      })
          }
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
    var that = this;
    that.setData({
      classname:options.classname
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