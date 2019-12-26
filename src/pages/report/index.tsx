import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { AtListItem, AtIcon, AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import IdCardInfo from '../../components/IdCardInfo'
import BaseInfo from '../../components/BaseInfo'
import ContactInfo from '../../components/ContactInfo'
import GuaranteeInfo from '../../components/GuaranteeInfo'
import CarBaseInfo from '../../components/CarBaseInfo'
import Router from '../../components/Navigator'
import Steps from '../../components/Steps'
import { InitStateProps } from '../../models/report';
import { SystemInfoProps } from '../../interface/common'
import './index.scss';
type IState = {

}
type IProps = {
  report: InitStateProps;
  systemInfo: SystemInfoProps;
  dispatch?: any;
}
@connect(({ report, common }) => ({
  report,
  systemInfo: common.systemInfo
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
    const { report, systemInfo } = this.props;
    const { windowHeight } =systemInfo;
    const { formData, current } = report;
    const { name, phone, contactName1, clGuaranteeInfoListStr, clCarInfoListStr, clCollectGatheringInfoListStr, clProductTypeListStr } = formData
    if (current === 0) {
      return (
          <ScrollView
            scrollY
            scrollWithAnimation
            style={{ height: `${windowHeight - 79}px` }}
          >
          <View className="list-col">
            <Router
              title="身份证信息(必填)"
              arrow={true}
              extraColor={name ? '#4fc79a' : '#ffd915'}
              extraText={name ? '完成' : '去完成'}
              iconInfo={{
                prefixClass: 'iconfont',
                size: 25,
                color: '#1D31AA',
                value: 'idcard'
              }}
              url="/pages/idcard/index"
            />
          </View>

          {/* {name && <IdCardInfo data={formData} />} */}
          <View className="list-col">
            <Router
              title="个人信息(必填)"
              arrow={true}
              extraColor={phone ? '#4fc79a' : '#ffd915'}
              extraText={phone ? '完成' : '去完成'}
              iconInfo={{
                size: 25,
                color: '#1D31AA',
                value: 'user'
              }}
              url="/pages/base/index"
            />
          </View>
          {/* {phone && <BaseInfo data={formData} />} */}
          <View className="list-col">
            <Router
              title="联系人信息(必填)"
              arrow={true}
              extraColor={contactName1 ? '#4fc79a' : '#ffd915'}
              extraText={contactName1 ? '完成' : '去完成'}
              iconInfo={{
                size: 25,
                color: '#1D31AA',
                value: 'phone'
              }}
              url="/pages/contact/index"
            />
          </View>
          {/* {contactName1 && <ContactInfo data={formData} />} */}
          <View className="list-col">
            <Router
              title="担保人信息(必填)"
              arrow={true}
              extraColor={clGuaranteeInfoListStr && clGuaranteeInfoListStr.name ? '#4fc79a' : '#ffd915'}
              extraText={clGuaranteeInfoListStr && clGuaranteeInfoListStr.name ? '完成' : '去完成'}
              iconInfo={{
                size: 25,
                color: '#1D31AA',
                value: 'user'
              }}
              url="/pages/guarantee/index"
            />
          </View>
          <View className="list-col">
            <Router
              title="车辆信息(必填)"
              arrow={true}
              extraColor={clCarInfoListStr && clCarInfoListStr.useType ? '#4fc79a' : '#ffd915'}
              extraText={clCarInfoListStr && clCarInfoListStr.useType ? '完成' : '去完成'}
              iconInfo={{
                prefixClass: 'iconfont',
                size: 25,
                color: '#1D31AA',
                value: 'idcard'
              }}
              url="/pages/car/base"
            />
          </View>
          <View className="list-col">
            <Router
              title="还款信息(必填)"
              arrow={true}
              extraColor={clCollectGatheringInfoListStr && clCollectGatheringInfoListStr.repaymentAccount ? '#4fc79a' : '#ffd915'}
              extraText={clCollectGatheringInfoListStr && clCollectGatheringInfoListStr.repaymentAccount ? '完成' : '去完成'}
              iconInfo={{
                prefixClass: 'iconfont',
                size: 25,
                color: '#1D31AA',
                value: 'idcard'
              }}
              url="/pages/bankcard/index"
            />
          </View>
          <View className="list-col">
            <Router
              title="产品信息(必填)"
              arrow={true}
              extraColor={clProductTypeListStr && clProductTypeListStr.applyAmount ? '#4fc79a' : '#ffd915'}
              extraText={clProductTypeListStr && clProductTypeListStr.applyAmount ? '完成' : '去完成'}
              iconInfo={{
                prefixClass: 'iconfont',
                size: 25,
                color: '#1D31AA',
                value: 'idcard'
              }}
              url="/pages/product/index"
            />
          </View>
          <View className="list-col">
            <Router
              title="材料附件(必填)"
              arrow={true}
              extraColor={clProductTypeListStr && clProductTypeListStr.applyAmount ? '#4fc79a' : '#ffd915'}
              extraText={clProductTypeListStr && clProductTypeListStr.applyAmount ? '完成' : '去完成'}
              iconInfo={{
                prefixClass: 'iconfont',
                size: 25,
                color: '#1D31AA',
                value: 'idcard'
              }}
              url="/pages/material/index"
            />
          </View>
          </ScrollView>
      )
    } else if (current === 1) {
      return (
        <View>
          

        </View>
      )
    }

  }
  render() {
    const { steps, current } = this.props.report;
    return (
      <View className="report-page">
        <View className="prompt">
          <View className="status">
            <AtIcon value="sucess" size="20"  prefixClass='iconfont' color="#FFD915"/>
            <Text className="message">已经完成了</Text>
            <AtIcon value="chevron-right" size="20"/>
          </View>
        </View>
        <Steps current={current} steps={steps} />
        {
          this.renderStepContent()
        }
        <View className="next-btn">
          <AtButton type='primary' onClick={this.next}>下一步</AtButton>
        </View>
      </View>
    );
  }
}

export default Report;
