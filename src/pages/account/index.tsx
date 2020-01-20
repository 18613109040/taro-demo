import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtAvatar, AtList, AtListItem } from 'taro-ui';
import { connect } from '@tarojs/redux';
import './index.scss';
type IState = {}
type IProps = {
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
  dropOut = () => {
    Taro.reLaunch({
      url: '/pages/login/index'
    })
  }
  render() {
    const { userInfo } = this.props;
    const { realName, userName } = userInfo;
    return (
      <View className="account-page">
        <View >
          <Image className="bg-avatar"  />
          <View className="user-info">
            <View className="avatar">
              <AtAvatar size="large" circle text={realName} />
            </View>
            <View className="user-name"><Text>{userName}</Text></View>
            <View className="real-name"><Text>{realName}</Text></View>
            <View className="status row row__align--center">
              <View className="at-col">
                <View className="title"><Text>提交</Text></View>
                <View className="number"><Text>100</Text></View>
              </View>
              <View className="at-col">
                <View className="title"><Text>完成</Text></View>
                <View className="number"><Text>100</Text></View>
              </View>
              <View className="at-col">
                <View className="title"><Text>退回</Text></View>
                <View className="number"><Text>100</Text></View>
              </View>
            </View>
          </View>
        </View>
        <View className="oprater">
          <AtList hasBorder={false}>
            <AtListItem hasBorder={false} title='退出登录' arrow='right' onClick={this.dropOut} />
          </AtList>
        </View>
      </View>
    );
  }
}

export default Account;
