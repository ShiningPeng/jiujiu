// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'shiningpeng-p3idc'//指定作用于哪个服务器，环境

cloud.init()
//获取服务器的句柄(指针)

const db = cloud.database({ env }) //获取哪里服务器的指针
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let insertResult = {};

  insertResult = await db.collection('comment').add({
    data: {
      upset_id: event.upset_id,
      openId: wxContext.OPENID,
      createTime: event.createTime,
      avaUrl:event.avaUrl,
      niName:event.niName,
      content:event.content
    }
  })
  console.log('调用了comment.add添加数据');
  return insertResult;
}