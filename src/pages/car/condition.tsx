import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import moment from 'moment'
import CInput from '../../components/Input';
import BasePicker from '../../components/BasePicker'
import DatePicker from '../../components/DatePicker'
import { InitStateProps } from '../../models/report';
import './index.scss';
type IState = {
  powerCteType: string; // 动力系统类别 
  drivenDistance: number|string; //行驶里程（整数km）
  advanceOffer: number|string; //车商零售价（元）
  licenseProvince: string; // 省
  valuationCity: string;
  licenseCounty: string;

}
type IProps = {
  report: InitStateProps;
  dispatch?: any;
}
@connect(({ report }) => ({
  report: report
}))
class CarCondition extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '车况信息',
  }
  constructor(props) {
    super(props)
    // const { name, clCarInfoListStr }= props.report.formData;
    this.state = {
      powerCteType: '', // 动力系统类别 
      drivenDistance: '', //行驶里程（整数km）
      advanceOffer: '', //车商零售价（元）
      licenseProvince: '', // 省
      valuationCity: '',
      licenseCounty: ''
    }
  }
  componentDidMount = () => {

  }
  save = () => {
    
  }

  render() {
    const {  } = this.state;
    return (
      <View className="content-table-form">
        
        <View className="btn">
          <AtButton type='primary' onClick={this.save}>保存</AtButton>
        </View>

      </View>
    );
  }
}

export default CarCondition;
