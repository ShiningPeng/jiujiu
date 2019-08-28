// miniprogram/pages/mycomments/mycomments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mycomments:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'我发表的评论'
    })
  },
  navigateToUpsetDetail(){
    let self = this;
    let curComment = self.data
wx.navigateTo({
  // url: '/pages/upsetdetail/upsetdetail?author=' + curComment.mycomments.index.author,
})
console.log(self);
    console.log(curComment.mycomments[item.index].author);
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