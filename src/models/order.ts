import { fromJS } from 'immutable';
import { getOrderList, getTaskList, getBigList } from '../services/order'
type ItemProps = {
    list: Array<any>;
    page: number;
    total: number;
}
type IProps = {
  all: ItemProps;
  taskList: ItemProps;
  bigList: ItemProps;
  allbig: ItemProps;
  underbig: ItemProps;
  backbig: ItemProps;
  fulbig: ItemProps;
  infotask: ItemProps;
  firstask:  ItemProps;
  undertask: ItemProps;
  signtask: ItemProps;
  gpstask: ItemProps;
  freviewtask: ItemProps;
  qreviewtask: ItemProps;
  financialtask: ItemProps;
  approvaltask: ItemProps;
  loantask: ItemProps;
  sloantask: ItemProps;
  closetask: ItemProps;
  rejectedtask: ItemProps;
}
const initState:IProps = {
  all: {
    list: [],
    page: 1,
    total: 1
  },
  taskList: {
    list: [],
    page: 1,
    total: 1
  },
  bigList: {
    list: [],
    page: 1,
    total: 1
  },
  allbig: {
    list: [],
    page: 1,
    total: 1
  },
  underbig: {
    list: [],
    page: 1,
    total: 1
  },
  backbig: {
    list: [],
    page: 1,
    total: 1
  },
  fulbig: {
    list: [],
    page: 1,
    total: 1
  },
  infotask: {
    list: [],
    page: 1,
    total: 1
  },
  firstask: {
    list: [],
    page: 1,
    total: 1
  },
  undertask: {
    list: [],
    page: 1,
    total: 1
  },
  signtask: {
    list: [],
    page: 1,
    total: 1
  },
  gpstask: {
    list: [],
    page: 1,
    total: 1
  },
  freviewtask: {
    list: [],
    page: 1,
    total: 1
  },
  qreviewtask: {
    list: [],
    page: 1,
    total: 1
  },
  financialtask: {
    list: [],
    page: 1,
    total: 1
  },
  approvaltask: {
    list: [],
    page: 1,
    total: 1
  },
  loantask: {
    list: [],
    page: 1,
    total: 1
  },
  sloantask: {
    list: [],
    page: 1,
    total: 1
  },
  closetask: {
    list: [],
    page: 1,
    total: 1
  },
  rejectedtask: {
    list: [],
    page: 1,
    total: 1
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
        list: res.rows||[],
        total: res.total||0,
      }});
    },
    * getTaskListAction ({payload}, { call, put }) {
      const res = yield call(getTaskList,payload)
      yield put({ type: "setTaskList", payload: {
        type: 'taskList',
        list: res.rows||[] ,
        total: res.total||0,
      }});
      return res;
    },
    * getBigListAction ({payload}, { call, put }) {
      const res = yield call(getBigList,payload)
      yield put({ type: "setBigList", payload: {
        type: payload.type,
        list: res.rows||[] ,
        total: res.total||0,
      }});
      return res;
    },
  },

  reducers: {
    destoryOrder(state, {payload}) {
      return fromJS(initState).toJS()
    },
    setOrderList(state, {payload}){
      const { type, list, total }= payload
      state[type].list = [...state[type].list, ...list]
      if(list.length > 0){
        state[type].page = state[type].page+1;
      }
      state[type].total = total || 0;
      return fromJS(state).toJS()
    },
    setTaskList(state, {payload}) {
      const { type, list, total }= payload;
      state[type].list = [...state[type].list, ...list];
      if(list.length > 0){
        state[type].page = state[type].page+1;
      }
      state[type].total = total || 0;
      return fromJS(state).toJS();
    },
    setBigList(state, {payload}) {
      const { type, list, total }= payload;
      state[type].list = [...state[type].list, ...list];
      if(list.length > 0){
        state[type].page = state[type].page+1;
      }
      state[type].total = total || 0;
      return fromJS(state).toJS();
    }
  
  },
};
