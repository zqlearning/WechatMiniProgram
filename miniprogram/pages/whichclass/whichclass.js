// pages/whichclass/whichclass.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classname:'',
    studentlist:[],
    // studentlist_name:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var studentnames = [];
    // var studentnums = [];
    that.setData({
      classname:options.classname
    })
  
    db.collection('c_s').where({
      cname:that.data.classname
    }).field({
      snum:String
    }).get({
      success(res){
        that.setData({
          studentlist:res.data
        });
        console.log(that.studentlist[0].snum)
        // for(s in res.data){
        //   studentnums.push(s.snum)
        // }
        // console.log(studentnums)

        //读取所有学生名单，再比较
        //根据学号查找姓名
        // db.collection('s_info').get({
        //   success(res){
        //     // that.setData({
        //     //   studentallnames:res.data
        //     // })
        //     console.log(res.data)
        //     for(x in res.data){
        //       if (x.snum in studentnums){
        //         studentnames.push(x.sname)
        //       }
        //     }
        //     that.setData({
        //       studentlist_name:studentnames
        //     })
        //   }
        // })
      }
    })
    
    
    
    // for(var i=0;i<this.data.studentlist_name.length;i++){
    //   if(this.data.studentlist_all[i].snum in this.data.studentlist.snum){
    //       // var that =this;
    //       // that.setData({
            
    //       // })
    //       this.data.studetnlist_name.push(this.data.studentlist_all[i])
    //   }
    // }
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