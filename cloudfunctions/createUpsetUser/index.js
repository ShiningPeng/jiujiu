// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'shiningpeng-p3idc'//指定作用于哪个服务器，环境

cloud.init()
//获取服务器的句柄(指针)

const db = cloud.database({ env }) //获取哪里服务器的指针

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = event.user;
  console.log('event:', event);
  let insertResult = {}
  //先查询有无用户的openId
  // const checkUser = await db.collection('upsetUser').where({
  //   openId: userInfo.openId
  // }).get()
  // // 如果有用户，则更新用户基本信息
  // if (checkUser.data.length > 0) {
  //   await db.collection('upsetUser').doc(checkUser.data[0]._id).update()({
  //     data: {
  //       avatarUrl: event.avatarUrl,
  //       nickName: event.nickName,
  //       sex: event.sex,
  //     }
  //   })
  // } else {
  const checkUser = await db.collection('upsetUser').where({
    openId: wxContext.OPENID
  }).get()
  //如果有用户，则更新用户基本信息
  if (checkUser.data.length == 0) {
   
      insertResult = await db.collection('upsetUser').add({
        data: {
          avatarUrl: user.avatarUrl,
          nickName: user.nickName,
          sex: user.gender,
          openId: wxContext.OPENID,
          createTime: event.createTime,
          country:user.country,
          language:user.language,
          province:user.province,
          city:user.province
        }
      })
      console.log('upsetUser.add调用了');
    }
    
  // }
return insertResult;
  
}