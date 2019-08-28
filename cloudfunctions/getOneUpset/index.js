// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'shiningpeng-p3idc'//指定作用于哪个服务器，环境

cloud.init()
//获取服务器的句柄(指针)

const db = cloud.database({ env }) //获取哪里服务器的指针

// 云函数入口函数
exports.main = async (event, context) => {
// 这个云函数的作用是获取一条纠结，任何用户的，
// 根据纠结的_id和用户的openId来匹配

  const receive = event;
  const storeUpset = await db.collection('upset').where({
    openId: receive.openId,
    _id:receive.upset_id
  }).get()

  return {
    storeUpset
  }
}