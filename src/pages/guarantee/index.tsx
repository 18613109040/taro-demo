import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import CInput from '../../components/Input';
import BasePicker from '../../components/BasePicker'
import Addr from '../../components/Addr';
import { InitStateProps } from '../../models/report';

import './index.scss';
type IState = {
  name: string; //担保姓名
  nameError: boolean;
  relationship: string; //与担保人关系
  relationshipError: boolean;
  phone: string; //电话号码
  phoneError: boolean;
  cardId: string; // 身份证号
  cardIdError: boolean;
  email: string; // 邮箱
  emailError: boolean;
  liveProvince: string; //现居住省
  liveCity: string; // 市
  liveArea: string; //区
  liveAddrError: boolean;
  address: string; //详细地址
  addressError: boolean;
  companyName: string; //公司名称
  companyNameError: boolean;
  companyPhone: string; //公司电话
  companyPhoneError: boolean,
  annualIncome: number | string; //月收入
  annualIncomeError: boolean;
  province: string; //公司省
  city: string; //公司市
  area: string; //区
  companyAddrError: boolean;
  companyAddress: string; //详细地址
  companyAddrDetailsError: boolean;
}
type IProps = {
  report: InitStateProps;
  dispatch?: any;
}
@connect(({ report }) => ({
  report: report
}))
class Guarantee extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '担保人信息',
  }
  constructor(props) {
    super(props)
    const { clGuaranteeInfoListStr } = props.report.formData;
    const { name, relationship, phone, cardId, email, liveProvince, liveCity, liveArea, address,
      companyName, companyPhone, annualIncome, province, city, area,  companyAddress    } = clGuaranteeInfoListStr;
    this.state = {
      name: name || '', //担保姓名
      nameError: false,
      relationship: relationship||'', //与担保人关系
      relationshipError: false,
      phone: phone||'', //电话号码
      phoneError: false,
      cardId: cardId||'',// 身份证号
      cardIdError: false,
      email: email|| '', // 邮箱
      emailError: false,
      liveProvince: liveProvince ||'', //现居住省
      liveCity: liveCity|| '',// 市
      liveArea: liveArea||'', //区
      liveAddrError: false,
      address: address||'', //详细地址
      addressError: false,
      companyName: companyName||'', //公司名称
      companyNameError: false,
      companyPhone: companyPhone||'', //公司电话
      companyPhoneError: false,
      annualIncome: annualIncome||'',//月收入
      annualIncomeError: false,
      province: province||'', //公司省
      city: city||'', //公司市
      area: area||'', //区
      companyAddrError: false,
      companyAddress: companyAddress||'', //详细地址
      companyAddrDetailsError: false
    }
  }
  componentDidMount = () => {

  }
  onChange = (obj) => {
    const { error, value, valueKey, errorKey } = obj;
    this.setState({
      [`${errorKey}`]: error,
      [`${valueKey}`]: value
    })
  }
  save = () => {
    const { name, phone, relationship, cardId, email, liveProvince, liveCity, liveArea, address, companyName, companyPhone, annualIncome, province, city, area, companyAddress,
      nameError, relationshipError, phoneError, cardIdError, emailError, liveAddrError, addressError, companyNameError, companyPhoneError, annualIncomeError, companyAddrError, companyAddrDetailsError } = this.state;
    if (!nameError && !relationshipError && !phoneError && !cardIdError && !emailError && !liveAddrError && !addressError && !companyNameError && !companyPhoneError && !annualIncomeError && !companyAddrError && !companyAddrDetailsError) {
      Taro.navigateBack()
      const { dispatch } = this.props;
      dispatch({
        type: 'report/setFormData',
        payload: {
          clGuaranteeInfoListStr: { name, phone, relationship, cardId, email, liveProvince, liveCity, liveArea, address, companyName, companyPhone, annualIncome, province, city, area, companyAddress }
        }
      })
    }
  }
  onChangeAddr = (obj) => {
    const { error, value } = obj;
    const { province, city, area } = this.state;
    if (!province && !city && !area) {
      this.setState({
        liveAddrError: error,
        province: value[0].name,
        city: value[1].name,
        area: value[2].name,
        liveProvince: value[0].name,
        liveCity: value[1].name,
        liveArea: value[2].name,
      })
    } else {
      this.setState({
        liveAddrError: error,
        liveProvince: value[0].name,
        liveCity: value[1].name,
        liveArea: value[2].name,
      })
    }
  }
  onChangeCompanyAddr = (obj) => {
    const { error, value } = obj;
    this.setState({
      companyAddrError: error,
      province: value[0].name,
      city: value[1].name,
      area: value[2].name,
    })
  }
  render() {
    const { marriage } = this.props.report.formData
    const { name, phone, relationship, cardId, email, liveProvince, liveCity, liveArea, address, companyName, companyPhone, annualIncome, province, city, area, companyAddress,
      nameError, relationshipError, phoneError, cardIdError, emailError, liveAddrError, addressError, companyNameError, companyPhoneError, annualIncomeError, companyAddrError, companyAddrDetailsError } = this.state;

    const relationshipOptions = marriage ? [{ name: '配偶' }, { name: '父母' }, { name: '子女' }, { name: '亲戚' }, { name: '朋友' }] : [{ name: '父母' }, { name: '子女' }, { name: '亲戚' }, { name: '朋友' }]

    return (
      <View className="guarantee-card-page">
        {/* 姓名 */}
        <View className="flex-row">
          <View className="col">
            <CInput
              name='name'
              defaultValue={name}
              label="姓名"
              rules={[{
                required: true,
                pattern: /^(([\u4e00-\u9fff]{2,4})|([a-z\.\s\,]{2,50}))$/i,
                message: '请输入联系人姓名!'
              }]}
              error={nameError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'nameError', valueKey: 'name' })}
            />
          </View>
          <View className="col-right">
            <BasePicker
              label="与担保人关系"
              defaultValue={relationship}
              error={relationshipError}
              rules={[{
                required: true,
                message: '请选择与担保人关系!'
              }]}
              range={relationshipOptions}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'relationshipError', valueKey: 'relationship' })}
            />
          </View>
        </View>
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
        <CInput
          name='cardId'
          defaultValue={cardId}
          label="身份证号"
          rules={[{
            required: true,
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            message: '请输入正确的身份证号!'
          }]}
          type="idcard"
          trigger='onChange'
          error={cardIdError}
          onChange={(obj) => this.onChange({ ...obj, errorKey: 'cardIdError', valueKey: 'cardId' })}
        />
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
        <Addr
          label="现居住地址"
          defaultValue={(liveProvince || liveCity || liveArea) ? `${liveProvince}/${liveCity}/${liveArea}` : ''}
          error={liveAddrError}
          rules={[{
            required: true,
            message: '请选择现居住地址!'
          }]}
          onChange={(obj) => this.onChangeAddr({ ...obj })}
        />
        {/* 详细地址 */}
        <CInput
          name='address'
          defaultValue={address}
          label="详细地址"
          rules={[{
            required: true,
            pattern: /^\s*\S{2,}\s*$/,
            message: '请输入详细地址!'
          }]}
          trigger='onBlur'
          error={addressError}
          onChange={(obj) => this.onChange({ ...obj, errorKey: 'addressError', valueKey: 'address' })}
        />
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
        <CInput
          name='companyPhone'
          defaultValue={companyPhone}
          label="单位电话"
          rules={[{
            required: true,
            pattern: /^[0-9]*$/,
            message: '请输入单位电话！'
          }]}
          type="number"
          error={companyPhoneError}
          onChange={(obj) => this.onChange({ ...obj, errorKey: 'companyPhoneError', valueKey: 'companyPhone' })}
        />
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
        <Addr
          label="公司地址"
          defaultValue={(province || city || area) ? `${province}/${city}/${area}` : ''}
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

        <AtButton type='primary' onClick={this.save}>保存</AtButton>
      </View>
    );
  }
}

export default Guarantee;
