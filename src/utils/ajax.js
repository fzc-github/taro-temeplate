import Taro from '@tarojs/taro';
import { brand } from '../tenant';

const apiPath = 
  process.env.NODE_ENV === 'development' ? 
  'https://testh5.kxll.com/biz-client' : 
  // 'https://kxcube.kxll.com/proxy';
  'https://testh5.kxll.com/biz-client';

const ajax = ({ path, data = {}, method = 'POST' }) => (
  new Promise((resolve, reject) => {
    console.time(`请求${path}耗时：`)
    Taro.request({
      url: `${apiPath}${path}`,
      data,
      header: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json;charset=UTF-8",
        "token": Taro.getStorageSync("token") || "",
        "brand": brand
      },
      method,
      success: (res) => {
        console.timeEnd(`请求${path}耗时：`)
        if (res.data?.success) {
          console.log('😄请求成功：', res.data.data)
          resolve(res.data.data);
        } else {
          console.log('😤请求失败：', res.data)
          Taro.showToast({
            title: `${res.data?.errorMsg}`,
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        console.error('😵请求出错：', err)
        Taro.showToast({
          title: '请求失败，请检查网络。',
          icon: 'none'
        })
      }
    })
  }
))

export default ajax;