export type RulesProps = {
  required?: boolean;
  pattern?: RegExp;
  message?: string;
}
export type  ChildrenProps = {
  type: string;   //组件类型 
  name: string;   //表单name
  rules: Array<RulesProps>;  //校验规则
  value: any;
  defaultValue: string;
  label: string;
  trigger: string;
  error?: boolean;
}
export type FormProps = {
  key: number;
  children: Array<ChildrenProps>;
}

export type StepsProps = {
  title?: string;
  desc?: string;
  status?: string;
}
export type GuaranteeInfoProps = {
  name: string; //担保姓名
  relationship: string; //与担保人关系
  phone: string; //电话号码
  cardId: string; // 身份证号
  email: string; // 邮箱
  liveProvince: string; //现居住省
  liveCity:string; // 市
  liveArea: string; //区
  address: string; //详细地址
  companyName: string; //公司名称
  companyPhone: string; //公司电话
  annualIncome: number | string; //月收入
  province: string; //公司省
  city: string; //公司市
  area: string; //区
  companyAddress: string; //详细地址
}
export type CarInfoProps = {
  powerCteType: string; // 动力系统类别 
  drivenDistance: number|string; //行驶里程（整数km）
  advanceOffer: number|string; //车商零售价（元）
  licenseProvince: string; // 省
  valuationCity: string;
  licenseCounty: string;

  licenseOwner: string; //* 行驶证车主名 
  useType: string; //用途 
  carType: string; // 车型
  carColour: string; //车辆颜色
  carNo: string; // 车牌号
  carBrand: string; // 品牌
  factoryDay: string; //出厂日期
  carFristLoginDay: string; //初次登记日期
  engineNo: string; //发动机号
  newCarPrice : number|string; //新车指导价(元) 
  carSystem : string; //车系 
  carDisplacement: number|string; //排量(L)
  frameNumber:string; //车架号
}
export type ProductTypeProps= {
  name: string; // 产品名称
  applyAmount: number|string; //申请金额
  loanAmount: number|string; //放款金额
  repaymentCount: number|string; //期数
  repaymentTotalAmount: number|string; //总还款金额
  bond: number|string; //租赁保证金
  gpsCost: number|string; //GPS费用
  productDescription: string; //产品说明
}
export type GatheringInfoProps = {
  bankNoType: string; //银行卡类型
  bankType: string; //收款账户类型
  accountName: string; //开户名
  bankPhone: string; //银行预留手机号
  openingBank: string; //开户行
  accountOpeningBranch: string; //开户支行
  bankNo: string; //联行号
  repaymentAccount: string; //还款账号
}
export type FormDataProps = {
  name?: string; // 姓名
  idCard?: string; // 身份证号
  sex?: string; // 性别
  birthday?: string; // 出生日期
  placeOfissue?: string; //证件签发地
  effectiveness?: boolean; //是否长期有效
  idCardStartDate?: string; //身份证开始日期
  idCardEndDate?: string; // 身份证结束日期
  idAddrProvince?: string; // 身份证省
  idAddrCity?: string; //市
  idAddrArea?: string; // 区
  idAddrDetails?: string; //身份证省市区及详细地址
  isDriverLicense?: boolean; //驾照情况
  censusRegisterProvince?: string;
  censusRegisterCity?: string;
  censusRegisterCounty?: string;
  censusRegisterAddress?: string;  // 户籍所在省市区及地址详细
  
  phone?: string; //手机号
  education?: string; //申请人学历
  marriage?: string; // 婚姻状况
  childrenSum?: number|string; // 家庭人口数量
  childrenStatus?: number|string; // 子女个数
  email?: string; // 常用邮箱
  realEstateCategory?: string; // 微信号
  livesProvince?: string;  //省
  livesCity?: string; //市
  livesCountry?: string; // 区
  livesAddress?: string; // 现居住省市区及详细地
  companyName?: string; // 公司名称
  yearsWorking?: number|string; // 工龄（年）
  jobYears?: string;// 现公司工作年限
  entryUnitTime?: number|string; //进入单位时间
  annualIncome?: number|string; //个人税后月收入(元)
  unitPhoneNumber?: string; //单位电话
  companyProvince?: string; // 户籍所在省
  companyCity?: string; // 户籍所在市
  companyCounty?: string; //区
  companyAddress?: string; //公司所在省市区及地址

  
  contactName1?: string; // 联系人姓名1
  contactRelationship1?: string; //联系人借款人关系1
  contactPhone1?: string; //联系人手机号1
  contactIdCard1?: string; // 联系人身份证号1
  contactName2?: string; // 联系人姓名2
  contactRelationship2?: string; //联系人借款人关系2
  contactPhone2?: string; //联系人手机号2
  contactIdCard2?: string; // 联系人身份证号2
  contactName3?: string; // 联系人姓名3
  contactRelationship3?: string; //联系人借款人关系3
  contactPhone3?: string; //联系人手机号3
  contactIdCard3?: string; // 联系人身份证号3
  
  clGuaranteeInfoListStr?: GuaranteeInfoProps; // 担保人信息
  clCarInfoListStr?: CarInfoProps; //车辆信息
  clProductTypeListStr?: ProductTypeProps; //产品信息
  clCollectGatheringInfoListStr?: GatheringInfoProps
}