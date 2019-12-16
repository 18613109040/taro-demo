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
class Report extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '用户信息',
  }

  componentDidMount = () => {

  }

  // 小程序上拉加载
  onReachBottom() {

  }
  addIdCard=()=> {
    Taro.navigateTo({
      url: '/pages/idcard/index'
    })
  }
  render() {
    return (
      <View className="report-page">
        <View className="report-card">
          <View className="card-row">
            <Text className="card-title">身份证信息</Text>
            <Text></Text>
          </View>
          <View className="add-button">
            <AtButton size='small' type="secondary" onClick={this.addIdCard}>添加</AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default Report;
