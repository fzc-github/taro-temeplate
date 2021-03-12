import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';
import { AtIcon } from 'taro-ui';

interface params {
  title?: String
  fixed?: Boolean
  back?: Boolean
}

const Navbar = ({ title = '生意管家', fixed, back = false }: params) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    setStyle({
      height: Taro.$navbarHeight,
      position: fixed ? 'fixed' : 'static'
    })
    return () => {}
  }, [])

  const goback = () => {
    Taro.navigateBack({
      delta: 1
    })
  }

  return (
    <View 
      className="navbar flexbt flexcl"
      style={style} 
    >
      <View></View>
      <View className="navbar__main">{title}</View>
      {
        back && 
        <View className="navbar__goback" style={{height: `${Taro.$navbarHeight}`}}>
          <AtIcon 
            className="navbar__goback_icon" 
            value="chevron-left" 
            color="#333" 
            onClick={goback}
          />
        </View>
      }
    </View>
  )
}

export default Navbar;