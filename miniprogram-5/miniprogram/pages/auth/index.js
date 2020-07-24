// pages/auth/index.js
import {request} from '../../request/index'
import {login} from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  async handleGetUserInfo(e){
    try {
      let {encryptedData,rawData,iv,signature} = e.detail;
      let {code} = await login()
      let data = {code, encryptedData, rawData,iv,signature} 
      //因为不是企业用户，所以得不到token,所以给出一个空对象
      const {token={}} = await request({url:'/users/wxlogin',method:'POST',data}) || {};
      wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error)
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