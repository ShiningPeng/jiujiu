// miniprogram/pages/upsetdetail/upsetdetail.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [{
      avatarUrl: '',
      nickName: '',
    }],
    oneUpset: {},
    title:'',
    color:'',
    upset_id:'',
    count:'',
    skred:false,
    amount:'',
    write:false,
    curComment:'',
    commentList:[]
  },

  clickZan(){
    if(!this.data.skred){
      this.setData({
        count: this.data.count + 1,
        skred: true,
        color: '#ff4444'
      })
      let createtime = app.createTimeF();
      wx.cloud.callFunction({
        name: 'createSkr',
        data: {
          upset_id: this.data.upset_id,
          openId: app.globalData.userOpenId,
          createTime: createtime,
          skred: true
        },
        success: (res) => {
          console.log('成功调用createSkr函数');
        }
      })
    }
    
  },

  // navigateToPersonalDetail(){
  //   //还没写完的东西，记得写
  // },

  // startInput(){
  //   this.setData({
  //     write:true
  //   })
  // },

  // setComment(e){
  //   console.log(e);
  //   this.setData({
  //     curComment:e.detail.value
  //   })
  //   let createtime = app.createTimeF();
  //   wx.cloud.callFunction({
  //     name:'createComment',
  //     data:{
  //       content:this.data.curComment,
  //       upset_id:this.data.upset_id,
  //       createTime:createtime,
  //       avaUrl:app.globalData.userInfo.avatarUrl,
  //       niName:app.globalData.userInfo.nickName
  //     },
  //     success:(res)=>{
  //       console.log(res);
  //       this.data.commentList.push(res.result.data);
  //       this.setData({
  //         curComment:''
  //       })
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('options:-----', options)
    this.setData({
      title:options.title,
      upset_id:options.upset_id
    })
    wx.setNavigationBarTitle({
      title: this.data.title
    })
    wx.cloud.callFunction({
      name: 'getOneUpset',
      data: {
        upset_id: options.upset_id,
        openId: options.openId
      },
      success: (res) => {
        console.log(res);
        // 将结果赋值给this.data中的数据
        this.setData({
          oneUpset: res.result.storeUpset.data[0]
        })
      }
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
  onShow: function(e) {
    // console.log('onshow:e----',e);
    let self = this;
    self.setData({
      'userInfo.avatarUrl': app.globalData.userInfo.avatarUrl,
      'userInfo.nickName': app.globalData.userInfo.nickName,
    })
    wx.cloud.callFunction({
      name:'getSkr',
      data:{
        upset_id:this.data.upset_id,
        // openId:app.globalData.userOpenId
      },
      success:(res)=>{
        console.log('成功调用getSkr，Res为:',res);
        self.setData({
          count:res.result.data.length,
          // skred:res.result.data[0].skred
        })
        if(this.data.count != 0){
          wx.cloud.callFunction({
            name: 'skred',
            data: {
              upset_id: this.data.upset_id,
              openId: app.globalData.userOpenId
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