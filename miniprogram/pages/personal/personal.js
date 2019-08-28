// miniprogram/pages/personal/personal.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  backto() {
    wx.navigateBack({
      delta: 1
    })
  },
  
  navigateToPersonalDetail(){
    let self = this;
    wx.navigateTo({
      url: '/pages/persondetail/persondetail?openId=' + self.data.userInfo.openId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    // this.setData({
    //   userInfo: app.globalData.userInfo
    // })
  },
  checkUser(){
    let self = this;
    wx.cloud.callFunction({
      name: 'getUpsetUser',
      success: (res) => {
        console.log('getUpsetUserRes:', res);
        // console.log('app.globalData.userInfo', app.globalData.userInfo);
        if (res.result.storeUser.data.length == 0) {
          // self.getUserInfo();
          // console.log('self.getUpsetUser');
          let createtime = app.createTimeF();
          wx.cloud.callFunction({
            name: 'createUpsetUser',
            data: {
              user: self.data.userInfo,
              createTime:createtime
            },
            success: (res) => {
              console.log('成功调用createUpsetUser', res);
              // self.setData({
              //   userInfo: app.globalData.userInfo
              // })
            }
          })
        }else{
          console.log('走了else');
          // self.setData({
          //   userInfo: res.result.storeUser.data[0]
          // })
        }
      }
    }
    )
  },
  getUserInfo: function (e) {
    console.log('getUserInfo', e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.checkUser();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})