import { fromJS } from 'immutable';
import { approval } from '../services/approval'

type InitStateProps = {

}
const initState:InitStateProps = {
 

}
export default {
  namespace: 'approval',
  state: fromJS(initState).toJS(),

  effects: {
    *approvalAction({payload}, { call, put }) {
      const res = yield call(approval,payload)
      return res;
    },
    // *loginAction({payload}, { call, put }){
    //   const res = yield call(login,payload)
    //   if(res.success)
    //     yield put({ type: "setAccount", payload: res.obj })
    //   return res;
    // }
  },

  reducers: {

  },
};
