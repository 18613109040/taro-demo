import Taro, { Component, ComponentClass } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
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
@connect(({ home, common }) => ({
  steps: home.steps,
  form: home.form,
  systemInfo: common.systemInfo,
  userInfo: common.userInfo
}))
class Home extends Component<IProps, IState> {
  config = {
    navigationBarTitleText: 'home',
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
      url: '/pages/report/index'
    })
  }
  render() {

    return (
      <View className="home-page">
        <View className="add-place" onClick={this.addApply}>
          <AtIcon value='add-circle' size='30' color='#283282' />
          <Text className="text">新增进件申请</Text>
        </View>
      </View>
    );
  }
}

export default Home as ComponentClass<IProps, IState>;
