import { fromJS } from 'immutable';
import { FormProps } from '../interface/form'
export type InitStateProps = {
  idCard: Array<FormProps>
}
const initState:InitStateProps = {
  idCard: [{
    key: 1,
    children: [{
      type: 'input',
      name: 'accountName',
      rules: [{
        required: true,
        pattern: /^(([\u4e00-\u9fff]{2,4})|([a-z\.\s\,]{2,50}))$/i,
        message: '请输入正确的姓名!'
      }],
      value: '',
      defaultValue: '',
      label: '姓名',
      trigger: 'onChange',
    }],
  },{
    key: 2,
    children:[{
        type: 'input',
        name: 'code',
        rules: [{
          required: true,
          pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
          message: '请输入正确的身份证号!'
        }],
        value: '',
        defaultValue: '',
        label: '身份证号',
        trigger: 'onChange',
      }]
  },{
    key: 3,
    children:[{
      type: 'date',
      name: 'startTime',
      rules: [{
        required: true,
        // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
        message: '请填写开始时间'
      }],
      value: '',
      defaultValue: '',
      label: '开始时间',
      trigger: 'onChange',
    },{
      type: 'date',
      name: 'endTime',
      rules: [{
        required: true,
        // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
        message: '请填写结束时间'
      }],
      value: '',
      defaultValue: '',
      label: '结束时间',
      trigger: 'onChange',
    }]
  },{
    key: 4,
    children:[{
        type: 'addr',
        name: 'addr',
        rules: [{
          required: true,
          // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
          message: '请选择地址'
        }],
        value: '',
        defaultValue: '',
        label: '地址',
        trigger: 'onChange',
      }]
  },{
    key: 5,
    children:[{
        type: 'input',
        name: 'addrdetail',
        rules: [{
          required: true,
          pattern: /^\s*\S{2,}\s*$/,
          message: '请输入详细地址'
        }],
        value: '',
        defaultValue: '',
        label: '详细地址',
        trigger: 'onBlur',
      }]
  },{
    key: 6,
    children:[{
        type: 'gender',
        name: 'gender',
        rules: [{
          required: true,
          // pattern: /^\s*\S{2,}\s*$/,
          message: '请选择性别'
        }],
        value: '',
        defaultValue: '',
        label: '性别',
        trigger: 'onBlur',
      },{
        type: 'input',
        name: 'place',
        rules: [{
          required: true,
          pattern: /^\s*\S{2,}\s*$/,
          message: '请填写证件签发地'
        }],
        value: '',
        defaultValue: '',
        label: '证件签发地',
        trigger: 'onBlur',
      }]
  }]
}
export default {
  namespace: 'report',
  state: fromJS(initState).toJS(),

  effects: {},

  reducers: {
    setIdCardValue(state, {payload}){
      const { x, y, value, error } = payload;
      state.idCard[x].children[y].value = value;
      state.idCard[x].children[y].error = error;
      return fromJS(state).toJS()
    },
    setIdCard(state, {payload}){
      state.idCard = payload;
      return fromJS(state).toJS()
    }
  },
};
