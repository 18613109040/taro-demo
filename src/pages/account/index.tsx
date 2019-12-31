import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtIcon } from "taro-ui"
import { connect } from '@tarojs/redux';
import './index.scss';
type IState = {}
type IProps =  {
  
}
@connect(({ }) => ({

}))
class Account extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '我的',
  }

  componentDidMount = () => {

  }

  // 小程序上拉加载
  onReachBottom() {

  }
  goToUserList=()=>{
    Taro.navigateTo({
      url: '/pages/userlist/index'
    })
  }
  render() {
    return (
      <View className="account-page">
        <View className=""></View>
        <View></View>
      </View>
    );
  }
}

export default Account;
