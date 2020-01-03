import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Button, Label, Image } from '@tarojs/components';
import { AtIcon, AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import { baseUrl } from '../../config/index';
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
  orderId: string;
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
    navigationBarTitleText: '订单详情',
  }
  constructor(props) {
    super(props)
    this.state = {
      orderId: '20200103153710500'
    }
  }
  componentDidMount = () => {
    const { orderId } = this.$router.params
    const { dispatch } = this.props;
    dispatch({
      type: 'report/getOrderDetailAction',
      payload: {
        id: '20200103153710500'
      }
    })
    // this.setState({
    //   orderId
    // })
  }

  // 小程序上拉加载
  onReachBottom() {

  }

  onChangeStep = () => {

  }

  callPhone = (phone) => {
    Taro.makePhoneCall({
      phoneNumber: phone
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
  previewImage = (imageList, current) => {
    const urls = imageList.map(item => `${baseUrl}/${item.url}`)
    Taro.previewImage({
      urls,
      current
    })
  }
  renderStepContent = () => {
    const { report, systemInfo } = this.props;
    const { windowHeight } = systemInfo;
    const { formData, current } = report;
    const { orderId } = this.state;
    const { email, contactName1, clGuaranteeInfoListStr, clCarInfoListStr, clCollectGatheringInfoListStr, clCollectClientInfoBigDataStr, clProductTypeListStr, clFileInfoListStr } = formData
    const { bankNo, driveCard, idCardPhoto, idCardPhoto2 } = clFileInfoListStr
    const bankNos = JSON.parse(bankNo) || [];
    const driveCards = JSON.parse(driveCard) || [];
    const idCardPhotos = JSON.parse(idCardPhoto) || [];
    const idCardPhoto2s = JSON.parse(idCardPhoto2) || [];
    const imageList = [...bankNos, ...driveCards, ...idCardPhotos, ...idCardPhoto2s]
    const { name, idCard, sex, birthday, idCardStartDate, idCardEndDate, isDriverLicense, placeOfissue, idAddrProvince, idAddrCity, idAddrArea, idAddrDetails, phone, repaymentAccount } = clCollectClientInfoBigDataStr
    if (current === 0) {
      return (
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${windowHeight - 79}px` }}
        >
          <View>
            <View className='header at-row at-row__align--center'>
              <AtIcon value="image" size="20" prefixClass='iconfont' color="#38558E" />
              <View className="title">材料信息</View>
            </View>
            <View className="content at-row at-row__align--center at-row__justify--between">
              {
                imageList.map((item) => (
                  <Image key={item.url} onClick={() => this.previewImage(imageList, `${baseUrl}/${item.url}`)} src={`${baseUrl}/${item.url}`} className="image" />
                ))
              }
            </View>
            <View className='header at-row at-row__align--center'>
              <AtIcon value="idcard" size="20" prefixClass='iconfont' color="#38558E" />
              <View className="title">基本信息</View>
            </View>
            <View className="content">
              <View>
                <View className="row-info">
                  <Text>姓名:</Text>
                  <Text className="value">{name}</Text>
                </View>
                <View className="row-info">
                  <Text>身份证号:</Text>
                  <Text  className="value">{idCard}</Text>
                </View>
                <View className="row-info">
                  <Text>性别:</Text>
                  <Text  className="value">{sex}</Text>
                </View>
                <View className="row-info">
                  <Text>出生日期:</Text>
                  <Text  className="value">{birthday}</Text>
                </View>
                <View className="row-info">
                  <Text>证件有效期:</Text>
                  <Text  className="value">{`${idCardStartDate} 至 ${idCardEndDate}`}</Text>
                </View>
                <View className="row-info">
                  <Text>证件签发地:</Text>
                  <Text  className="value">{placeOfissue}</Text>
                </View>
                <View className="row-info">
                  <Text>地址:</Text>
                  <Text  className="value">{`${idAddrProvince}${idAddrCity}${idAddrArea}${idAddrDetails}`}</Text>
                </View>
                <View className="row-info">
                  <Text>是否有驾照:</Text>
                  <Text  className="value">{isDriverLicense == 1 ? '有' : '无'}</Text>
                </View>
                <View className="row-info">
                  <Text>手机号:</Text>
                  <Text  className="value">{phone}</Text>
                </View>
                <View className="row-info">
                  <Text>银行卡号:</Text>
                  <Text  className="value">{repaymentAccount}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )
    } else if (current === 1) {
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
              orderId={orderId}
              url="/pages/idcard/index"
            />
          </View>
          <View className="list-col">
            <Router
              title="个人信息(必填)"
              arrow={true}
              orderId={orderId}
              extraColor={email ? '#4fc79a' : '#ffd915'}
              extraText={email ? '完成' : '去完成'}
              iconInfo={{
                size: 25,
                color: '#1D31AA',
                value: 'user'
              }}
              url="/pages/base/index"
            />
          </View>
          <View className="list-col">
            <Router
              title="联系人信息(必填)"
              arrow={true}
              orderId={orderId}
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
          <View className="list-col">
            <Router
              title="担保人信息(选填)"
              arrow={true}
              orderId={orderId}
              extraColor={clGuaranteeInfoListStr && clGuaranteeInfoListStr.email ? '#4fc79a' : '#ffd915'}
              extraText={clGuaranteeInfoListStr && clGuaranteeInfoListStr.email ? '完成' : '去完成'}
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
              orderId={orderId}
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
              orderId={orderId}
              extraColor={clCollectGatheringInfoListStr && clCollectGatheringInfoListStr.bankNo ? '#4fc79a' : '#ffd915'}
              extraText={clCollectGatheringInfoListStr && clCollectGatheringInfoListStr.bankNo ? '完成' : '去完成'}
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
              orderId={orderId}
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
              orderId={orderId}
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
    }
  }

  render() {
    const { steps, current, orderDetail, formData } = this.props.report;
    const { batchContent, batchStatus } = orderDetail;
    const { name, idCard, sex, birthday, idCardStartDate, idCardEndDate, isDriverLicense, placeOfissue, idAddrProvince, idAddrCity, idAddrArea, idAddrDetails, phone, repaymentAccount } = formData.clCollectClientInfoBigDataStr
    return (
      <View className="report-page">
        <View className="prompt">
          <View className="status">
            <AtIcon value={batchStatus == 0 ? "underReview" : batchStatus == 1 ? "sucess" : "colose"} size="30" prefixClass='iconfont'
              color={batchStatus == 0 ? "#fff" : "#FFD915"} />
            <Text className="message">{batchContent}</Text>
            <AtIcon value="chevron-right" size="20" />
          </View>
          {
            batchStatus == 2 && <View className="error-des">
              <View><Text className="reason-title">退回原因:</Text></View>
              <View><Text className="reason"></Text></View>
            </View>
          }
          <View className="link-message">
            <Text className="name">{name}</Text>
            <AtIcon value="phone" size="16" onClick={()=>this.callPhone(phone)} prefixClass='iconfont' color="#d0d3d9" />
            <AtIcon value="shuxian" size="16" prefixClass='iconfont' color="#d0d3d9" />
            <Text className="code">{sex}</Text>
            <Text className="code">{idCard}</Text>
          </View>
        </View>
        <Steps current={current} steps={steps} />
        {
          this.renderStepContent()
        }
        {/* <View className="next-btn">
          <AtButton type='primary' onClick={this.next}>下一步</AtButton>
        </View> */}
      </View>
    );
  }
}

export default Report;
