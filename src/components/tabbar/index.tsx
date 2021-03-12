import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';

interface params {
  data: Array<Object>
  onListenTabbar: Function
}

const Tabbar = ({ data, onListenTabbar }: params) => {
  return (
    <View 
      className="tabbar flexbt" 
      style={{
        paddingBottom: `${Taro.$safeAreaHeight}`,
      }}
    >
      {
        data.map((item: any) => 
          <View 
            className="tabbar__item flexct flexcl" 
            hoverClass="click-hover" 
            style={{
              width: '50%',
              color: `${item.current ? item.selectedColor : item.color}`
            }} 
            onClick={() => onListenTabbar(item.key)} 
            key={item.key} 
          >
            <Image 
              className="tabbar__item_icon" 
              src={
                item.current ? item.selectedIconPath : item.iconPath
              } 
            />
            <Text>{item.name}</Text>
          </View>
        )
      }
    </View>
  )
}

export default Tabbar;