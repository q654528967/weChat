// pages/cart/index.js
import { getSetting, openSetting, chooseAddress} from '../../utils/getAddress';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalNum:0,
    totalPrice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  //选择收获地址
  async handleChooseAddress(){
    /* wx.chooseAddress({
      success: (result)=>{
        console.log(result)
      },
      fail: ()=>{},
      complete: ()=>{}
    }); */
    try{
      let res1 = await getSetting()
      const scopeAddress=res1.authSetting['scope.address'];
      if(scopeAddress==false){
        await openSetting()
      }
      let data = await chooseAddress()
      wx.setStorageSync('address', data);
    }catch(err){
      console.log(err)
    }
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
    const cart = wx.getStorageSync("cart") || [];
    this.setCart(cart)
    this.setData({address})
  },

  handleItemChange(e){
    let goods_id = e.currentTarget.dataset.id
    let {cart}=this.data;
    let index=cart.findIndex(el=>el.goods_id==goods_id)
    cart[index].checked=!cart[index].checked;
    this.setCart(cart)
    
  },
  //设置购物车状态 重新计算 底部工具栏数据 全选 总价 等
  setCart(cart){
    let totalPrice=0, totalNum = 0, allChecked=true;
    cart.forEach(el=>{
      if(el.checked){
        totalPrice += el.num*el.goods_price;
        totalNum = el.num;
      }else{
        allChecked=false
      }
    })
    allChecked=cart.length?allChecked: false
    this.setData({cart, allChecked,totalPrice,totalNum})
    wx.setStorageSync('cart', cart);
  },
  handleItemAllCheck(){
    let {cart , allChecked} = this.data;
    allChecked = !allChecked;
    cart.forEach(el=>{
      el.checked = allChecked
    })
    console.log(cart)
    this.setCart(cart)
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