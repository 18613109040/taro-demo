
import { fromJS } from 'immutable';
export interface InitStateProps  {
 
}
const initState:InitStateProps = {


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
    setFormValue(state, {payload}) {
      const { index, value, error } = payload
      state.form[index].value = value
      state.form[index].error = error
      return fromJS(state).toJS()
    }
  },
};
