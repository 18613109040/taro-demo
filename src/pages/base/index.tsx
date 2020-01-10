import Taro, { Component } from '@tarojs/taro';
import { View, Text, Radio, RadioGroup, ScrollView } from '@tarojs/components';
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import moment from 'moment'
import CInput from '../../components/Input';
import BasePicker from '../../components/BasePicker'
import Addr from '../../components/Addr';
import DatePicker from '../../components/DatePicker'
import { InitStateProps } from '../../models/report';
import { SystemInfoProps } from '../../interface/common'
import './index.scss';
type IState = {
  isDriverLicense: boolean;
  email: string; // 常用邮箱
  emailError: boolean;
  phone: string; //手机号
  phoneError: boolean;
  education: string; //申请人学历
  educationError: boolean;
  marriage: string; // 婚姻状况
  marriageError: boolean;
  childrenSum: number | string; // 家庭人口数量
  childrenSumError: boolean;
  childrenStatus: number | string; // 子女个数
  childrenStatusError: boolean;
  realEstateCategory: string; // 微信号
  realEstateCategoryError: boolean;
  livesProvince: string;  //省
  livesCity: string; //市
  livesCountry: string; // 区
  liveAddrError: boolean;
  livesAddress: string; // 现居住省市区及详细地
  livesAddrDetailsError: boolean;
  companyName: string; // 公司名称
  companyNameError: boolean;
  yearsWorking: number | string; // 工龄（年）
  jobYears: string;// 现公司工作年限
  yearsWorkingError: boolean;
  jobYearsError: boolean;
  entryUnitTime: number | string; //进入单位时间
  entryUnitTimeError: boolean;
  annualIncome: number | string; //个人税后月收入(元)
  annualIncomeError: boolean;
  unitPhoneNumber: string; //单位电话
  unitPhoneNumberError: boolean;
  companyProvince: string; // 户籍所在省
  companyCity: string; // 户籍所在市
  companyCounty: string; //区
  companyAddrError: boolean;
  companyAddress: string; //公司所在省市区及地址
  companyAddrDetailsError: boolean;
  [key: string]: string | boolean | Array<any> | number;
  
  
}
type IProps = {
  report: InitStateProps;
  systemInfo: SystemInfoProps;
  dispatch?: any;
}
@connect(({ report, common }) => ({
  report: report,
  systemInfo: common.systemInfo
}))
class IdCard extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '个人信息',
  }
  constructor(props) {
    super(props)
    const { isDriverLicense, email, phone, realEstateCategory, education, marriage, childrenSum, childrenStatus, livesProvince, livesCity, livesCountry, livesAddress,
      companyName, yearsWorking, jobYears, entryUnitTime, annualIncome, unitPhoneNumber, companyProvince, companyCity, companyCounty, companyAddress } = props.report.formData;
    this.state = {
      isDriverLicense: isDriverLicense==='无'? false: true,  // 驾照qian'k
      email: email || '', // 常用邮箱
      emailError: false,
      phone: phone || '', //手机号
      phoneError: false,
      realEstateCategory: realEstateCategory || '', // 微信号
      realEstateCategoryError: false,
      education: education || '', //申请人学历
      educationError: false,
      marriage: marriage || '', // 婚姻状况
      marriageError: false,
      childrenSum: childrenSum || '', // 家庭人口数量
      childrenSumError: false,
      childrenStatus: childrenStatus || '',// 子女个数
      childrenStatusError: false,
      livesProvince: livesProvince || '',  //省
      livesCity: livesCity || '', //市
      livesCountry: livesCountry || '', // 区
      liveAddrError: false,
      livesAddress: livesAddress || '', // 现居住省市区及详细地
      livesAddrDetailsError: false,
      companyName: companyName || '', // 公司名称
      companyNameError: false,
      yearsWorking: yearsWorking || '', // 工龄（年）
      yearsWorkingError: false,
      jobYears: jobYears || '',// 现公司工作年限
      jobYearsError: false,
      entryUnitTime: entryUnitTime || '', //进入单位时间
      entryUnitTimeError: false,
      annualIncome: annualIncome || '',//个人税后月收入(元)
      annualIncomeError: false,
      unitPhoneNumber: unitPhoneNumber || '', //单位电话
      unitPhoneNumberError: false,
      companyProvince: companyProvince || '', // 户籍所在省
      companyCity: companyCity || '', // 户籍所在市
      companyCounty: companyCounty || '', //区
      companyAddrError: false,
      companyAddress: companyAddress || '', //公司所在省市区及地址
      companyAddrDetailsError: false
    }
  }
  componentDidMount = () => {
    // console.dir()
  }
  onChange = (obj) => {
    const { error, value, valueKey, errorKey } = obj;
    this.setState({
      [`${errorKey}`]: error,
      [`${valueKey}`]: value
    })
  }
  onChangeAddr = (obj) => {
    const { error, value } = obj;
    const { companyProvince, companyCity, companyCounty } = this.state;
    if (!companyProvince && !companyCity && !companyCounty) {
      this.setState({
        liveAddrError: error,
        companyProvince: value[0].name,
        companyCity: value[1].name,
        companyCounty: value[2].name,
        livesProvince: value[0].name,
        livesCity: value[1].name,
        livesCountry: value[2].name,
      })
    } else {
      this.setState({
        liveAddrError: error,
        livesProvince: value[0].name,
        livesCity: value[1].name,
        livesCountry: value[2].name,
      })
    }
  }
  onChangeCompanyAddr = (obj) => {
    const { error, value } = obj;
    this.setState({
      companyAddrError: error,
      companyProvince: value[0].name,
      companyCity: value[1].name,
      companyCounty: value[2].name,
    })
  }
  driverLicenseChange = (e) => {
    const { value } = e.target;
    this.setState({
      isDriverLicense: value === '0' ? true : false
    })
  }
  save = () => {
    const { orderId } = this.$router.params
    const keys: Array<string> = ['email', 'phone', 'realEstateCategory', 'education', 'marriage', 'childrenSum', 'childrenStatus', 'livesProvince', 'livesCity', 'livesCountry', 'livesAddress',
      'companyName', 'yearsWorking', 'jobYears', 'entryUnitTime', 'annualIncome', 'unitPhoneNumber', 'companyProvince', 'companyCity', 'companyCounty', 'companyAddress']
    const { isDriverLicense, email, phone, realEstateCategory, education, marriage, childrenSum, childrenStatus, livesProvince, livesCity, livesCountry, livesAddress,
      companyName, yearsWorking, jobYears, entryUnitTime, annualIncome, unitPhoneNumber, companyProvince, companyCity, companyCounty, companyAddress } = this.state;
    let temp: IState = this.state;
    keys.map(key => {
      if (!this.state[key]) {
        if ((key === 'livesProvince' || key === 'livesCity' || key === 'livesCountry') && (!livesProvince && !livesCity && !livesCountry)) {
          temp.liveAddrError = true
        } else if ((key === 'companyProvince' || key === 'companyCity' || key === 'companyCounty') && (!companyProvince && !companyCity && !companyCounty)) {
          temp.companyAddrError = true
        } else {
          temp[`${key}Error`] = true
        }
      }
    })
    this.setState({
      ...temp
    }, () => {
      const { emailError, phoneError, realEstateCategoryError, educationError, marriageError, childrenSumError, childrenStatusError, liveAddrError, livesAddrDetailsError,
        companyNameError, yearsWorkingError, jobYearsError, annualIncomeError, entryUnitTimeError, unitPhoneNumberError, companyAddrError, companyAddrDetailsError } = this.state;
      if (!emailError && !phoneError && !realEstateCategoryError && !educationError && !marriageError && !childrenSumError && !childrenStatusError && !liveAddrError && !livesAddrDetailsError && !companyNameError
        && !yearsWorkingError && !jobYearsError && !annualIncomeError && !entryUnitTimeError && !unitPhoneNumberError && !companyAddrError && !companyAddrDetailsError) {

        const { dispatch } = this.props;
        dispatch({
          type: 'report/temporaryAction',
          payload: {
            id: orderId,
            updateStep: 0,
            isDriverLicense: isDriverLicense ? '有' : '无', email, phone, realEstateCategory, education, marriage, childrenSum, childrenStatus, livesProvince, livesCity, livesCountry, livesAddress,
            companyName, yearsWorking, jobYears, entryUnitTime, annualIncome, unitPhoneNumber, companyProvince, companyCity, companyCounty, companyAddress
          }
        }).then((res) => {
          if (res.success) {
            Taro.navigateBack()
            // dispatch({
            //   type: 'report/setFormData',
            //   payload: {
            //     isDriverLicense, email, phone, realEstateCategory, education, marriage, childrenSum, childrenStatus, livesProvince, livesCity, livesCountry, livesAddress,
            //     companyName, yearsWorking, jobYears, entryUnitTime, annualIncome, unitPhoneNumber, companyProvince, companyCity, companyCounty, companyAddress
            //   }
            // })
          }
        })
      }
    })
  }
  render() {
    const { isDriverLicense, email, phone, realEstateCategory, education, marriage, childrenSum, childrenStatus, livesProvince, livesCity, livesCountry, livesAddress,
      companyName, yearsWorking, jobYears, entryUnitTime, annualIncome, unitPhoneNumber, companyProvince, companyCity, companyCounty, companyAddress,
      emailError, phoneError, realEstateCategoryError, educationError, marriageError, childrenSumError, childrenStatusError, liveAddrError, livesAddrDetailsError,
      companyNameError, yearsWorkingError, jobYearsError, annualIncomeError, entryUnitTimeError, unitPhoneNumberError, companyAddrError, companyAddrDetailsError } = this.state;
    const { windowHeight } = this.props.systemInfo;
    return (
      <View className="base-card-page">
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${windowHeight - 60}px` }}
        >
          <View className="card-body">
            {/* 邮箱 */}
            <CInput
              name='email'
              defaultValue={email}
              label="邮箱"
              rules={[{
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:@"]+(\.[^<>()\[\]\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/,
                message: '请输入正确的邮箱!'
              }]}
              error={emailError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'emailError', valueKey: 'email' })}
            />

            {/* 微信号 */}
            <CInput
              name='realEstateCategory'
              defaultValue={realEstateCategory}
              label="微信号"
              rules={[{
                required: true,
                pattern: /^([a-zA-Z0-9]{5,19})+$/,
                message: '请输入正确的微信号!'
              }]}
              error={realEstateCategoryError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'realEstateCategoryError', valueKey: 'realEstateCategory' })}
            />
            {/* 手机号 */}
            <CInput
              name='phone'
              defaultValue={phone}
              label="手机号"
              type="number"
              rules={[{
                required: true,
                pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
                message: '请输入正确的手机号!'
              }]}
              error={phoneError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'phoneError', valueKey: 'phone' })}
            />
            <View className="effectivene-list">
              <Text className="title">驾照情况</Text>
              <RadioGroup
                name={isDriverLicense ? '0' : '1'}
                onChange={this.driverLicenseChange}
              >
                <Radio value={'0'} color="#283282" checked={isDriverLicense ? true : false}>有</Radio>
                <Radio value={'1'} color="#283282" className="radio" checked={isDriverLicense ? false : true} >无</Radio>
              </RadioGroup>
            </View>
            <View className="flex-row">
              <View className="col">
                {/* 申请人学历 */}
                <BasePicker
                  label="学历"
                  defaultValue={education}
                  error={educationError}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择学历!'
                  }]}
                  range={[{ name: '硕士研究生及以上' }, { name: '大学本科' }, { name: '大学专科' }, { name: '中专' }, { name: '高中' }, { name: '其他' }]}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'educationError', valueKey: 'education' })}
                />
              </View>
              {/* 婚姻状况 */}
              <View className="col-right">
                <BasePicker
                  label="婚姻状况"
                  defaultValue={marriage}
                  error={marriageError}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择婚姻状况!'
                  }]}
                  range={[{ name: '未婚' }, { name: '已婚' }, { name: '丧偶' }, { name: '离异' }]}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'marriageError', valueKey: 'marriage' })}
                />
              </View>
            </View>

            <View className="flex-row">
              <View className="col">
                {/* 家庭人数 */}
                <CInput
                  name='childrenSum'
                  defaultValue={childrenSum}
                  label="家庭人口数量"
                  rules={[{
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: '请输入家庭人口数量'
                  }]}
                  type="number"
                  error={childrenSumError}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'childrenSumError', valueKey: 'childrenSum' })}
                />
              </View>
              {/* 子女数量 */}
              <View className="col-right">
                <BasePicker
                  label="子女数量"
                  defaultValue={childrenStatus}
                  error={childrenStatusError}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择学历!'
                  }]}
                  range={[{ name: '无' }, { name: '1个' }, { name: '2个' }, { name: '2个以上' }]}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'childrenStatusError', valueKey: 'childrenStatus' })}
                />
              </View>
            </View>
            <Addr
              label="现居住地址"
              defaultValue={(livesProvince || livesCity || livesCountry) ? `${livesProvince}/${livesCity}/${livesCountry}` : ''}
              error={liveAddrError}
              rules={[{
                required: true,
                message: '请选择现居住地址!'
              }]}
              onChange={(obj) => this.onChangeAddr({ ...obj })}
            />
            {/* 详细地址 */}
            <CInput
              name='livesAddress'
              defaultValue={livesAddress}
              label="详细地址"
              rules={[{
                required: true,
                pattern: /^\s*\S{1,}\s*$/,
                message: '请输入详细地址!'
              }]}
              // trigger='onBlur'
              error={livesAddrDetailsError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'livesAddrDetailsError', valueKey: 'livesAddress' })}
            />
            {/* 公司名称 */}
            <CInput
              name='companyName'
              defaultValue={companyName}
              label="公司名称"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '请输入正确的公司名称!'
              }]}
              error={companyNameError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'companyNameError', valueKey: 'companyName' })}
            />

            <View className="flex-row">
              <View className="col">
                {/*  工龄（年）*/}
                <CInput
                  name='yearsWorking'
                  defaultValue={yearsWorking}
                  label="工龄（年）"
                  rules={[{
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: '请输入工龄'
                  }]}
                  type="number"
                  error={yearsWorkingError}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'yearsWorkingError', valueKey: 'yearsWorking' })}
                />
              </View>
              {/* 现公司工作年限 */}
              <View className="col-right">
                <BasePicker
                  label="现公司工作年限"
                  defaultValue={jobYears}
                  error={jobYearsError}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择工作年限!'
                  }]}
                  range={[{ name: '0-6个月' }, { name: '6-12个月' }, { name: '12-24个月' }, { name: '24个月及以上' }]}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'jobYearsError', valueKey: 'jobYears' })}
                />
              </View>
            </View>

            <View className="flex-row">
              <View className="col">
                {/* 个人税后月收入(元) */}
                <CInput
                  name='annualIncome'
                  defaultValue={annualIncome}
                  label="个人税后月收入(元)"
                  rules={[{
                    required: true,
                    pattern: /^[0-9]*$/,
                    message: '请输入个人税后月收入'
                  }]}
                  type="number"
                  error={annualIncomeError}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'annualIncomeError', valueKey: 'annualIncome' })}
                />
              </View>
              {/* 进入单位时间 */}
              <View className="col-right">
                <DatePicker
                  label="进入单位时间"
                  defaultValue={entryUnitTime}
                  error={entryUnitTimeError}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择进入单位时间!'
                  }]}
                  end={moment().format('YYYY-MM-DD')}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'entryUnitTimeError', valueKey: 'entryUnitTime' })}
                />
              </View>
            </View>
            {/* 单位电话 */}
            <CInput
              name='unitPhoneNumber'
              defaultValue={unitPhoneNumber}
              label="单位电话"
              rules={[{
                required: true,
                pattern: /^[0-9]*$/,
                message: '请输入单位电话！'
              }]}
              type="number"
              error={unitPhoneNumberError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'unitPhoneNumberError', valueKey: 'unitPhoneNumber' })}
            />

            <Addr
              label="公司地址"
              defaultValue={(companyProvince || companyCity || companyCounty) ? `${companyProvince}/${companyCity}/${companyCounty}` : ''}
              error={companyAddrError}
              rules={[{
                required: true,
                message: '请选择公司地址!'
              }]}
              onChange={(obj) => this.onChangeCompanyAddr({ ...obj })}
            />
            {/* 公司详细地址 */}
            <CInput
              name='companyAddress'
              defaultValue={companyAddress}
              label="详细地址"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '请输入详细地址!'
              }]}
              trigger='onBlur'
              error={companyAddrDetailsError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'companyAddrDetailsError', valueKey: 'companyAddress' })}
            />
          </View>
        </ScrollView>
        <View className="btn-bottom">
          <AtButton type='primary' onClick={this.save}>保存</AtButton>
        </View>
      </View>
    );
  }
}

export default IdCard;
