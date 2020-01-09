import Taro, { Component } from '@tarojs/taro';
import { View, Textarea, ScrollView } from '@tarojs/components';
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import CInput from '../../components/Input';
import Addr from '../../components/Addr';
import { InitStateProps } from '../../models/report';
import { SystemInfoProps } from '../../interface/common'
import './index.scss';
type IState = {
  contactName: string;
  contactNameError: boolean;
  contactPhone: string;
  contactPhoneError: boolean;
  acceptAddress: string;
  acceptAddressError: boolean;
  bak3: string;
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
class CarMortgage extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '车辆抵押',
  }
  constructor(props) {
    super(props)
    this.state = {
      contactName: '',
      contactNameError: false,
      contactPhone: '',
      contactPhoneError: false,
      acceptAddress: '', 
      acceptAddressError: false,
      bak3: ''
    }
  }
  componentDidMount = async () => {
    const { dispatch } = this.props;
    
  }

  save = () => {
 
  }

  onChange = (obj) => {
    const { error, value, valueKey, errorKey } = obj;
    this.setState({
      [`${errorKey}`]: error,
      [`${valueKey}`]: value
    })
  }
  onInputChange = (e) => {
    const { value } = e.detail
    this.setState({
      bak3: value
    })
  }

  render() {
    
    const { windowHeight } = this.props.systemInfo;
    const { contactName, contactNameError, contactPhone, contactPhoneError, acceptAddress, acceptAddressError, bak3 } = this.state;
    const { name, carNo, frameNumber, licenseProvince, valuationCity, licenseCounty, contactCompany   } = this.props
    return (
      <View className="gps-install">
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${windowHeight - 60}px` }}
        >
          <View className="content">
            <CInput
              name='clientName'
              defaultValue={name}
              label="姓名"
              rules={[{
                required: true,
                message: '姓名!'
              }]}
              disabled={true}
            />
            <CInput
              name='carNo'
              defaultValue={carNo}
              label="车牌号"
              rules={[{
                required: true,
                message: '车牌号!'
              }]}
              disabled={true}
            />
            <CInput
              name='frameNumber'
              defaultValue={frameNumber}
              label="车架号"
              rules={[{
                required: true,
                message: '车架号!'
              }]}
              disabled={true}
            />
            <Addr
              label="上牌地址"
              defaultValue={(licenseProvince || valuationCity || licenseCounty) ? `${licenseProvince}/${valuationCity}/${licenseCounty}` : ''}
              rules={[{
                required: true,
                message: '请选择公司地址!'
              }]}
            />
            <CInput
              name='contactName'
              defaultValue={contactName}
              label="抵押对接人姓名"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '请输入抵押对接人姓名！'
              }]}
              error={contactNameError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactNameError', valueKey: 'contactName' })}
            />
            <CInput
              name='contactPhone'
              defaultValue={contactPhone}
              label="抵押对接人手机号"
              rules={[{
                required: true,
                pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
                message: '请输入抵押对接人手机号！'
              }]}
              type="number"
              error={contactPhoneError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactPhoneError', valueKey: 'contactPhone' })}
            />
            <CInput
              name='contactCompany'
              defaultValue={contactCompany}
              label="抵押权人公司名字"
              rules={[{
                required: true,
                // pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
                message: '请输入抵押对接人手机号！'
              }]}
            />
            <CInput
              name='acceptAddress'
              defaultValue={acceptAddress}
              label="回寄身份证地址"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '请输入回寄身份证地址！'
              }]}
              error={acceptAddressError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'acceptAddressError', valueKey: 'acceptAddress' })}
            />
            <Textarea
              value={bak3}
              autoHeight
              onInput={this.onInputChange}
              className="textarea"
              placeholder="描述"
            />
          </View>
        </ScrollView>
        <View className="btn-bottom">
          <AtButton type='primary'  onClick={this.save}>保存</AtButton>
        </View>
      </View>
    );
  }
}

export default CarMortgage;
