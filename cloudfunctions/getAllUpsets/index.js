// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'shiningpeng-p3idc'//指定作用于哪个服务器，环境

cloud.init()
//获取服务器的句柄(指针)

const db = cloud.database({ env }) //获取哪里服务器的指针

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const storeUpset = await db.collection('upset').get();
  return  storeUpset;

}