// miniprogram/pages/persondetail/persondetail.js
import Toast from '../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: '',
      sex: '',
      openId: '',
      conorsch: '',
      place: '',
      age: ''
    },
    sexArray: ['男', '女'],
    sIndex: 0,
    ageArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
      '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'
    ],
    aIndex: 20,
    region: ['江西省', '南昌市', '青山湖区'],
    customItem: '全部',
    newNickNameModal: false,
    newConorschNameModal: false

  },

  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      place: e.detail.value
    })
  },

  bindSexPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sIndex: e.detail.value,
      sex: e.detail.value
    })
  },
  bindAgePickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      aIndex: e.detail.value,
      age: e.detail.value
    })
  },

  getAndBindUser() {
    let self = this;
    wx.cloud.callFunction({
      name: 'getUpsetUser',
      success: (res) => {
        self.setData({
          userInfo: res.result.storeUser.data[0]
        })
        console.log('personaldetail中调用了getUpsetUser');
        console.log('success res:',res)
        console.log('gsgfggf', self.data.userInfo);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAndBindUser();
  },

  showNickNameModal() {
    this.setData({
      newNickNameModal: true
    })
  },
  showConorschNameModal() {
    this.setData({
      newConorschNameModal: true
    })
  },
  onNickNameChange(event) {
    this.setData({
      'userInfo.nickName': event.detail
    })
  },
  onConorschNameChange(event) {
    this.setData({
      'userInfo.conorsch': event.detail
    })
  },
  colseNickNameDialog() {
    this.setData({
      newNickNameModal: false
    })
  },
  colseConorschNameDialog() {
    this.setData({
      newConorschNameModal: false
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
    // console.log('------',this.data.userInfo);
    let self = this;
    wx.cloud.callFunction({
      name: 'updateUserInfo',
      data: {
        user: self.data.userInfo
      },
      success: (res) => {
        console.log('成功调用updateUserInfo', res);
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