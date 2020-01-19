import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
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
  licenseOwner: string; //* 行驶证车主名 
  useType: string; //用途 
  useTypeError: boolean;
  carType: string; // 车型
  carTypeError: boolean;
  carColour: string; //车辆颜色
  carColourError: boolean;
  carNo: string; // 车牌号
  carNoError: boolean;
  carBrand: string; // 品牌
  carBrandError: boolean;
  factoryDay: string; //出厂日期
  factoryDayError: boolean;
  carFristLoginDay: string; //初次登记日期
  carFristLoginDayError: boolean;
  engineNo: string; //发动机号
  engineNoError: boolean;
  newCarPrice: number | string; //新车指导价(元) 
  newCarPriceError: boolean;
  carSystem: string; //车系 
  carSystemError: boolean;
  carDisplacement: number | string; //排量(L)
  carDisplacementError: boolean;
  frameNumber: string; //车架号
  frameNumberError: boolean;

  powerCteType: string; // 动力系统类别
  powerCteTypeError: boolean;
  drivenDistance: number | string; //行驶里程（整数km）
  drivenDistanceError: boolean;
  advanceOffer: number | string; //车商零售价（元）
  advanceOfferError: boolean;
  licenseProvince: string; // 省
  valuationCity: string;
  licenseCounty: string;
  addrError: boolean;
  [key: string]: string | boolean | Array<any> | number;
}
type IProps = {
  report: InitStateProps;
  systemInfo: SystemInfoProps;
  dispatch?: any;
  isTask: boolean;

}
@connect(({ report, common }) => ({
  report: report,
  systemInfo: common.systemInfo,
  isTask: common.isTask
}))
class CarBase extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '车辆信息',
  }
  constructor(props) {
    super(props)
    const { name, clCarInfoListStr } = props.report.formData;
    const { carType, useType, carBrand, carSystem, carColour, factoryDay, carFristLoginDay, carNo, carDisplacement, frameNumber, engineNo,
      newCarPrice, powerCteType, drivenDistance, advanceOffer, licenseProvince, valuationCity, licenseCounty } = clCarInfoListStr;
    this.state = {
      licenseOwner: name || '', //* 行驶证车主名 
      useType: useType || '', //用途 
      useTypeError: false,
      carType: carType || '',// 车型
      carTypeError: false,
      carColour: carColour || '',//车辆颜色
      carColourError: false,
      carNo: carNo || '', // 车牌号
      carNoError: false,
      carBrand: carBrand || '', // 品牌
      carBrandError: false,
      factoryDay: factoryDay || '', //出厂日期
      factoryDayError: false,
      carFristLoginDay: carFristLoginDay || '',//初次登记日期
      carFristLoginDayError: false,
      engineNo: engineNo || '', //发动机号
      engineNoError: false,
      newCarPrice: newCarPrice || '', //新车指导价(元) 
      newCarPriceError: false,
      carSystem: carSystem || '', //车系 
      carSystemError: false,
      carDisplacement: carDisplacement || '', //排量(L)
      carDisplacementError: false,
      frameNumber: frameNumber || '',//车架号
      frameNumberError: false,
      powerCteType: powerCteType || '', // 动力系统类别 
      powerCteTypeError: false,
      drivenDistance: drivenDistance || '', //行驶里程（整数km
      drivenDistanceError: false,
      advanceOffer: advanceOffer || '', //车商零售价（元）
      advanceOfferError: false,
      licenseProvince: licenseProvince || '', // 省
      valuationCity: valuationCity || '',
      licenseCounty: licenseCounty || '',
      addrError: false,
      height: props.systemInfo.windowHeight
    }
  }
  componentDidMount = () => {
    const query = Taro.createSelectorQuery();
    query.select('.btn-bottom').boundingClientRect();
    const { windowHeight } = Taro.getSystemInfoSync();
    query.exec((res) => {
      this.setState({
        height: windowHeight - res[0].height
      })
    });
  }
  save = () => {
    const { orderId } = this.$router.params
    const keys: Array<string> = ['licenseOwner', 'carType', 'useType', 'carBrand', 'carSystem', 'carColour', 'factoryDay', 'carFristLoginDay', 'carNo', 'frameNumber', 'powerCteType', 'drivenDistance', 'advanceOffer', 'licenseProvince', 'valuationCity', 'licenseCounty', 'newCarPrice', 'engineNo']
    const { licenseOwner, carType, useType, carBrand, carSystem, carColour, factoryDay, carFristLoginDay, carNo, carDisplacement, frameNumber, powerCteType, drivenDistance, advanceOffer, licenseProvince, valuationCity, licenseCounty, newCarPrice, engineNo } = this.state;
    let temp: IState = this.state;
    keys.map(key => {
      if (!this.state[key]) {
        if (key === 'licenseProvince' || key === 'valuationCity' || key === 'licenseCounty') {
          temp.addrError = true
        } else {
          temp[`${key}Error`] = true
        }
      }
    })
    this.setState({
      ...temp
    }, () => {
      const { carTypeError, useTypeError, carBrandError, carSystemError, carColourError, factoryDayError, carFristLoginDayError, carNoError, carDisplacementError, frameNumberError, powerCteTypeError, drivenDistanceError, advanceOfferError, addrError, newCarPriceError, engineNoError } = this.state;
      if (!carTypeError && !useTypeError && !carBrandError && !carSystemError && !carColourError && !factoryDayError && !carFristLoginDayError && !carNoError && !carDisplacementError && !frameNumberError && !powerCteTypeError && !drivenDistanceError && !advanceOfferError && !addrError && !newCarPriceError && !engineNoError) {
        const { dispatch } = this.props;
        dispatch({
          type: 'report/temporaryAction',
          payload: {
            id: orderId,
            updateStep: 2,
            clCarInfoListStr: JSON.stringify({ licenseOwner, carType, useType, carBrand, carSystem, carColour, factoryDay, carFristLoginDay, carNo, carDisplacement, frameNumber, powerCteType, drivenDistance, advanceOffer, licenseProvince, valuationCity, licenseCounty, newCarPrice, engineNo })
          }
        }).then(res => {
          if (res.success) {
            Taro.navigateBack()
            dispatch({
              type: 'report/setCarInfo',
              payload: {
                licenseOwner, carType, useType, carBrand, carSystem, carColour, factoryDay, carFristLoginDay, carNo, carDisplacement, frameNumber, powerCteType, drivenDistance, advanceOffer, licenseProvince, valuationCity, licenseCounty, newCarPrice, engineNo
              }
            })
          }
        })
      }
    })
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
    this.setState({
      addrError: error,
      licenseProvince: value[0].name,
      valuationCity: value[1].name,
      licenseCounty: value[2].name,
    })

  }
  render() {
    const { height, licenseOwner, carType, useType, carBrand, carSystem, carColour, factoryDay, carFristLoginDay, carNo, carDisplacement, frameNumber, powerCteType, drivenDistance, advanceOffer, licenseProvince, valuationCity, licenseCounty, newCarPrice, engineNo,
      carTypeError, useTypeError, carBrandError, carSystemError, carColourError, factoryDayError, carFristLoginDayError, carNoError, carDisplacementError, frameNumberError, powerCteTypeError, drivenDistanceError, advanceOfferError, addrError, newCarPriceError, engineNoError } = this.state;
    const { isTask, report } = this.props;
    const { authInfo, orderDetail: { primaryStatus } } = report;
    let disabled: boolean = true;
    if (isTask) {
      disabled = (!authInfo || (authInfo.clientInfo.includes('form_step2'))) ? false : true;
    } else {
      disabled = primaryStatus > 0 ? true : false;
    }
    return (
      <View className="content-table-form">
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${height}px` }}
        >
          <View className="card-body">
            <View className="flex-row">
              <View className="col">
                <CInput
                  name='licenseOwner'
                  defaultValue={licenseOwner}
                  label="行驶证车主名(必填)"
                  rules={[{
                    required: true,
                    pattern: /^(([\u4e00-\u9fff]{2,4})|([a-z\.\s\,]{2,50}))$/i,
                    message: '请输入联系人姓名!'
                  }]}
                  error={false}
                  disabled={true}
                />
              </View>
              <View className="col-right">
                <CInput
                  name='carType'
                  defaultValue={carType}
                  label="车型(必填)"
                  rules={[{
                    required: true,
                    pattern: /^\s*\S{2,}\s*$/,
                    message: '请输入车型!'
                  }]}
                  disabled={disabled}
                  error={carTypeError}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'carTypeError', valueKey: 'carType' })}
                />
              </View>
            </View>
            <View className="flex-row">
              <View className="col">
                <CInput
                  name='useType'
                  defaultValue={useType}
                  label="用途(必填)"
                  rules={[{
                    required: true,
                    pattern: /^\s*\S{2,}\s*$/,
                    message: '请输入用途!'
                  }]}
                  disabled={disabled}
                  error={useTypeError}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'useTypeError', valueKey: 'useType' })}
                />
              </View>
              <View className="col-right">
                <CInput
                  name='carBrand'
                  defaultValue={carBrand}
                  label="品牌(必填)"
                  rules={[{
                    required: true,
                    pattern: /^\s*\S{2,}\s*$/,
                    message: '请输入品牌!'
                  }]}
                  disabled={disabled}
                  error={carBrandError}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'carBrandError', valueKey: 'carBrand' })}
                />
              </View>
            </View>
            <View className="flex-row">
              <View className="col">
                <CInput
                  name='carSystem'
                  defaultValue={carSystem}
                  label="车系(必填)"
                  rules={[{
                    required: true,
                    pattern: /^\s*\S{2,}\s*$/,
                    message: '请输入车系!'
                  }]}
                  disabled={disabled}
                  error={carSystemError}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'carSystemError', valueKey: 'carSystem' })}
                />
              </View>
              <View className="col-right">
                <BasePicker
                  label="车辆颜色(必填)"
                  defaultValue={carColour}
                  error={carColourError}
                  rules={[{
                    required: true,
                    message: '请选择车辆颜色!'
                  }]}
                  disabled={disabled}
                  range={[{ name: '灰色' }, { name: '白色' }, { name: '棕色' }, { name: '黄色' }, { name: '红色' }, { name: '紫色' }, { name: '绿色' }, { name: '多彩色' }, { name: '黑色' }, { name: '银灰色' },
                  { name: '香槟色' }, { name: '橙色' }, { name: '粉红色' }, { name: '蓝色' }, { name: '咖啡色' }, { name: '其他' }]}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'carColourError', valueKey: 'carColour' })}
                />
              </View>
            </View>
            <View className="flex-row">
              <View className="col">
                <DatePicker
                  label="出厂日期(必填)"
                  defaultValue={factoryDay}
                  error={factoryDayError}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择出厂日期!'
                  }]}
                  disabled={disabled}
                  end={moment().format('YYYY-MM-DD')}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'factoryDayError', valueKey: 'factoryDay' })}
                />
              </View>
              <View className="col-right">
                <DatePicker
                  label="初次登记日期(必填)"
                  defaultValue={carFristLoginDay}
                  error={carFristLoginDayError}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择初次登记日期!'
                  }]}
                  disabled={disabled}
                  end={moment().format('YYYY-MM-DD')}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'carFristLoginDayError', valueKey: 'carFristLoginDay' })}
                />
              </View>
            </View>
            <View className="flex-row">
              <View className="col">
                <CInput
                  name='carNo'
                  defaultValue={carNo}
                  label="车牌号(必填)"
                  rules={[{
                    required: true,
                    pattern: /^\s*\S{2,}\s*$/,
                    message: '请输入车牌号!'
                  }]}
                  disabled={disabled}
                  error={carNoError}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'carNoError', valueKey: 'carNo' })}
                />
              </View>
              <View className="col-right">
                <CInput
                  name='carDisplacement'
                  defaultValue={carDisplacement}
                  label="排量(L)(选填)"
                  rules={[{
                    required: true,
                    pattern: /^\s*\S{1,}\s*$/,
                    message: '请输入排量!'
                  }]}
                  disabled={disabled}
                  type="digit"
                  error={carDisplacementError}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'carDisplacementError', valueKey: 'carDisplacement' })}
                />
              </View>
            </View>
            <View className="flex-row">
              <View className="col">
                <CInput
                  name='newCarPrice'
                  defaultValue={newCarPrice}
                  label="新车指导价(元)(必填)"
                  rules={[{
                    required: true,
                    pattern: /^\s*\S{2,}\s*$/,
                    message: '请输入新车指导价!'
                  }]}
                  disabled={disabled}
                  error={newCarPriceError}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'newCarPriceError', valueKey: 'newCarPrice' })}
                />
              </View>
              <View className="col-right">
                <CInput
                  name='engineNo'
                  defaultValue={engineNo}
                  label="发动机号(必填)"
                  rules={[{
                    required: true,
                    pattern: /^\s*\S{2,}\s*$/,
                    message: '请输入发动机号!'
                  }]}
                  disabled={disabled}
                  error={engineNoError}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'engineNoError', valueKey: 'engineNo' })}
                />
              </View>
            </View>
            <CInput
              name='frameNumber'
              defaultValue={frameNumber}
              label="车架号(必填)"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '请输入车架号!'
              }]}
              disabled={disabled}
              error={frameNumberError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'frameNumberError', valueKey: 'frameNumber' })}
            />
            <View className="flex-row">
              <View className="col">
                <BasePicker
                  label="动力系统类别(必填)"
                  defaultValue={powerCteType}
                  error={powerCteTypeError}
                  rules={[{
                    required: true,
                    message: '请选择动力系统类别!'
                  }]}
                  disabled={disabled}
                  range={[{ name: '传统动力' }]}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'powerCteTypeError', valueKey: 'powerCteType' })}
                />
              </View>
              <View className="col-right">
                <CInput
                  name='drivenDistance'
                  defaultValue={drivenDistance}
                  label="行驶里程(km) (必填)"
                  rules={[{
                    required: true,
                    pattern: /^\s*\S{1,}\s*$/,
                    message: '请输入行驶里程!'
                  }]}
                  disabled={disabled}
                  type="number"
                  error={drivenDistanceError}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'drivenDistanceError', valueKey: 'drivenDistance' })}
                />
              </View>
            </View>
            <Addr
              label="上牌地址(必填)"
              defaultValue={(licenseProvince || valuationCity || licenseCounty) ? `${licenseProvince}/${valuationCity}/${licenseCounty}` : ''}
              error={addrError}
              rules={[{
                required: true,
                // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                message: '请选择上牌地址!'
              }]}
              disabled={disabled}
              onChange={(obj) => this.onChangeAddr({ ...obj })}
            />
            <CInput
              name='advanceOffer'
              defaultValue={advanceOffer}
              label="车商零售价(元) (必填)"
              rules={[{
                required: true,
                pattern: /^\s*\S{1,}\s*$/,
                message: '请输入车商零售价!'
              }]}
              disabled={disabled}
              type="number"
              error={advanceOfferError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'advanceOfferError', valueKey: 'advanceOffer' })}
            />
          </View>
        </ScrollView>
        <View className="btn-bottom">
          <AtButton type='primary' disabled={disabled} onClick={this.save}>保存</AtButton>
        </View>

      </View>
    );
  }
}

export default CarBase;
