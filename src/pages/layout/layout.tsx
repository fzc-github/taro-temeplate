import React, { Fragment, useState } from 'react';
import { View } from '@tarojs/components';
import './layout.scss';
import Tabbar from '@/components/tabbar';
import tabbarDataInit from '../../tabbar.config';
import cloneDeep from 'lodash/cloneDeep';
import Shell from './components/shell';

const Layout = () => {
  const [tabbarData, setTabBarData] = useState(tabbarDataInit);
  const [tabbarIndex, setTabBarIndex] = useState(0);

  const listenTabbar = (key) => {
    let _tabbarData = cloneDeep(tabbarData);
    let _index = 0;
    _tabbarData.forEach((item, index) => {
      item.current = false;
      if (item.key === key) {
        item.current = true;
        _index = index;
        if (tabbarIndex === index) return
        setTabBarIndex(index);
      }
    })
    if (tabbarIndex === _index) return
    setTabBarData(_tabbarData);
  }

  return (
    <Fragment>
      <View className="main">
        <View 
          className="main__view flexst" 
          style={{
            width: `${tabbarData.length * 100}vw`,
            transform: `translateX(-${tabbarIndex * 100}vw)`
          }}
        >
          {
            tabbarData.map((item) => 
              <Shell 
                dom={item.component} 
                data={tabbarData} 
                key="*this" 
              />
            )
          }
        </View>
      </View>
      <Tabbar 
        data={tabbarData} 
        onListenTabbar={listenTabbar} 
      />
    </Fragment>
  )
}

export default Layout;