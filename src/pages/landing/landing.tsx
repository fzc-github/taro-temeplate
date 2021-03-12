import React, { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { AtActivityIndicator } from 'taro-ui';
import { connect } from 'react-redux';
import { getPlatformList } from '@/store/actions/options';

/**
 * 落地页
*/ 
const Landing = ({ _getPlatformList}) => {
  useEffect(() => {
    const token = Taro.getStorageSync('token');
    if (token) {
      initStore();
      Taro.reLaunch({
        url: '/pages/layout/layout'
      });
    } else {
      // 不同环境登录
      const env = Taro.getEnv();
      const login = require(`@/utils/login/${env}.js`);
      login(initStore);
    }
    return () => {}
  }, [])

  // 初始化项目依赖数据
  const initStore = () => {
    _getPlatformList();
  }

  return (
    <AtActivityIndicator mode="center" content="正在启动应用，请稍后..." />
  )
}

const mapDispatchToProps = (dispatch) => ({
  _getPlatformList() {
    dispatch(getPlatformList())
  }
});

export default connect(null, mapDispatchToProps)(Landing);