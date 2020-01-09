import Taro, { Component } from '@tarojs/taro';
import { View, Text, Picker, Textarea, ScrollView } from '@tarojs/components';
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import moment from 'moment'
import CInput from '../../components/Input';
import BasePicker from '../../components/BasePicker'
import DatePicker from '../../components/DatePicker'

import ListItem from '../../components/ListItem'
import { InitStateProps } from '../../models/report';
import { SystemInfoProps } from '../../interface/common'
import './index.scss';
type IState = {
  clientName: string;
  cardNum: string;
  province: string;
  city: string;
  area: string;
  areaId: string;
  serviceAddress: string;
  contactTel: string;
  contactPerson: string;
  type: string;
  value: string;
  expectTime: string;
  orderRemark: string;
  addrError: boolean;
  contactTelError: boolean;
  serviceAddressError: boolean;
  contactPersonError: boolean;
  typeError: boolean;
  expectTimeError: boolean;
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
class GpsInstall extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: 'GPS安装',
  }
  constructor(props) {
    super(props)
    this.state = {
      clientName: '',
      cardNum: '',
      province: '',
      city: '',
      area: '',
      areaId: '',
      serviceAddress: '',
      contactTel: '',
      contactPerson: '',
      type: '',
      value: '',
      expectTime: '',
      orderRemark: '',
      addrError: false,
      contactTelError: false,
      serviceAddressError: false,
      contactPersonError: false,
      typeError: false,
      expectTimeError: false
    }
  }
  componentDidMount = async () => {
    const { dispatch } = this.props;
    const { orderId } = this.$router.params
    const provinces = await dispatch({
      type: 'report/getProvinceAction',
      payload: {
      }
    })
    dispatch({
      type: 'report/getGpsInstallInfoAction',
      payload: {
        id: '20200106111618154' // orderId
      }
    })
    
    this.getAddrData(provinces[0].id)

  }
  getAddrData = async (provinceId) => {
    const { dispatch } = this.props;
    const citys = await dispatch({
      type: 'report/getCitysAction',
      payload: {
        pid: provinceId
      }
    })
    await dispatch({
      type: 'report/getAreasAction',
      payload: {
        pid: citys[0].id
      }
    })
  }
  save = () => {
    const { province, city, area, serviceAddress, contactTel, contactPerson, type, expectTime, addrError, contactTelError, serviceAddressError, contactPersonError, typeError } = this.state;
    if(province&&city&&area&&serviceAddress&&contactTel&&contactPerson&&type&&expectTime && !addrError && !contactTelError && !serviceAddressError && !contactPersonError&& !typeError){

    }
    console.dir('save')
  }
  onColumnChange = (e) => {
    const { column, value } = e.detail;
    const { dispatch, report } = this.props;
    const { addr } = report;
    const { provinces, citys } = addr
    if (column === 0) {
      this.getAddrData(provinces[value].id)
    } else if (column === 1) {
      dispatch({
        type: 'report/getAreasAction',
        payload: {
          pid: citys[value].id
        }
      })
    }
  }
  onChange = (obj) => {
    const { error, value, valueKey, errorKey } = obj;
    this.setState({
      [`${errorKey}`]: error,
      [`${valueKey}`]: value
    })
  }
  remark = (e) => {
    const { value } = e.detail
    this.setState({
      orderRemark: value
    })
  }
  onAddrChange = (e) => {
    const { value } = e.detail
    const { addr } = this.props.report;
    const { provinces, citys, areas } = addr;
    this.setState({
      province: provinces[value[0]].name,
      city: citys[value[0]].name,
      area: areas[value[0]].name,
      areaId: areas[value[0]].id
    })
  }
  render() {
    const { clientName, cardNum, province, city, area, serviceAddress, contactTel, contactPerson, type, value, expectTime, orderRemark, addrError, contactTelError, serviceAddressError, contactPersonError, typeError, expectTimeError } = this.state;
    const disable: any = province&&city&&area&&serviceAddress&&contactTel&&contactPerson&&type&&expectTime
    const { addr } = this.props.report;
    const { provinces, citys, areas } = addr
    const { windowHeight } = this.props.systemInfo;
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
              defaultValue={clientName}
              label="客户姓名"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '客户姓名!'
              }]}
              disabled={true}
            />
            <CInput
              name='cardNum'
              defaultValue={cardNum}
              label="身份证号"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '身份证号!'
              }]}
              disabled={true}
            />
            <Picker
              onColumnChange={this.onColumnChange}
              mode='multiSelector'
              onChange={this.onAddrChange}
              range={[provinces, citys, areas]}
              rangeKey="name" >
              <ListItem
                label="地址"
                value={province && city && area ? `${province}/${city}/${area}` : ''}
                error={addrError}
                errorMsg="请选择地址">
              </ListItem>
            </Picker>
            <CInput
              name='serviceAddress'
              defaultValue={serviceAddress}
              label="服务地址"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '服务地址!'
              }]}
              error={serviceAddressError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'serviceAddressError', valueKey: 'serviceAddress' })}
            />
            <CInput
              name='contactPerson'
              defaultValue={contactPerson}
              label="联系人"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '联系人'
              }]}
              type="number"
              error={contactPersonError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactPersonError', valueKey: 'contactPerson' })}
            />
            <CInput
              name='contactTel'
              defaultValue={contactTel}
              label="联系电话"
              rules={[{
                required: true,
                pattern: /^[0-9]*$/,
                message: '联系电话'
              }]}
              type="number"
              error={contactTelError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactTelError', valueKey: 'contactTel' })}
            />
            <View className="flex-row">
              <View className="col">
                <BasePicker
                  label="车辆参数类型"
                  defaultValue={type}
                  error={typeError}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '车辆参数类型!'
                  }]}
                  range={[{ name: '车牌号' }]}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'typeError', valueKey: 'type' })}
                />
              </View>
              <View className="col-right">
                <CInput
                  name='value'
                  defaultValue={value}
                  label="车辆参数值"
                  rules={[{
                    required: true,
                    pattern: /^\s*\S{2,}\s*$/,
                    message: '车辆参数值'
                  }]}
                  disabled={true}
                />
              </View>
            </View>
            <DatePicker
              label="上门时间"
              defaultValue={expectTime}
              error={expectTimeError}
              rules={[{
                required: true,
                // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                message: '请选择上门时间!'
              }]}
              end={moment().format('YYYY-MM-DD')}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'expectTimeError', valueKey: 'expectTime' })}
            />

            <Textarea
              value={orderRemark}
              autoHeight
              onInput={this.remark}
              className="textarea"
              placeholder="备注"
            />
          </View>
        </ScrollView>
        <View className="btn-bottom">
          <AtButton type='primary' disabled={!disable} onClick={this.save}>保存</AtButton>
        </View>
      </View>
    );
  }
}

export default GpsInstall;
