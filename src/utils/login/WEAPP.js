const Taro = require('@tarojs/taro');
const ajax = require('@/utils/ajax');
const { brand } = require('../../tenant');

/** 
 * 微信小程序
*/
module.exports = function (initStore) {
  console.log('weapp-login')
  Taro.login({
    success: ({ code, errMsg }) => {
      if (code) {
        ajax.default({
          path: '/wf/h5/getProgramOpenId',
          data: {
            code,
			      brand,
          }
        }).then((res) => {
          Taro.setStorageSync('token', res.token);
          initStore();
          Taro.reLaunch({
            url: '/pages/layout/layout'
          });
        })
      } else {
        console.error(`登录失败！${errMsg}`)
      }
    }
  })
}