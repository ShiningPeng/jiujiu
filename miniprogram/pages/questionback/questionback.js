// miniprogram/pages/suggestfeedback/suggestfeedback.js
import Toast from '../dist/toast/toast';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queContent: '',
    userId: ''
  },
  getQuestionContent(e) {
    // console.log('getQuestionContent:',e);

    this.setData({
      queContent: e.detail.value
    })
    console.log('queContent', this.data.queContent);
  },
  submit(e) {
    let self = this;
    console.log('*----', e);
    if (self.data.queContent) {
      let createtime = app.createTimeF();
      wx.cloud.callFunction({
        name: 'createQuestion',
        data: {
          queContent: self.data.queContent,
          userId: app.globalData.userOpenId,
          createTime:createtime
        },
        success: (res) => {
          console.log('成功调用createQuestion函数');
          Toast.success('提交成功');
        }
      })
      setTimeout(()=>{
        wx.switchTab({
          url: '/pages/personal/personal',
        })
      },2000)
    } else {
      wx.showModal({
        title: '提示',
        content: '您还没有描述您遇到的问题，请填写',
        showCancel: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userId:app.globalData.userOpenId
    })
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