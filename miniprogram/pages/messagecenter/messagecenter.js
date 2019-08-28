// miniprogram/pages/messagecenter/messagecenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    users: [
      {
        nickName: '张三',
        id: '123456',
        count: 9,
        comment:'我遇到了我老同学',
        createTime:'2月15日 14:13'
      },
      {
        nickName: '李四',
        id: '123486',
        count: 48,
        comment:'我遇到了我的老师',
        createTime:'2月24日 21:29'
      },
      {
        nickName: '王五',
        id: '487562',
        count: 27,
        comment:'我遇到了我的未来',
        createTime:'2月28日 10:36'
      }
    ]
  },
  navigateToConDetail(e) {
    wx.navigateTo({
      url: '../conversationdetail/conversationdetail?id=' + e.detail.id
    })
  },
  navigateToComDetail(e) {
    wx.navigateTo({
      url: '../commentdetail/commentdetail?id=' + e.detail.id
    })
  },
  navigateToNotiDetail(e) {
    wx.navigateTo({
      url: '../noticedetail/noticedetail?id=' + e.detail.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'消息中心'
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