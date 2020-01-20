import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Textarea, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getProvince, getCity, getCounty } from '@/utils/barea'
import moment from 'moment'
import { AtButton } from "taro-ui"
import CInput from '../../components/Input';
import BasePicker from '../../components/BasePicker'
import DatePicker from '../../components/DatePicker'
import ListItem from '../../components/ListItem'
import { InitStateProps } from '../../models/report'
import { SystemInfoProps } from '../../interface/common'
import './index.scss';
type IState = {
  provinces: any;
  citys: any;
  areas: any;
  province: string;
  provinceId: string;
  city: string;
  cityId: string;
  area: string;
  areaId: string;
  serviceAddress: string;
  contactTel: string;
  contactPerson: string;
  type: string;
  expectTime: string;
  time: string;
  timeError: boolean;
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
      provinces: getProvince(),
      citys: getCity('1'),
      areas: getCounty('100'),
      province: '',
      provinceId: '1',
      city: '',
      cityId: '1',
      area: '',
      areaId: '',
      serviceAddress: '',
      contactTel: '',
      contactPerson: '',
      type: '',
      expectTime: '',
      time: '',
      timeError: false,
      orderRemark: '',
      addrError: false,
      contactTelError: false,
      serviceAddressError: false,
      contactPersonError: false,
      typeError: false,
      expectTimeError: false,
      height: props.systemInfo.windowHeight
    }
  }
  componentDidMount = async () => {
    const { dispatch } = this.props;
    const { orderId } = this.$router.params;
    const query = Taro.createSelectorQuery();
    query.select('.btn-bottom').boundingClientRect();
    const { windowHeight } = Taro.getSystemInfoSync();
    query.exec((res) => {
      this.setState({
        height: windowHeight - res[0].height
      })
    });
    const info = await dispatch({
      type: 'report/getGpsInstallInfoAction',
      payload: {
        id: orderId 
      }
    })
    let date1 = ''
    let date2 = ''
    if (info.expectTime) {
      date1 = info.expectTime.split(' ')[0]
      date2 = info.expectTime.split(' ')[1]
    }
    // getProvince, getCity, getCounty 
    const { value, serviceAddress, contactTel, contactPerson, orderRemark, province, city, areaId } = info;
    let provinceName: any = {}
    let cityName: any = {}
    let areaName: any = {}
    if(province&&city&&areaId){
       provinceName = getProvince().find(item=> item.id == province);
       cityName = getCity(province).find(item=> item.id == city);    
       areaName = getCounty(city).find(item=> item.id == areaId);
    }
    this.setState({
      value,
      expectTime: date1,
      time: date2,
      serviceAddress,
      contactTel,
      contactPerson,
      type:  '车牌号',
      orderRemark,
      province: provinceName && provinceName.name || '',
      city: cityName && cityName.name || '',
      area: areaName && areaName.name || ''
    })
  }
  save = async () => {
    const { dispatch } = this.props;
    const { taskId, taskName, orderId } = this.$router.params
    const { province, city, area, areaId, provinceId, cityId, time, serviceAddress, contactTel, contactPerson, type, expectTime, timeError, orderRemark, addrError, contactTelError, serviceAddressError, contactPersonError, typeError } = this.state;
    const { gpsInstallInfo } = this.props.report;
    const { clilentName, cardNum, value } = gpsInstallInfo
    const { id } = gpsInstallInfo
    Taro.showLoading({
      title: '保存中...'
    })
    if (province && city && area && serviceAddress && contactTel && contactPerson && type && expectTime && time && !addrError && !timeError && !contactTelError && !serviceAddressError && !contactPersonError && !typeError) {
      const res = await dispatch({
        type: 'report/gpsAddAction',
        payload: {
          clilentName,
          cardNum,
          id: id ? id : '',
          collectClientInfoId: orderId,
          taskId,
          province: provinceId,
          city:cityId,
          taskName,
          areaId,
          serviceAddress,
          contactPerson,
          contactTel,
          type: 2, //@todo 车牌号码 
          value,
          expectTime: `${expectTime} ${time}`,
          orderRemark
        }
      })
      if (res.success) {
        Taro.hideLoading()
        Taro.navigateBack()
      } else {
        Taro.hideLoading()
        Taro.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
  onColumnChange = (e) => {
    const { column, value } = e.detail;
    const { provinces, citys } = this.state;
    const currentCitys: any = getCity(provinces[value].id)
    if (column === 0) {
      this.setState({
        citys: currentCitys,
        areas: getCounty(currentCitys[0].id)
      })
    } else if (column === 1) {
      this.setState({
        areas: getCounty(citys[value].id)
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
    const { provinces, citys, areas } = this.state;
    this.setState({
      province: provinces[value[0]].name,
      provinceId: provinces[value[0]].id,
      city: citys[value[1]].name,
      cityId: citys[value[1]].id,
      area: areas[value[2]].name,
      areaId: areas[value[2]].id
    })
  }
  render() {
    const {  gpsInstallInfo } = this.props.report;
    const { clilentName, cardNum, value } = gpsInstallInfo
    const { height, province, city, area, serviceAddress, contactTel, contactPerson,
      provinces, citys, areas,
      type, expectTime, orderRemark, addrError, contactTelError, serviceAddressError, 
      contactPersonError, typeError, expectTimeError, time, timeError } = this.state;
    const disable: any = province && city && area && serviceAddress && contactTel && contactPerson && type && expectTime  && time    
    return (
      <View className="gps-install">
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${height}px` }}
        >
          <View className="content">
            <CInput
              name='clilentName'
              defaultValue={clilentName}
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
                  // error={valueError}
                  // onChange={(obj) => this.onChange({ ...obj, errorKey: 'valueError', valueKey: 'value' })}
                  disabled={true}
                />
              </View>
            </View>
            <View className="flex-row">
              <View className="col">
                <DatePicker
                  label="上门日期"
                  defaultValue={expectTime || date1}
                  error={expectTimeError}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择上门日期!'
                  }]}
                  end={moment().format('YYYY-MM-DD')}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'expectTimeError', valueKey: 'expectTime' })}
                />
              </View>
              <View className="col-right">
                <DatePicker
                  label="上门时间"
                  mode="time"
                  defaultValue={time || date2}
                  error={timeError}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择上门时间!'
                  }]}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'timeError', valueKey: 'time' })}
                />
              </View>
            </View>


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
