export function getSetting(){
    return new Promise((resolve, reject)=>{
        wx.getSetting({
            success: (result)=>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err)
            }
        });
    })
}
export function openSetting(){
    return new Promise((resolve, reject)=>{
        wx.openSetting({
            success: (result)=>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err)
            }
        });
    })
}
export function chooseAddress(){
    return new Promise((resolve, reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
        });
    })
}
export function showModal ({content}) { 
    return new Promise((resolve, reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            success: (res)=> {
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}
export function showToast({title}){
    return new Promise((resolve, reject)=>{
        wx.showToast({
            title,
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (res)=>{
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
    
}
export const login= ()=> {  
    return new Promise((resolve, reject)=>{
        wx.login({
            timeout:10000,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
            complete: ()=>{}
        });
    })
}
// pay 支付所需要的基本参数
export const requestPayment= (pay)=> {  
    return new Promise((resolve, reject)=>{
        wx.requestPayment({
            ...pay,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}