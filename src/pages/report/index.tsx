import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtIcon, AtButton, AtSteps } from "taro-ui"
import { connect } from '@tarojs/redux';
import IdCardInfo from '../../components/IdCardInfo'
import BaseInfo from '../../components/BaseInfo'
import ContactInfo from '../../components/ContactInfo'
import GuaranteeInfo from '../../components/GuaranteeInfo'
import CarBaseInfo from '../../components/CarBaseInfo'
import { InitStateProps } from '../../models/report';
import './index.scss';
type IState = {
 
}
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
  constructor(props) {
    super(props)
    // this.state = {

    // }
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
  myInfo = () => {
    Taro.navigateTo({
      url: '/pages/base/index'
    })
  }
  contactInfo = () => {
    Taro.navigateTo({
      url: '/pages/contact/index'
    })
  }
  guaranteeInfo = () => {
    Taro.navigateTo({
      url: '/pages/guarantee/index'
    })

  }
  toCarInfo = () => {
    Taro.navigateTo({
      url: '/pages/car/base'
    })
  }
  next = () => {
    const { dispatch } = this.props;
    let { current } = this.props.report;
    dispatch({
      type: 'report/setSteps',
      payload: current
    })
  }
  renderStepContent = () => {
    const { report } = this.props;
    const { formData, current } = report;
    const { name, phone, contactName1, clGuaranteeInfoListStr, clCarInfoListStr } = formData
    if (current === 0) {
      return (
        <View>
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
              title='身份证信息(必填)'
              extraText={name ? '编辑' : '添加'}
              onClick={this.idCardinfo} />
            {name && <IdCardInfo data={formData} />}
          </View>
          <View className="list">
            <AtListItem
              iconInfo={{
                // prefixClass: 'iconfont',
                size: 25,
                color: '#1D31AA',
                value: 'user'
              }}
              hasBorder={false}
              className="list-row-c"
              title='个人信息(必填)'
              extraText={phone ? '编辑' : '添加'}
              onClick={this.myInfo} />
            {phone && <BaseInfo data={formData} />}
          </View>

          <View className="list">
            <AtListItem
              iconInfo={{
                // prefixClass: 'iconfont',
                size: 25,
                color: '#1D31AA',
                value: 'phone'
              }}
              hasBorder={false}
              className="list-row-c"
              title='联系人信息(必填)'
              extraText={contactName1 ? '编辑' : '添加'}
              onClick={this.contactInfo} />
            {contactName1 && <ContactInfo data={formData} />}
          </View>

          <View className="list">
            <AtListItem
              iconInfo={{
                // prefixClass: 'iconfont',
                size: 25,
                color: '#1D31AA',
                value: 'user'
              }}
              hasBorder={false}
              className="list-row-c"
              title='担保人信息(选填)'
              extraText={clGuaranteeInfoListStr && clGuaranteeInfoListStr.name ? '编辑' : '添加'}
              onClick={this.guaranteeInfo} />
            {clGuaranteeInfoListStr && clGuaranteeInfoListStr.name && <GuaranteeInfo data={clGuaranteeInfoListStr} />}
          </View>
        </View>
      )
    } else if (current === 1) {
      return (
        <View>
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
              title='基本信息(必填)'
              extraText={clCarInfoListStr && clCarInfoListStr.useType ? '编辑' : '添加'}
              onClick={this.toCarInfo} />
            {clCarInfoListStr && clCarInfoListStr.useType && <CarBaseInfo data={clCarInfoListStr} />}
          </View>

        </View>
      )
    }

  }
  render() {
    const { steps, current } = this.props.report;
    return (
      <View className="report-page">
        <View className="step">
          <AtSteps
            items={steps}
            current={current}
            onChange={this.onChangeStep}
          />
        </View>
        {
          this.renderStepContent()
        }

        <View className="next-btn">
          {/* <AtButton type='primary'>存为草稿</AtButton> */}
          <AtButton type='primary' onClick={this.next}>下一步</AtButton>
        </View>
      </View>
    );
  }
}

export default Report;
