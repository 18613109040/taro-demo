import Taro, { PureComponent, ComponentClass, Config } from '@tarojs/taro';
import { View, Text, ScrollView, Label } from '@tarojs/components';
import { AtIcon, AtButton, AtForm, AtAvatar, AtGrid } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { SystemInfoProps } from '../../interface/common'
import './index.scss';

type IState = {}
type IProps = {
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
  config: Config= {
    navigationBarTitleText: '威武金融',
    navigationBarBackgroundColor: "#4984FD",
    navigationBarTextStyle: 'white'
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
    const { userInfo } = this.props;
    const { realName, userName } = userInfo;
    return (
      <View className="home-page">
        <View className="bg">
          <View className="avatar">
            <AtAvatar circle text={realName} />
          </View>
          <View className="real-name">
            <Text>{userName}</Text>
          </View>
        </View>

        <View className="at-row at-row__align--center">
          <View className="">
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
            <View>
              <Text></Text>
            </View>
          </View>
        </View>

        <View className="add-place" onClick={this.addApply}>
          <AtIcon value='add-circle' size='30' color='#fff' />
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
