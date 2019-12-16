import { fromJS } from 'immutable';
import { FormProps } from '../interface/form'
export type InitStateProps = {
  idCard: Array<FormProps>
}
const initState:InitStateProps = {
  idCard: [{
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
  },{
    type: 'input',
    name: 'idCard',
    rules: [{
      required: true,
      pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
      message: 'Please select your country!'
    }],
    value: '',
    label: '证件签发地',
    trigger: 'onChange',
  }]
}
export default {
  namespace: 'report',
  state: fromJS(initState).toJS(),

  effects: {},

  reducers: {
    // set
  },
};
