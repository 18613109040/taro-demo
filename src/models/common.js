import Taro from '@tarojs/taro';
import { fromJS } from 'immutable';
const systemInfo = Taro.getSystemInfoSync();
const initState = {
  systemInfo: systemInfo,
  custom: {
    statusBarHeight: 20,
    customBarHeight: 44,
    screenHeight: 667,
    windowHeight: 667,
    tabBarHeight: 50
  }
}
export default {
  namespace: 'common',
  state: fromJS(initState).toJS(),

  effects: {},

  reducers: {
    // set
  },
};
