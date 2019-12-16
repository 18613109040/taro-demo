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
class UserList extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '用户列表',
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
      <View className="user-list">
        <AtButton className="add-button">新增用户信息</AtButton>
        <AtListItem
          title='张三'
          note="身份证 342921010000444"
          extraThumb={require('../../images/account/eidt.png')}
          onClick={this.goToUserInfo}
        >
        </AtListItem>
        <AtListItem
          title='李四'
          note="身份证 342921010000444"
          extraThumb={require('../../images/account/eidt.png')}
        >
        </AtListItem>
      </View>
    );
  }
}

export default UserList;
