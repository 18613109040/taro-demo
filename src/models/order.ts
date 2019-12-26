import { fromJS } from 'immutable';
import { getOrderList } from '../services/order'
import { OrderProps } from '../interface/order'
const initState:OrderProps = {
  all: {
    list: [],
    page: 0
  }
}
export default {
  namespace: 'order',
  state: fromJS(initState).toJS(),

  effects: {
    * getOrderListAction({payload}, { call, put }){
      const res = yield call(getOrderList,payload)
      yield put({ type: "setOrderList", payload: {
        type: payload.type,
        list: res.rows||[] 
      }});
    }
  },

  reducers: {
    setOrderList(state, {payload}){
      const { type, list }= payload
      state[type].list = [...state[type].list, ...list]
      state[type].page = state[type].page+1
      return fromJS(state).toJS()
    }
  
  },
};
