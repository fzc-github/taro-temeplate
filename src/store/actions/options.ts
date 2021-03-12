import ajax from '@/utils/ajax';
import {
  GET_PLATFORM_LIST
} from '../constants/options';

// 获取各平台
const getPlatformList = () => {
  return (dispatch) => {
    ajax({
      path: '/steward/h5/platformList'
    }).then((res) => {
      dispatch({
        type: GET_PLATFORM_LIST,
        data: res
      });
    })
  }
}

export {
  getPlatformList
}