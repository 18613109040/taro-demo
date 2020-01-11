import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon, AtButton, AtForm, AtAvatar, AtGrid } from 'taro-ui';
import { connect } from '@tarojs/redux';
import './index.scss';
type IState = {}
type IProps =  {
  userInfo: any;
}
@connect(({ common }) => ({
  userInfo: common.userInfo
}))
class Account extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '我的',
  }

  componentDidMount = () => {

  }

  render() {
    const { userInfo } = this.props;
    const { realName, userName } = userInfo;
    return (
      <View className="account-page">
        <View >
          <Image className="bg-avatar" src={require('../../images/account/bg.png')}/>
          <View className="">
            <AtAvatar size="large" circle text={realName} />
          </View>
          <View><Text></Text></View>
          <View><Text></Text></View>
        </View>
        <View></View>
      </View>
    );
  }
}

export default Account;
