// pages/register/register.js
//这个register是老师的
// pages/register/register.js

let app = getApp();
const db = wx.cloud.database();
const admin = db.collection('user');
let userName = null;
let password = null;
let passwordAgain = null;


Page({

  data: {

  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  login: function () {
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },
  inputUserName: function (event) {
    userName = event.detail.value;
  },
  inputPassword: function (event) {
    password = event.detail.value;
  },
  inputPasswordAgain: function (event) {
    passwordAgain = event.detail.value;
  },
  register: function () {
    console.log(password+" "+passwordAgain);
    if (password != passwordAgain) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
        duration: 1500,
      })
    }

    else {
      let that = this;
      admin.get({
        success: function (res) {
          let user = res.data;
          for (var i = 0; i < user.length; i++) {
            if (user[i].account == userName) {
              wx.showToast({
                title: '账号已存在',
                icon: 'none'
              })
              break;
            }

          }
          if (i == user.length) {
            admin.add({
              data: {
                account: userName,
                password: password,
              },
              success: function (res) {

                console.log('注册成功！')
                wx.showToast({
                  title: '注册成功',
                  icon: 'success',
                  duration: 2500,
                }),
                wx.navigateTo({
                  //目的页面地址
                  url: '../register_sucess/register_sucess',
              })
              // wx.switchTab({
              //   url: '..//register_sucess/register_sucess.wxml',//这里是注册登录后跳转的页面
              // })
              }
            })
          }
        }
      })
    }

  }
})