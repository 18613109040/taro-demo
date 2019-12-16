import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtIcon, AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import './index.scss';
type IState = {}
type IProps = {

}
@connect(({ }) => ({

}))
class UserInfo extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '用户信息',
  }

  componentDidMount = () => {

  }

  // 小程序上拉加载
  onReachBottom() {

  }
  goToUserInfo=()=> {
    
  }
  render() {
    return (
      <View className="user-info-page">
       
      </View>
    );
  }
}

export default UserInfo;
