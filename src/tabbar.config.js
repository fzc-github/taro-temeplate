import React from 'react';
import Distribution from './pages/distribution/distribution';
import Task from './pages/task/task';
import User from './pages/user/user';
import { tabbarColor, tabbarSelectedColor } from './assets/css/var.scss';
import { 
  distribution,
  distributionActive,
  task,
  taskActive,
  user,
  userActive
} from '@/assets/image';

const { color, selectedColor, current } = {
  color: tabbarColor,
  selectedColor: tabbarSelectedColor
};

/**
 * @param { current: 当前显示的tabbar页面 }
 * @param { load: 控制tabbar页面首次加载后就不加载，配合<Shell />使用 }
 * @param { key: 必须和component上的key保持一致 }
 * @param { tabBarIndex: 和current、load一起设置从其他路口进入指定tabbar页面 }
 * 
 * 从其他路口进入指定tabbar页面的话需设置目标页面的current和load都为true，非目标页面都为false，
 * 并且layout中的tabBarIndex属性设置为目标页面在下面数组中的index。
 */
export default [
  {
    name: '分销',
    key: 'distribution',
    iconPath: distribution,
    selectedIconPath: distributionActive,
    color,
    selectedColor,
    current: true,
    component: <Distribution key="distribution" />,
    load: true
  },
  {
    name: '任务',
    key: 'task',
    iconPath: task,
    selectedIconPath: taskActive,
    color,
    selectedColor,
    current: false,
    component: <Task key="task" />,
    load: false
  },
  {
    name: '我的',
    key: 'user',
    iconPath: user,
    selectedIconPath: userActive,
    color,
    selectedColor,
    current: false,
    component: <User key="user" />,
    load: false
  }
];