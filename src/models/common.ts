import Taro from '@tarojs/taro';
import { fromJS } from 'immutable';
import { SystemInfoProps } from '../interface/common'
const systemInfo = Taro.getSystemInfoSync();
type InitStateProps = {
  systemInfo: SystemInfoProps;
  userInfo: object;
}
const initState:InitStateProps = {
  systemInfo: systemInfo,
  userInfo: {
    name: '骊山'
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
