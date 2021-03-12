import React, { useEffect, Fragment } from 'react';
import Taro from '@tarojs/taro';

const Task = () => {
  useEffect(() => {
    console.log('任务')
    return () => {}
  }, [])

  return (
    <Fragment>
    任务5555555
    </Fragment>
  )
}

export default Task;