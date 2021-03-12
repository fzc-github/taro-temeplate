import React, { useEffect, useState, useRef, Fragment } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

/**
 * @param { parentName: 必须是独有的类名 }
 * */ 
interface params {
  url: String
  name: String
  parentName: String
}

const LazyImg = ({ url, name, parentName }: params) => {
  const env = process.env.TARO_ENV;
  const imgRef = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery().select('.lazy-img')
        .boundingClientRect()
        .exec(() => {
          switch(env) {
            case 'weapp':
              intersectionObserverByWeapp()
              break;
            case 'h5':
              intersectionObserverByH5();
              break;
          }
        })
    })
    return () => {};
  }, [])

  // 微信小程序的监听者对象
  const intersectionObserverByWeapp = () => {
    const page = Taro.getCurrentPages()[0];
    let intersectionObserver = Taro.createIntersectionObserver(page);
    intersectionObserver.relativeTo(`.${parentName}`).observe(`.${name}`, (entries) => {
      if (entries.intersectionRatio > 0 && url) {
        setShow(true);
        intersectionObserver.disconnect();
      }
    });
  }

  // h5的监听者对象
  const intersectionObserverByH5 = () => {
    let intersectionObserver;
    intersectionObserver = new IntersectionObserver((entries) => {
      const item = entries[0];
      const { isIntersecting } = item;
      if (isIntersecting && url) {
        item.target['style'] = `background: url(${url}) no-repeat;background-size: 100% 100%;`;
        intersectionObserver.unobserve(item.target);
      }
    })
    intersectionObserver.observe(imgRef.current);
  }

  return (
    <Fragment>
      
      {
        env === 'weapp' ? 
        <View 
          className={`lazy-img ${name}`} 
          style={{
            background: show ? 
              `url(${url}) no-repeat;background-size: 100% 100%` : 
              '#f7f7f7'
          }} 
        /> : 
        env === 'h5' ?
        <View className="lazy-img" ref={imgRef} /> :
        <View className="lazy-img no-compatible" />
      }
    </Fragment>
  )
}

export default LazyImg;