import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtIcon, AtButton, AtSteps  } from "taro-ui"
import { connect } from '@tarojs/redux';
import IdCardInfo from '../../components/IdCardInfo'
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
    const { steps, formData } = this.props.report;
    const { name } = formData

    return (
      <View className="report-page">
        <View className="step">
          {/* <AtSteps
            items={steps}
            current={0}
            onChange={this.onChangeStep}
          /> */}
        </View>
        
        <View className="list">
          <AtListItem
          iconInfo={{ 
            prefixClass: 'iconfont',
            size: 25,
            color: '#1D31AA',
            value: 'idcard'
          }}
          hasBorder={false}
          className="list-row-c" 
          title='身份证信息' 
          extraText={name?'编辑':'添加'} 
          onClick={this.idCardinfo} />
          { name && <IdCardInfo idCardData={formData}/>}
        </View>
      </View>
    );
  }
}

export default Report;
