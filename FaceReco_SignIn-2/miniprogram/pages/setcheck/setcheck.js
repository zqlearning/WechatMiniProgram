// pages/setcheck/setcheck.js
Page({
  data:{  
    hiddenmodalput:true,  
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
},  
modalinput:function(){  
    this.setData({  
       hiddenmodalput: !this.data.hiddenmodalput  
    })  
},  
//取消按钮  
cancel: function(){  
    this.setData({  
        hiddenmodalput: true  
    });  
},  
//确认  
confirm: function(){  
    this.setData({  
        hiddenmodalput: true  
    })  
},
  modalcnt:function(){
    wx.showModal({
      title:'提示',
      content: '还没有创建课程，是否创建？',
      success (res) {
        if (res.confirm) {
        console.log('用户点击确定')
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
        }
    })
  },
  showok:function() {  
    wx.showToast({  
        title: '定位信息获取中',  
        icon: 'success',  
        duration: 5000 
    })  
},
  return:function(){
    wx.navigateTo({
      url: '../admin/admin',
    })
  }
})