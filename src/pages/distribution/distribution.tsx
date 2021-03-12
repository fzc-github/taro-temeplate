import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, ScrollView, Text, Swiper, SwiperItem } from '@tarojs/components';
import { connect } from 'react-redux';
import Navbar from '@/components/navbar';
import ajax from '@/utils/ajax';
import './distribution.scss';

const Distribution = ({ options: { platformList } }) => {
  const tabs = ['分销数据', '门店列表'];
  const [tabsIndex, setTabsIndex] = useState(0);
  const [platformIndex, setPlatformIndex] = useState(0);

  useEffect(() => {
    console.log('分销')
    return () => {}
  }, [])

  return (
    <View className="tabbar-page">
      <Navbar />
      <View 
        style={{
          height: `calc(100% - ${Taro.$navbarHeight} - ${Taro.$safeAreaHeight})`
        }} 
      >
        <View className="top-bar flexbt">
          <View className="top-bar__tabs flexst">
            {
              tabs.map((item, index) => 
                <View 
                  className={`top-bar__tabs_item ${tabsIndex === index ? 'active' : null}`} 
                  hoverClass="click-hover" 
                  onClick={() => {
                    if (tabsIndex === index) return
                    setTabsIndex(index)
                  }} 
                  key="*this" 
                >{item}</View>
              )
            }
            <View 
              className="top-bar__tabs_curline" 
              style={{
                left: `${tabsIndex === 0 ? 20.5 : 245.5}rpx`
              }}
            ></View>
          </View>
          <Text className="top-bar__tip">*数据每周三更新</Text>
        </View>
        <ScrollView 
          className="platform-bar" 
          scroll-x
        >
          {
            platformList.map((item, index) => 
              <View 
                className={`platform-bar__item ${platformIndex === index ? 'active' : null}`} 
                hoverClass="click-hover" 
                onClick={() => {
                  if (platformIndex === index) return
                  setPlatformIndex(index)
                }}
                key="*this" 
              >{item}</View>
            )
          }
        </ScrollView>
        <Swiper 
          className="swiper-box" 
          current={tabsIndex} 
          onChange={(e) => {
            const { current } = e.detail
            if (tabsIndex === current) return
            setTabsIndex(current)
          }}
        >
          <SwiperItem>
            1
          </SwiperItem>
          <SwiperItem>
            2
          </SwiperItem>
        </Swiper>
      </View>
    </View>
  )
}

const mapStateToProps = ({ options }) => ({
  options
});

export default connect(mapStateToProps)(Distribution);