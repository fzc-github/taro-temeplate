import React, { useEffect, Fragment } from 'react';
import Taro from '@tarojs/taro';

const User = () => {
  useEffect(() => {
    console.log('我的')
    return () => {}
  }, [])

  return (
    <Fragment>
    我的
    </Fragment>
  )
}

export default User;