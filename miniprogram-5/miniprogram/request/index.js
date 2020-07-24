// 同时发送异步代码的请求
let ajaxCount = 0 ;
export const request=(params)=>{
    // 显示加载中的效果
    ajaxCount++
    wx.showLoading({
        title: '加载中',
        mask: true,
        success: (result)=>{
            
        },
        fail: ()=>{},
        complete: ()=>{}
    });
    let header = {...params.header};
    if(params.url.includes("/my/")){
        header.Authorization = wx.getStorageSync('token');
    }
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            header,
            url:baseUrl+params.url,
            success: (result)=>{
                resolve(result.data.message)
            },
            fail: (err)=>{
                reject(err)
            },
            complete:()=>{
                ajaxCount--
                if(ajaxCount==0) wx.hideLoading();
            }
        });
    })
}