import { fromJS } from 'immutable';
import { FormDataProps, StepsProps } from '../interface/form'
export type InitStateProps = {
  formData: FormDataProps
  steps: Array<StepsProps>;
}
const initState:InitStateProps = {
  formData: {
    name: '',// 姓名
    idCard: '', // 身份证号
    sex: '', // 性别
    birthday: '', // 出生日期
    placeOfissue: '', //证件签发地
    effectiveness: false, //是否长期有效
    idCardStartDate: '', //身份证开始日期
    idCardEndDate: '', // 身份证结束日期
    idAddrProvince: '', // 身份证省
    idAddrCity: '', //市
    idAddrArea: '', // 区
    idAddrDetails: '', //身份证省市区及详细地址
    isDriverLicense: false, //驾照情况
    censusRegisterProvince: '',
    censusRegisterCity: '',
    censusRegisterCounty: '',
    censusRegisterAddress: '',  // 户籍所在省市区及地址详细
    phone: '', //手机号
    education: '', //申请人学历
    marriage: '', // 婚姻状况
    childrenSum: '', // 家庭人口数量
    childrenStatus: '',// 子女个数
    email: '', // 常用邮箱
    realEstateCategory: '', // 微信号
    livesProvince: '',  //省
    livesCity: '', //市
    livesCountry: '', // 区
    livesAddress: '', // 现居住省市区及详细地
    contactName1: '', // 联系人姓名1
    contactRelationship1: '', //联系人借款人关系1
    contactPhone1: '', //联系人手机号1
    contactIdCard1: '', // 联系人身份证号1
    contactName2: '', // 联系人姓名2
    contactRelationship2: '', //联系人借款人关系2
    contactPhone2: '', //联系人手机号2
    contactIdCard2: '', // 联系人身份证号2
    contactName3: '', // 联系人姓名3
    contactRelationship3: '', //联系人借款人关系3
    contactPhone3: '', //联系人手机号3
    contactIdCard3: '', // 联系人身份证号3
    companyName: '', // 公司名称
    yearsWorking: '', // 工龄（年）
    jobYears: '',// 现公司工作年限
    entryUnitTime: '', //进入单位时间
    annualIncome: '',//个人税后月收入(元)
    unitPhoneNumber: '', //单位电话
    companyProvince: '', // 户籍所在省
    companyCity: '', // 户籍所在市
    companyCounty: '', //区
    companyAddress: '', //公司所在省市区及地址
    clGuaranteeInfoListStr: [], // 担保人信息
    clCarInfoListStr: [],//车辆信息
    clProductTypeListStr: [], //产品信息
    clCollectGatheringInfoListStr: []
  },
  steps: [{
    title: '基本信息',
    desc: '',
  },{
    title: '车辆信息',
    desc: '',
  },{
    title: '产品信息',
    desc: '',
  },{
    title: '材料附件',
    desc: '',
  }]
}
export default {
  namespace: 'report',
  state: fromJS(initState).toJS(),

  effects: {},

  reducers: {
    setFormData(state, {payload}) {
      const { formData }= state
      state.formData = { ...formData, ...payload }
      return fromJS(state).toJS()
    }
  },
};
