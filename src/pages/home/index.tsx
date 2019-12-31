import Taro, { PureComponent, ComponentClass } from '@tarojs/taro';
import { View, Text, ScrollView, Label } from '@tarojs/components';
import { AtIcon, AtButton, AtForm, AtAvatar, AtGrid } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { StepsProps } from './model'
import { FormProps } from '../../interface/form'
import { SystemInfoProps } from '../../interface/common'
import './index.scss';

type IState = {}
type IProps = {
  steps: Array<StepsProps>;
  form: Array<FormProps>;
  dispatch: any;
  systemInfo: SystemInfoProps;
  userInfo: any;
  common: any;
}
@connect(({ common }) => ({
  systemInfo: common.systemInfo,
  userInfo: common.userInfo
}))
class Home extends PureComponent<IProps, IState> {
  config = {
    navigationBarTitleText: '',
  };
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount = () => {


  };

  //分享
  // onShareAppMessage() {

  // }

  // 小程序上拉加载
  onReachBottom() {

  }
  addApply =() => {
    Taro.navigateTo({
      url: '/pages/prepare/index'
    })
  }
  render() {
    return (
      <View className="home-page">
        <View>
          <AtAvatar image='https://jdc.jd.com/img/200'/>
          <View>
            <View><Text>张三</Text></View>
            <View><Text></Text></View>
          </View>
          
        </View>
        <View className="add-place" onClick={this.addApply}>
          <AtIcon value='add-circle' size='30' color='#283282' />
          <Text className="text">进件快速申请</Text>
        </View>
        <View>
          <View></View>
          <View></View>
          <View></View>
        </View>
      </View>
    );
  }
}

export default Home as ComponentClass<IProps, IState>;
