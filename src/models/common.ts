import Taro from '@tarojs/taro';
import { fromJS } from 'immutable';
import { login } from '../services/common'
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

  effects: {
    *loginAction({payload}, { call, put }){
      const res = yield call(login,payload)
      if(res.success)
        yield put({ type: "setAccount", payload: res.obj })
      return res;
    }
  },

  reducers: {
    setAccount(state, {payload}) {
      state.userInfo = payload
      return fromJS(state).toJS()
    }
  },
};
