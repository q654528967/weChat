// pages/cart/index.js
import { showToast, showModal, getSetting, openSetting, chooseAddress} from '../../utils/asyncWx';
import {request, requestPayment} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalNum:0,
    totalPrice:0
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
    const address=wx.getStorageSync('address');
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(el=>el.checked)
    this.setData({address})
    let totalPrice=0, totalNum = 0;
    cart.forEach(el=>{
      totalPrice += el.num*el.goods_price;
      totalNum = el.num;
    })
    this.setData({cart,totalPrice,totalNum,address})
  },
  async handleOrderPay(){
    try {
      const token = wx.getStorageSync('token');
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index',
        });
        return;
      }
      const header = {Authorization:token};
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart ;
      let goods= [];
      cart .forEach(el=>goods.push({
        goods_id:el.goods_id,
        goods_number:el.num,
        goods_price:el.goods_price
      }))
      const orderParams={order_price,consignee_addr,goods}
      // 发送商品信息，获得订单编号
      const {order_number} = await request({url:'/my/orders/create',method:'post',data:orderParams})
      // 发起预支付接口
      const {pay} = await request({url:'',method:'post',data:{
        order_number
      }})
      // 发起微信支付 
      await requestPayment(pay);
      // 查询后台订单状态 传入订单编号
      let res = await request({url:'', method:'post', data:{oder_number}})
      console.log(res)
      await showToast({title:'支付成功'});
      let newCart = wx.getStorageSync('cart');
      newCart = newCart.filter(el=>el.checked)
      wx.setStorageSync('cart', newCart);
      wx.navigateTo({
        url: '/pages/order/index'
      });
    } catch (error) {
      console.log(error)
      await showToast({title:'支付失败'})
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