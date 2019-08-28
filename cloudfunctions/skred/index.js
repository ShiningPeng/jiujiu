// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'shiningpeng-p3idc'//指定作用于哪个服务器，环境

cloud.init()
//获取服务器的句柄(指针)

const db = cloud.database({ env }) //获取哪里服务器的指针
// 云函数入口函数
exports.main = async (event, context) => {
  // const upset = event.upset;
  // const wxContext = cloud.getWXContext()
  let storeSkr = await db.collection('skr').where({
    openId: event.openId,
    upset_id: event.upset_id
  }).get()
  // console.log('调用了upset.add添加数据');
  return storeSkr;
}