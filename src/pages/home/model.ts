
import { fromJS } from 'immutable';
import { FormProps } from '../../interface/form'
export type StepsProps = {
  title: string;
  desc: string;
}
export interface InitStateProps  {
  steps: Array<StepsProps>;
  form: Array<FormProps>;
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
  }],
  form: [{
    type: 'input',
    name: 'accountName',
    rules: [{
      required: true,
      pattern: /^(([\u4e00-\u9fff]{2,4})|([a-z\.\s\,]{2,50}))$/i,
      message: 'Please select your country!'
    }],
    value: '',
    label: '姓名',
    trigger: 'onChange',
  },{
    type: 'input',
    name: 'idCard',
    rules: [{
      required: true,
      pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
      message: 'Please select your country!'
    }],
    value: '',
    label: '身份证号',
    trigger: 'onChange',
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
    setFormValue(state, {payload}) {
      const { index, value, error } = payload
      state.form[index].value = value
      state.form[index].error = error
      return fromJS(state).toJS()
    }
  },
};
