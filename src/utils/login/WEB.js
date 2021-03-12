const Taro = require('@tarojs/taro');
const ajax = require('@/utils/ajax');

/** 
 * H5
*/
module.exports = function (initStore) {
  console.log('web-login')
  setTimeout(() => {
    Taro.setStorageSync('userInfo', {
      nickName: '🌟🌟🌟',
      sex: '👨'
    });
    Taro.reLaunch({
      url: '/pages/layout/layout'
    })
  }, 1500)
  return
  ajax.default({
    path: '',
    data: {}
  }).then(res => {
    initStore();
  })
}