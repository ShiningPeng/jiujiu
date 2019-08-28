// miniprogram/pages/myupset/myupset.js
const app = getApp();
// const db = wx.cloud.database();
// const upsetUser = db.collection('upsetUser')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [{
      avatarUrl: '',
      nickName: '',
    }],
    storeUpset: [],
    hasUpset: false,
    hasImg: false,
    skred:false,
    countArr:[]
    // upset_id:''
  },

  navigateToUpsetDetail(event) {
    // let a = index;
    let index = event.currentTarget.dataset.index
    console.log('event-----',event);
    // let a = this.data.storeUpset.findIndex()
    wx.navigateTo({
      url: '/pages/upsetdetail/upsetdetail?upset_id=' + this.data.storeUpset[index]._id + '&openId=' + this.data.storeUpset[index].openId  + '&title=' + this.data.storeUpset[index].upsetTitle
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    wx.setNavigationBarTitle({
      title: '我发布的全部纠结'
    })
    wx.cloud.callFunction({
      name: 'getUpsetUser',
      success: (res) => {
        console.log('myupset页面getUpsetUser函数调用结果',res);
        self.setData({
          'userInfo.avatarUrl': app.globalData.userInfo.avatarUrl,
          'userInfo.nickName': app.globalData.userInfo.nickName,
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var currentpage = getCurrentPages();
    console.log(currentpage);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let self = this;
    wx.cloud.callFunction({
      name: 'getUpset',
      success: (res) => {
        console.log('成功调用getUpset函数', res);
        const reverse = res.result.storeUpset.data.reverse();
        self.setData({
          storeUpset: reverse
        })
        console.log('self.data.storeUpset----', self.data.storeUpset);
        // console.log('zhihou:',reverse);
        // console.log('self.storeUpset::----',self.data.storeUpset)

        if (!self.data.storeUpset.length) {
          self.setData({
            hasUpset: false
          })
        }
        else {
          self.setData({
            hasUpset: true
          })
        }
        // if(self.data.storeUpset[0].imageUrl){
        //   self.setData({
        //     hasImg:true
        //   })
        //   console.log('hasImg',self.data.hasImg);
        // }
      },
      fail: (err) => {
        console.log(err);
      }
    })
    for (let i = 0; i < this.data.storeUpset.length; i++) {
      wx.cloud.callFunction({
        name: 'getSkr',
        data: {
          upset_id: this.data.storeUpset[i]._id
        },
        success: (res) => {
          // console.log('getskrRes:----',res);
          this.data.countArr.push(res.result.data.length);
          // console.log(arr);
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
          if (res.result.data.length !== 0){
            self.setData({
              skred: res.result.data[0].skred,
              color: '#ff4444'
            })
          }
        }
      })
    }
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