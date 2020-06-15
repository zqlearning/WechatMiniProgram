// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const TcbRouter = require('tcb-router')

const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const app = new TcbRouter({
    event
  })
  
  app.router('updatePos', async(ctx, next) => {
    let cname = event.cname
    let longitude = event.longitude
    let latitude = event.latitude
    let is_signing = event.is_signing
    let data = await db.collection('class').where({
      cname
    }).update({
      data: {
        is_signing,
        longitude,
        latitude
      }
    }).then((res) => {
      return res.data
    })
    ctx.body = data
  })
  app.router('updatePos-1', async(ctx, next) =>{
    let cname = event.cname
    let is_signed = event.is_signed
    
    let data = await db.collection('c_s').where({
      cname
    }).update({
      data:{
        is_signed
      }
    }).then((res) => {
      return res.data
    })
    ctx.body = data
  })

  return app.serve()
}