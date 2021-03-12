import { 
  GET_PLATFORM_LIST 
} from '../constants/options';

const INITIAL_STATE = {
  platformList: [] // 平台
};

export default function options (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PLATFORM_LIST:
      return {
        ...state,
        platformList: action.data
      }
    default:
      return state
  }
}