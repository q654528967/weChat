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