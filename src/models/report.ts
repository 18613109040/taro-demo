import { fromJS } from 'immutable';
import { FormDataProps, StepsProps, OrderDetailProps } from '../interface/form'
import { validRepetition, temporaryService, getOrderDetail, getProductList, getProduct, getProductCompute, deteleFile, updateInfo, repayDetail } from '../services/report'
export type InitStateProps = {
  formData: FormDataProps;
  current: number;
  orderDetail: OrderDetailProps;
  steps: Array<StepsProps>;
  productList: any;
  productDetail: any;
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
    censusRegisterProvince: '',
    censusRegisterCity: '',
    censusRegisterCounty: '',
    censusRegisterAddress: '',  // 户籍所在省市区及地址详细

    email: '', // 常用邮箱
    isDriverLicense: false, //驾照情况
    phone: '', //手机号
    realEstateCategory: '', // 微信号
    education: '', //申请人学历
    marriage: '', // 婚姻状况
    childrenSum: '', // 家庭人口数量
    childrenStatus: '',// 子女个数
    livesProvince: '',  //省
    livesCity: '', //市
    livesCountry: '', // 区
    livesAddress: '', // 现居住省市区及详细地
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
     // 担保人信息
    clGuaranteeInfoListStr: {
      name: '', //担保姓名
      relationship: '', //与担保人关系
      phone: '', //电话号码
      cardId: '',// 身份证号
      email: '', // 邮箱
      liveProvince: '', //现居住省
      liveCity: '', // 市
      liveArea: '', //区
      address: '',//详细地址
      companyName: '', //公司名称
      companyPhone: '', //公司电话
      annualIncome: '', //月收入
      province: '',//公司省
      city: '', //公司市
      area: '',//区
      companyAddress: '',//详细地址
    },
    //车辆信息
    clCarInfoListStr: {
      powerCteType: '', // 动力系统类别 
      drivenDistance: '', //行驶里程（整数km）
      advanceOffer: '', //车商零售价（元）
      licenseProvince: '', // 省
      valuationCity: '',
      licenseCounty: '',
      licenseOwner: '', //* 行驶证车主名 
      useType: '', //用途 
      carType: '', // 车型
      carColour: '', //车辆颜色
      carNo: '', // 车牌号
      carBrand: '', // 品牌
      factoryDay: '', //出厂日期
      carFristLoginDay: '', //初次登记日期
      engineNo: '', //发动机号
      newCarPrice : '', //新车指导价(元) 
      carSystem : '', //车系 
      carDisplacement: '',//排量(L)
      frameNumber: '' //车架号
    },
    //产品信息
    clProductTypeListStr: {
      name: '',// 产品名称
      applyAmount: '',//申请金额
      loanAmount: '', //放款金额
      repaymentCount: '', //期数
      repaymentTotalAmount: '', //总还款金额
      bond: '',//租赁保证金
      gpsCost: '',//GPS费用
      productDescription: '' //产品说明
    },
    //银行卡
    clCollectGatheringInfoListStr: {
      bankNoType: '',//银行卡类型
      bankType: '', //收款账户类型
      accountName: '', //开户名
      bankPhone: '', //银行预留手机号
      openingBank: '', //开户行
      accountOpeningBranch: '', //开户支行
      bankNo: '', //联行号
      repaymentAccount: '' //还款账号
    },
    //资料信息
    clFileInfoListStr: {
      bankNo: '[]', 
      driveCard: '[]', 
      idCardPhoto: '[]',
      idCardPhoto2: '[]'
    },
    clCollectClientInfoBigDataStr: {

    }
  },
  orderDetail: {
    batchContent: '',
    batchStatus: ''
  },
  current: -1,
  steps: [{
    title: '秒批',
    desc: '',
    status: ''
  },{
    title: '准入',
    desc: '',
    status: ''
  },{
    title: '授信',
    desc: '',
    status: ''
  },{
    title: '贷前',
    desc: '',
    status: ''
  },{
    title: '贷后',
    desc: '',
    status: ''
  }],
  productList: [],
  productDetail: {
    periods: []
  }
}
export default {
  namespace: 'report',
  state: fromJS(initState).toJS(),

  effects: {
    // 校验身份证号码
    *validRepetitionAction({payload}, { call, put }){
      return yield call(validRepetition,payload)
    },
    // 暂时保存
    * temporaryAction({payload}, { call, put }){
      return yield call(temporaryService,payload)
    },
    *getOrderDetailAction({payload}, { call, put }) {
      const res = yield call(getOrderDetail,payload)
      if(res.success)
        yield put({ type: "setOrderDetail", payload: res.obj })
    },
    *getProductListAction({payload}, { call, put }) {
      const res = yield call(getProductList,payload)
      if(res.success){
        yield put({ type: "setProductList", payload: res })
      }
    },
    *getProductAction({payload}, { call, put }){
      const res = yield call(getProduct,payload)
      return res.obj
    },
    *getProductComputeAction({payload}, { call, put }){
      const res = yield call(getProductCompute,payload)
      return  res.obj
    },
    *deteleFileAction({payload}, { call, put }){
      const res = yield call(deteleFile,payload)
      return res
    },
    *updateInfoAction({payload}, { call, put }){
      const res = yield call(updateInfo,payload)
      return res
    },
    *getRepayDetailAction({payload}, { call, put}){
      const res = yield call(repayDetail,payload)
      return res
    }
  },
  reducers: {
    setProductList(state, {payload}) {
      const productList = [];
      payload.obj.map(item=>{
        if(item.typecode){
          productList.push(Object.assign(item, {name: item.typename}))
        }
      })
      state.productList = productList;
      return fromJS(state).toJS()
    },
    setOrderDetail(state, {payload} ) {
      state.orderDetail = payload
      const { clCarInfoListStr, clGuaranteeInfoListStr, clProductTypeListStr, clCollectGatheringInfoListStr, clFileInfoListStr,  clCollectClientInfoBigDataStr, clCollectClientInfoStr, primaryStatus  } = payload
      state.formData.clCarInfoListStr = JSON.parse(clCarInfoListStr||'{}')
      state.formData.clGuaranteeInfoListStr = JSON.parse(clGuaranteeInfoListStr||'{}')
      state.formData.clProductTypeListStr = JSON.parse(clProductTypeListStr||'{}')
      state.productDetail = JSON.parse(clProductTypeListStr||'{}')
      state.productDetail.repayment = state.productDetail.repaymentTotalAmount
      state.formData.clCollectGatheringInfoListStr = JSON.parse(clCollectGatheringInfoListStr||'{}')
      state.formData.clFileInfoListStr =  JSON.parse(clFileInfoListStr||'{}')
      state.formData.clCollectClientInfoBigDataStr = JSON.parse(clCollectClientInfoBigDataStr||'{}')
      const concat = JSON.parse(clCollectClientInfoStr||'{}')
      if(concat && concat.contactIdCard1){
        state.formData.clGuaranteeInfoListStr.name = state.formData.clGuaranteeInfoListStr.name || concat.contactName1;
        state.formData.clGuaranteeInfoListStr.phone = state.formData.clGuaranteeInfoListStr.phone ||  concat.contactPhone1;
        state.formData.clGuaranteeInfoListStr.cardId = state.formData.clGuaranteeInfoListStr.cardId || concat.contactIdCard1;
        state.formData.clGuaranteeInfoListStr.relationship = state.formData.clGuaranteeInfoListStr.relationship ||  concat.contactRelationship1; 
      }else if(concat && concat.contactIdCard2){
        state.formData.clGuaranteeInfoListStr.name = state.formData.clGuaranteeInfoListStr.name || concat.contactName2;
        state.formData.clGuaranteeInfoListStr.phone = state.formData.clGuaranteeInfoListStr.phone || concat.contactPhone2;
        state.formData.clGuaranteeInfoListStr.cardId =  state.formData.clGuaranteeInfoListStr.cardId || concat.contactIdCard2;
        state.formData.clGuaranteeInfoListStr.relationship = state.formData.clGuaranteeInfoListStr.relationship ||  concat.contactRelationship2;
      }else if(concat && concat.contactIdCard3){
        state.formData.clGuaranteeInfoListStr.name = state.formData.clGuaranteeInfoListStr.name || concat.contactName3;
        state.formData.clGuaranteeInfoListStr.phone = state.formData.clGuaranteeInfoListStr.phone || concat.contactPhone3;
        state.formData.clGuaranteeInfoListStr.cardId = state.formData.clGuaranteeInfoListStr.cardId || concat.contactIdCard3;
        state.formData.clGuaranteeInfoListStr.relationship = state.formData.clGuaranteeInfoListStr.relationship ||  concat.contactRelationship3;
      }
      state.formData = Object.assign({}, state.formData, JSON.parse(clCollectClientInfoStr||'{}'))
      if(primaryStatus === '-1'){
        state.current = 0
      }else if(primaryStatus === '0') {
        state.current = 1;
        state.steps[0].status = 'success'
      }
      return fromJS(state).toJS()
    },
    reset(state, {}){
      state = initState
      return fromJS(state).toJS()
    },
    setFormData(state, {payload}) {
      const { formData }= state
      state.formData = { ...formData, ...payload }
      return fromJS(state).toJS()
    },
    setGuarantee(state, {payload}){
      const { formData : {clGuaranteeInfoListStr}}= state;
      state.formData.clGuaranteeInfoListStr  = Object.assign({},clGuaranteeInfoListStr, payload )
      return fromJS(state).toJS()
    },
    setCarInfo(state, {payload}){
      const { formData : {clCarInfoListStr}}= state;
      state.formData.clCarInfoListStr  = Object.assign({},clCarInfoListStr, payload )
      return fromJS(state).toJS()
    },
    setProductInfo(state, {payload}){
      const { formData : {clProductTypeListStr}}= state;
      state.formData.clProductTypeListStr  = Object.assign({},clProductTypeListStr, payload )
      return fromJS(state).toJS()
    },
    setBankInfo(state, {payload}){
      const { formData : {clCollectGatheringInfoListStr}}= state;
      state.formData.clCollectGatheringInfoListStr  = Object.assign({},clCollectGatheringInfoListStr, payload )
      return fromJS(state).toJS()
    },
    setSteps(state, {payload}){
      state.steps[payload].status = 'success'
      state.current = state.current+1
      return fromJS(state).toJS()
    }
  },
};
