const db = wx.cloud.database();
var confidence = 0;
// pages/takephotos/takephotos.js
Page({

  /**
   * Page initial data
   */
  data: {
    image: null,
    snum: '',
    btn_name: '上传照片',
    face_token: ''
  },

  getphoto: function () {
    var that = this;

    wx: wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        var tempFilePaths = res.tempFilePaths;

        that.setData({
            image: tempFilePaths[0]
          }),

          //上传图片到接口，获取人脸唯一标识，face_token
          wx.uploadFile({
            url: "https://api-cn.faceplusplus.com/facepp/v3/detect",
            filePath: that.data.image, //图片地址
            name: 'image_file',
            header: {
              "Content-Type": "multipart/form-data"
            },
            formData: {
              'api_key': 'iQO_T2DQ4EqLMbgWbgl6JEL8cyYXYMRM',
              'api_secret': '-xKKRjPYFu5jaFSCM1oT9tMQ0bFGDLBX',
            },
            success: function (res) {
              console.log(res);
              var obj = JSON.parse(res.data); //转换成json格式不然解析不了
              if (obj['faces'][0] == null || obj['faces'][0] == '') {
                wx.showModal({
                  title: '提示',
                  content: '获取人脸标识失败',
                  showCancel: true
                })
                return;
              } else {
                that.setData({
                  face_token: obj['faces'][0]['face_token'], //获取得到的人脸标识
                });

                //把新注册的人脸与脸集进行对比获得confidence值 这个值大于80我们就认为人脸集中有人
                wx.request({
                  url: 'https://api-cn.faceplusplus.com/facepp/v3/search', //接口
                  method: 'POST',
                  data: {
                    'api_key': 'iQO_T2DQ4EqLMbgWbgl6JEL8cyYXYMRM',
                    'api_secret': '-xKKRjPYFu5jaFSCM1oT9tMQ0bFGDLBX',
                    'face_token': that.data.face_token, //传入face_token和脸集中的数据比对
                    'outer_id': that.data.snum, //唯一标识
                    'return_result_count': '1' //返回一条匹配数据
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                  },
                  success(res) {
                    console.log(res.data)
                    //var obj = JSON.parse(res.data);
                    confidence = res.data['results'][0]['confidence'] //对比得到的可信值;
                  },
                  fail: function (e) {
                    wx.showModal({
                      title: '提示',
                      content: '人脸检测失败',
                      showCancel: false
                    })
                  }
                })
                if (confidence < 80) { //可信值小于80我们就把他加到脸集中
                  //把face_token添加到脸集中
                  wx.request({
                    url: 'https://api-cn.faceplusplus.com/facepp/v3/faceset/addface', //添加到脸集的接口
                    method: 'POST',
                    data: {
                      'api_key': 'iQO_T2DQ4EqLMbgWbgl6JEL8cyYXYMRM',
                      'api_secret': '-xKKRjPYFu5jaFSCM1oT9tMQ0bFGDLBX',
                      'face_tokens': that.data.face_token,
                      'outer_id': that.data.snum,

                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded',
                    },
                    success(res) {
                      console.log(res.data)

                      wx.showModal({
                        title: '提示',
                        content: '人脸导入成功',
                        showCancel: false
                      })
                    },
                    fail: function (e) {
                      wx.showModal({
                        title: '提示',
                        content: '人脸导入失败',
                        showCancel: false
                      })
                    }
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '数据库已存在同一人脸信息',
                    showCancel: false
                  })
                  return;
                }
              }
              console.log('face_token:' + that.data.face_token);
              if (res.statusCode != 200) {
                wx.showModal({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                })
                return;
              }
            },
            fail: function (e) {
              console.log(e);
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
            }
          })

        const db = wx.cloud.database();
        try {
          db.collection('s_info').where({
              snum: that.data.snum
            })
            .update({
              data: {
                sphoto: that.data.image,
                sbphoto: true
              },
            })
        } catch (e) {
          console.error(e)
        }
      }
    })
    that.setData({
      btn_name: '重新上传'
    })
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      snum: options.snum
    })
    console.log("this.data.snum", that.data.snum)

    try {
      db.collection('s_info').where({
        snum: that.data.snum
      }).get({
        success(res) {
          if (res.data[0].sbphoto) {
            that.data.image = res.data[0].sphoto,
              that.data.btn_name = '重新上传'
          }
        }
      })
    } catch (e) {
      console.error(e)
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})