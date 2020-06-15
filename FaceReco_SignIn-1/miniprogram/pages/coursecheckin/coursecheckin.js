// pages/coursecheckin/coursecheckin.js
const db = wx.cloud.database();
const class1 = db.collection('class')
// const _ = db.command;
// var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    timer: '',//定时器名字
    countDownNum: '20',//倒计时初始值
    classname:'',
    jd:'',
    wd:'',
    is_signed:''
  },
  onShow: function(){
    //什么时候触发倒计时，就在什么地方调用这个函数
    this.countDown();
  },
  countDown: function (option) {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
      that.data.timer = setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //签到倒计时完成将class表对应课程的is_signing true->false
          wx.cloud.callFunction({
            name: 'update',
            data: {
              cname: that.data.classname,
              is_signing: false,
              $url: 'updatePos'
            }
          }).then((res) => {
            console.log(that.data.is_signing)
          })
           //签到倒计时完成同时将c_s表对应课程的is_signed false->true
           wx.cloud.callFunction({
            name: 'update',
            data: {
              cname: that.data.classname,
              is_signed: true,
              $url: 'updatePos-1'
            }
          }).then((res) => {
            console.log(that.data.is_signed)
          })

          // that.setData({
          //   classname:option.classname
          // }),
          // db.collection('class').where({
          //   cname: that.data.classname
          //   }).update({
          //     is_signing:false
          //   })
          wx.showToast({
            title: '签到时间结束',
          })
          clearInterval(that.data.timer);
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          // clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
        }else{
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })}
      }, 1000)
  },
  onReady: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          wd: latitude,
          jd: longitude
        })
        // app.globalData.wd =that.data.wd,
        // app.globalData.jd =that.data.jd
      }
    })
    // console.log(app.globalData.jd)
  },

  // checkin:function(option){
    // var that = this;
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     // console.log(res)
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     // app.globalData.wd =that.data.wd,
    //     // app.globalData.jd =that.data.jd
    //   }
    // }),
    // that.setData({
    //   classname:option.classname
    // }),
    // db.collection('class').where({
    //   cname: that.data.classname
    //   }).update({
    //   data: {
    //     latitude:latitude,
    //     longitude:longitude
    //   },
    //   success: console.log(latitude,longitude),
    //   fail: console.error
    //   
    onLoad: function (options) {
      var that = this;
      // var studentnames = [];
      // var studentnums = [];
      that.setData({
        classname:options.classname
      })
      console.log(that.data.classname)
    },

    // checkin:function(){
    //   var that = this;
    //   class1.where({
    //     cname: that.data.classname
    //    }).add({
    //     data:{
    //       latitude: wd,
    //       longitude: jd
    //     }
    //    }).then(res=>{
    //     console.log(jd,wd)
    //    })
    // }

    checkin:function(){
      let that = this
      //发布签到时将c_s表对应课程的is_signed true->false
      wx.cloud.callFunction({
        name: 'update',
        data: {
          cname: that.data.classname,
          is_signed: false,
          $url: 'updatePos-1'
        }
      }).then((res) => {
        console.log(that.data.is_signed)
      })
    }
})