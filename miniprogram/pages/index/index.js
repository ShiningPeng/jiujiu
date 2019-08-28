//index.js
// const db = wx.cloud.database();
// // 找到upsetUser表
// const upsetUser = db.collection('upsetUser');
const app = getApp()

Page({

      data: {
        imgUrls: [
          '/images/1.jpg',
          '/images/2.jpg',
          '/images/3.jpg'
        ],
        skred: false,
        color: '',
        storeUpset: [],
        //  aUpsetUser :[],
        hasAllUpset: false,
        curIndex: '',
        count: ''
      },

      onLoad: function() {
        let self = this;
        // self.setData({
        //   'userInfo.avatarUrl': app.globalData.userInfo.avatarUrl,
        //   'userInfo.nickName': app.globalData.userInfo.nickName,
        // })

      },

      navigateToUpsetDetail(event) {
        let index = event.currentTarget.dataset.index
        // this.setData({
        //   curIndex: event.currentTarget.dataset.index
        // })
        wx.navigateTo({
          url: '/pages/upsetdetail/upsetdetail?upset_id=' + this.data.storeUpset[index]._id + '&openId=' + this.data.storeUpset[index].openId + '&title=' + this.data.storeUpset[index].upsetTitle
        })

      },

      // getUserInfo: function(e) {
      //   if (!this.logged && e.detail.userInfo) {
      //     this.setData({
      //       logged: true,
      //       avatarUrl: e.detail.userInfo.avatarUrl,
      //       userInfo: e.detail.userInfo
      //     })
      //   }
      // },

      onShow: function() {
        let self = this;
        wx.cloud.callFunction({
          name: 'getAllUpsets',
          success: (res) => {
            console.log('成功调用getAllUpsets函数', res);
            const upset = res.result.data.reverse();
            self.setData({
              storeUpset: upset
            })
            // console.log(reverse);
            // for (let i = 0; i < res.result.data.length;i++){
            // var a =  upsetUser
            // .where({
            //    openId: res.result.data[0].openId
            // })
            // .get(
            //   {
            //   success:function(res){
            //     console.log('upsetuserRes---',res);
            //   }
            // }
            // )
            // .then(res =>{
            //   console.log('.getRes.data:',res.data);
            // })

            // self.data.storeUpset.push({ avatarUrl:aUser.avatarUrl,nickName:aUser.nickName,
            // upsetContent:reverse[i].upsetContent,upsetTitle:reverse[i].upsetTitle,createTime:reverse[i].createTime })
            // console.log('self.data.storeUpset---',self.data.storeUpset)
            // }
            // for(let i = 0;i < reverse.length;i++){
            // wx.cloud.callFunction({
            //   name:'getAllUpsetUser',
            //   success:(res2)=>{
            //     console.log('调用了getAllUpsetUser函数',res2);
            //     const user = res2.result.storeUser.data;
            //     for(let j = 0; j< user.length;j++){
            // 这些循环需要修改，
            // if (reverse[i].openId === user[j].openId) {
            //   self.data.aUpsetUser.push({ avatar: user[j].avatarUrl, nickName: user[j].nickName, upsetContent: reverse[i].upsetContent, upsetTitle: reverse[i].upsetTitle, createTime: reverse[i].createTime,hasImg:reverse[i].hasImg,imageUrl:reverse[i].imageUrl})
            // }
            //     }
            //   }
            // })
            // }
            // console.log('aUpsetUser:----',self.data.aUpsetUser);
            // console.log(a)
            if (!self.data.storeUpset.length) {
              self.setData({
                hasAllUpset: false
              })
            } else {
              self.setData({
                hasAllUpset: true
              })
            }
            // console.log(self.data.userInfo);
          },
          fail(err) {
            console.log(err)
          }
        })
        for (let i = 0; i < this.data.storeUpset.length; i++) {
          wx.cloud.callFunction({
            name: 'getSkr',
            data: {
              upset_id: this.data.storeUpset[i]._id
            },
            success: (res) => {
              self.setData({
                count: res.result.data.length
              })
            }
          })
          wx.cloud.callFunction({
              name: 'skred',
              data: {
                openId: app.globalData.userOpenId,
                upset_id: this.data.storeUpset[i]._id
              },
              success: (res) => {
                if (res.result.data.length !== 0) {
                  self.setData({
                    skred: res.result.data[0].skred,
                    color: '#ff4444'
                  })
                }
              }
            })
          }
        }
      })