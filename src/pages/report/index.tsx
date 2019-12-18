import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtIcon, AtButton, AtSteps  } from "taro-ui"
import { connect } from '@tarojs/redux';
import { InitStateProps } from '../../models/report';
import './index.scss';
type IState = {}
type IProps = {
  report: InitStateProps;
  dispatch?: any;
}
@connect(({ report }) => ({
  report
}))
class Report extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '新增申请',
  }

  componentDidMount = () => {

  }

  // 小程序上拉加载
  onReachBottom() {

  }

  onChangeStep = () => {

  }
  idCardinfo = () => {
    Taro.navigateTo({
      url: '/pages/idcard/index'
    })
  }
  render() {
    const { steps } = this.props.report;
    return (
      <View className="report-page">
        <View className="step">
          <AtSteps
            items={steps}
            current={0}
            onChange={this.onChangeStep}
          />
        </View>
        
        <View className="list">
          <AtListItem  title='身份证信息' extraText='添加' onClick={this.idCardinfo} />
        </View>
      </View>
    );
  }
}

export default Report;
