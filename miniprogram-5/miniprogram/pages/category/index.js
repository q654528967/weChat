// pages/category/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  },
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    if(!Cates){
      this.getCates()
    }else{
      if(Date.now()-Cates.time>1000*60*10){
        this.getCates()
      }else{
        // 可以使用旧数据
        this.Cates=Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  async getCates(){
    // request({
    //   url:'/categories'
    // }).then(res=>{
    //   接口数据存入本地存储
    //   wx.setStorageSync('cates', {time:Date.now(),data:res.data.message});
    //   this.Cates=res.data.message
    //   let leftMenuList = this.Cates.map(v=>v.cat_name)
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    const res = await request({
      url:'/categories'
    })
    wx.setStorageSync('cates', {time:Date.now(),data:res});
    this.Cates=res
    let leftMenuList = this.Cates.map(v=>v.cat_name)
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  handleItemTap(e){
    const {index} = e.currentTarget.dataset
    const rightContent = this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
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