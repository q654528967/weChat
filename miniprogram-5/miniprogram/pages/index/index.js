import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_list:[],
    cate_list:[],
    floor_list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  getSwiperList(){
    request({
      url: '/home/swiperdata',
    }).then(result=>{
      this.setData(
        {
          swiper_list:result
        }
      )
    })
  },
  getCateList(){
    request({
      url:'/home/catitems'
    }).then(result=>{
      this.setData({
        cate_list:result
      })
    })
  },
  getFloorList(){
    request({
      url:'/home/floordata'
    }).then(result=>{
      this.setData({
        floor_list:result
      })
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