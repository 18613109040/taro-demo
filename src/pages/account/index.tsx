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
      <View className="home-page">
        <AtList>
          <AtListItem
            title='用户信息管理'
            arrow='right'
            iconInfo={{ prefixClass: 'iconfont' ,size: 32, color: '#283282', value: 'contact' }} 
            onClick={this.goToUserList}
          >
          </AtListItem>
        </AtList>
      </View>
    );
  }
}

export default Account;
