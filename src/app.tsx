import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { Provider } from 'react-redux';
import configStore from './store';
import './app.scss';

const store = configStore();

class App extends Component {
  componentDidMount () {
    const { statusBarHeight, safeArea } = Taro.getSystemInfoSync();
    // 导航栏高度（导航 + 设备状态）
    Taro.$navbarHeight = `${(statusBarHeight || 0) + 44}px`;
    // 全面屏底部的安全区高度，以iphone 8为界简单的做了适配
    Taro.$safeAreaHeight = `${safeArea?.top > 20 ? safeArea?.top : 0}px`;
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App;
