// pages/singsuccess/signsuccess.js

// const cloud = require('wx-server-sdk')
// cloud.init({
//   env: cloud.DYNAMIC_CURRENT_ENV
// })
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classname:'',
    jd:'',
    wd:''
  },
    //监听页面显示
    onShow: function () {
        //自动跳转到login
        setTimeout(function(){
      //页面跳转相当于	
          wx.navigateTo({
            url: '../admin/admin',
          })
        },3000);
      },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var studentnames = [];
    // var studentnums = [];
    that.setData({
      classname:options.classname,
      jd:options.jd,
      wd:options.wd
    })
    console.log(that.data.wd)
    console.log(that.data.jd)
    console.log(that.data.classname)
    // db.collection('class').where({
    //   cname:that.data.classname
    // })
    // .update({
    //   data: {
    //     longitude:that.data.jd,
    //     latitude:that.data.wd,
    //     // location: new db.Geo.Point(that.data.jd, that.data.wd),
    //   },
    // })
    
    //发布签到时将c_s表对应课程的is_signing false->true
    wx.cloud.callFunction({
      name: 'update',
      data: {
        cname: that.data.classname,
        is_signing: true,
        longitude: that.data.jd,
        latitude: that.data.wd,
        $url: 'updatePos'
      }
    }).then((res) => {
      console.log("call finish2")
    })
  
    
 	/**
     * 更新集合counters中的数据
     */

    // db.collection('class').where({
    //       cname: that.data.classname
    //     })
    //     .update({
    //       data: {
    //         is_signing:true
    //       },
    //     })
    // db.collection('class').where({
    //   cname: that.data.classname
    //  }).add({
  	// 	data:{
    //     is_signing:true
    // 	}
   	// }).then(res=>{
    // 	console.log(res.is_signing)
   	// })
  } 
  
})