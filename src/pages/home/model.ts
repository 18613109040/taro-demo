
import { fromJS } from 'immutable';
export type StepsProps = {
  title: string;
  desc: string;
}
export type InitStateProps = {
  steps: Array<StepsProps>;
}
const initState:InitStateProps = {
  steps: [{
    title: '步骤一',
    desc: '',
  },{
    title: '步骤二',
    desc: '',
  },{
    title: '步骤三',
    desc: '',
  }]
}
export default {
  namespace: 'home',
  state: fromJS(initState).toJS(),
  effects: {
    // *getAppBannerAction({payload}, { call, put }){
    //   const res = yield call(appBanner,payload)
    //   if (res&&res.length>0) {
    //     yield put({ type: 'setAppBanner', payload: res })
    //   }
    // }
  },
  reducers: {
    // setAppBanner(state, {payload}){
    //   return {...state,banner:payload}
    // },
  },
};
