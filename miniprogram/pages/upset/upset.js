// miniprogram/pages/upset/upset.js
const db = wx.cloud.database();
// 找到photos表
const photos = db.collection('photos');
import Toast from '../dist/toast/toast';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upset: {
      upsetContent: '',
      upsetTitle: '',
      imageUrl:''
    },
    hasImg:false,
    userOpenId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '释放纠结'
    })
    this.setData({
      userOpenId: app.globalData.userOpenId
    })
    // console.log(this.data.userInfo,'-----userInfo---');
  },
  //获得事件标题
  getUpsetTitle(e) {
    this.setData({
      'upset.upsetTitle': e.detail.value
    })
  },
  //获得事件内容
  getUpsetContent(e) {
    this.setData({
      'upset.upsetContent': e.detail.value
    })
  },

  //发表烦心事
  uploadUpset() {
    let self = this;
    if (!self.data.upset.upsetTitle || !self.data.upset.upsetContent) {
      wx.showModal({
        title: '提示',
        content: '您还没有填写完整哦亲',
        showCancel: false
      })
    } else {
      // console.log('判断是否有图片',self.data.hasImg)
      // console.log(self.data.upset);
      // wx.cloud.callFunction({
      //   name:'getUpsetUser',
      //   success:(res)=>{
      //     console.log('getUpsetUserRes-----',res);
      //   self.setData({
      //     userOpenId:res.result.storeUser.data[0].openId
      //   })
      //     console.log('userOpenId',self.data.userOpenId);
      //   }
      // })
      let createtime = app.createTimeF();
      wx.cloud.callFunction({
        name: 'createUpset',
        data: {
          upset: self.data.upset,
          // open: self.data.userOpenId.openId,
          hasImg:self.data.hasImg,
          avaUrl:app.globalData.userInfo.avatarUrl,
          niName:app.globalData.userInfo.nickName,
          createTime:createtime
        },
        success: (res) => {
          self.setData({
            'upset.upsetTitle': '',
            'upset.upsetContent': '',
            'upset.imageUrl':''
          })
          console.log('成功调用createUpset云函数');
        }
      })
      Toast.success('发表成功');
      setTimeout(() => {
        //小程序跳转tabBar页面
        wx.switchTab({
          url: '../myupset/myupset',
        })
      }, 1500)

    }

  },

  uploadImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          let randString = Math.floor(Math.random() * 1000000).toString() + '.png';
          wx.cloud.uploadFile({
            cloudPath: randString,
            filePath: tempFilePaths[i],
            success: res => {
            //  this.data.upset.imageUrl.push(res.fileID);
            //  console.log(this.data.upset.imageUrl);
            console.log('uploadFileRes--',res)
              // console.log('fileID:', { fileID:res.fileID,cloudPath:res.cloudPath});
              wx.cloud.downloadFile({
                fileID: res.fileID,
                success:(res1)=>{
                  console.log(res1);
                  console.log('downloadFile---res.tempFilePath', res1.tempFilePath);
                  this.setData({
                    'upset.imageUrl':res.fileID,
                    hasImg:true
                  })
                }
              })
              // photos.add({
              //   data: {
              //     image: res.fileID
              //   }
              // }).then(res => {
              //   wx.showToast({
              //     title: '上传成功',
              //     icon: 'success'
              //   })
              // })
            }
          })
        }
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})