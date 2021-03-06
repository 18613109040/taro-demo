import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import { AtIcon, AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import { baseUrl } from '../../config/index';
import Router from '../../components/Navigator'
import Steps from '../../components/Steps'
import { InitStateProps } from '../../models/report';
import { SystemInfoProps } from '../../interface/common'
import './index.scss';
type IState = {
  orderId: string;
  height: number;
  taskId: string;
  taskName: string;
  [key: string]: string | boolean | Array<any> | number;
}
type IProps = {
  report: InitStateProps;
  systemInfo: SystemInfoProps;
  isTask: boolean;
  dispatch?: any;
}
@connect(({ report, common }) => ({
  report,
  systemInfo: common.systemInfo,
  isTask: common.isTask
}))
class Report extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '订单详情',
  }
  constructor(props) {
    super(props)
    this.state = {
      orderId: '',
      taskId: '',
      taskName: '',
      height: props.systemInfo.windowHeight
    }
  }
  componentDidShow = () => {
    const { orderId, taskId, taskName } = this.$router.params
    this.getData(orderId)
    this.setState({
      orderId,
      taskId,
      taskName
    })
  }
  getData(orderId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/getOrderDetailAction',
      payload: {
        id: orderId
      }
    }).then(res => {
      if (+res.obj.primaryStatus > 0) {
        dispatch({
          type: 'report/getInfoAuthAction',
          payload: {
            id: orderId
          }
        })
      }
      setTimeout(() => {
        const query = Taro.createSelectorQuery();
        query.select('.step-mes').boundingClientRect();
        query.select('.btn-footer').boundingClientRect();
        const { systemInfo } = this.props;
        const { windowHeight } = systemInfo;
        query.exec((res) => {
          let h = res[0].height;
          if (res && res[1]) {
            const { top } = res[1];
            this.setState({
              height: top - h
            })
          } else {
            this.setState({
              height: windowHeight - res[0].height
            })
          }
        });
      }, 500);

    })
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/reset',
      payload: {
      }
    })
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
  reportForm = () => {
    const { dispatch, report } = this.props;
    const { orderId, taskId } = this.state;
    const { orderDetail } = report;
    const { primaryStatus } = orderDetail;
    Taro.showModal({
      title: '订单提交',
      content: '确定要提交本单吗?',
      success: () => {
        Taro.showLoading({
          title: '提交中...'
        })
        if (primaryStatus > 0) {
          dispatch({
            type: 'report/updateInfoAction',
            payload: {
              id: orderId,
              status: 1,
              taskId: taskId,
              comment: ''
            }
          }).then(res => {
            Taro.hideLoading()
            if (res.success) {
              Taro.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
              })
              this.getData(this.state.orderId)
            }
          })
        } else {
          dispatch({
            type: 'report/submitInfoAction',
            payload: {
              id: orderId
            }
          }).then(res => {
            Taro.hideLoading()
            if (res.success) {
              Taro.showToast({
                title: '更新成功',
                icon: 'success',
                duration: 2000
              })
              this.getData(this.state.orderId)
            }
          })
        }
      }
    })


  }
  renderStepContent = () => {
    const { report, systemInfo, isTask } = this.props;
    const { windowHeight } = systemInfo;
    const { formData, current, orderDetail, authInfo } = report;
    const { primaryStatus } = orderDetail;
    const { orderId, height, taskId, taskName } = this.state;
    const { email, contactName1, clGuaranteeInfoListStr, clCarInfoListStr, clCollectGatheringInfoListStr, clCollectClientInfoBigDataStr, clProductTypeListStr, clFileInfoListStr } = formData
    const { bankNo, driveCard, idCardPhoto, idCardPhoto2, idCardAndBodyUrl, runCard, runCard2, workIncomeProve, carRegisterCard,
      carPhoto, framePhotos, trunkPhotos, dashboardPhotos, factoryNameplatePhoto, internalSeatPhotos, pleaseBak2,
      applicationForm, otherProve, peopleCredit, car300, carReceipts } = clFileInfoListStr
    const bankNos = JSON.parse(bankNo || '[]');
    const driveCards = JSON.parse(driveCard || '[]');
    const idCardPhotos = JSON.parse(idCardPhoto || '[]');
    const idCardPhoto2s = JSON.parse(idCardPhoto2 || '[]');
    const idCardAndBodyUrls = JSON.parse(idCardAndBodyUrl || '[]');
    const runCards = JSON.parse(runCard || '[]');
    const runCard2s = JSON.parse(runCard2 || '[]');
    const workIncomeProves = JSON.parse(workIncomeProve || '[]');
    const carRegisterCards = JSON.parse(carRegisterCard || '[]');
    const carPhotos = JSON.parse(carPhoto || '[]');
    const framePhotoss = JSON.parse(framePhotos || '[]');
    const trunkPhotoss = JSON.parse(trunkPhotos || '[]');
    const dashboardPhotoss = JSON.parse(dashboardPhotos || '[]');
    const factoryNameplatePhotos = JSON.parse(factoryNameplatePhoto || '[]');
    const internalSeatPhotoss = JSON.parse(internalSeatPhotos || '[]');
    const pleaseBak2s = JSON.parse(pleaseBak2 || '[]');
    const applicationForms = JSON.parse(applicationForm || '[]');
    const otherProves = JSON.parse(otherProve || '[]');
    const peopleCredits = JSON.parse(peopleCredit || '[]');
    const car300s = JSON.parse(car300 || '[]');
    const carReceiptss = JSON.parse(carReceipts || '[]');
    const imageList = [...bankNos, ...driveCards, ...idCardPhotos, ...idCardPhoto2s]
    const { name, idCard, sex, birthday, idCardStartDate, idCardEndDate, isDriverLicense, placeOfissue, idAddrProvince, idAddrCity, idAddrArea, idAddrDetails, phone, repaymentAccount } = clCollectClientInfoBigDataStr
    const isShowMaterial: boolean = (idCardAndBodyUrls.length > 0 && runCards.length > 0 && runCard2s.length > 0 && workIncomeProves.length > 0 &&
      carRegisterCards.length > 0 && carPhotos.length > 0 && framePhotoss.length > 0 && trunkPhotoss.length > 0 && dashboardPhotoss.length > 0 &&
      factoryNameplatePhotos.length > 0 && internalSeatPhotoss.length > 0 && pleaseBak2s.length > 0 && applicationForms.length > 0 &&
      otherProves.length > 0 && peopleCredits.length > 0 && car300s.length > 0 && carReceiptss.length > 0)
    const isShowReport: any = isShowMaterial && name != '' && email != '' && contactName1 != '' &&
      clCarInfoListStr && clCarInfoListStr.useType != '' && clCollectGatheringInfoListStr && clCollectGatheringInfoListStr.bankNo != '' &&
      clProductTypeListStr && clProductTypeListStr.applyAmount != ''
    let disabled: boolean = true;
    if (isTask) {
      disabled = (!authInfo || (authInfo.clientInfo.length>0)) ? false : true;
    } else {
      disabled = primaryStatus > 0 ? true : false;
    }
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
                  <Text className="value">{idCard}</Text>
                </View>
                <View className="row-info">
                  <Text>性别:</Text>
                  <Text className="value">{sex}</Text>
                </View>
                <View className="row-info">
                  <Text>出生日期:</Text>
                  <Text className="value">{birthday}</Text>
                </View>
                <View className="row-info">
                  <Text>证件有效期:</Text>
                  <Text className="value">{`${idCardStartDate} 至 ${idCardEndDate}`}</Text>
                </View>
                <View className="row-info">
                  <Text>证件签发地:</Text>
                  <Text className="value">{placeOfissue}</Text>
                </View>
                <View className="row-info">
                  <Text>地址:</Text>
                  <Text className="value">{`${idAddrProvince}${idAddrCity}${idAddrArea}${idAddrDetails}`}</Text>
                </View>
                <View className="row-info">
                  <Text>是否有驾照:</Text>
                  <Text className="value">{isDriverLicense == 1 ? '有' : '无'}</Text>
                </View>
                <View className="row-info">
                  <Text>手机号:</Text>
                  <Text className="value">{phone}</Text>
                </View>
                <View className="row-info">
                  <Text>银行卡号:</Text>
                  <Text className="value">{repaymentAccount}</Text>
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
          style={{ height: `${height}px` }}>
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
                prefixClass: 'iconfont',
                color: '#1D31AA',
                value: 'danbao'
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
                value: 'carinfo'
              }}
              url="/pages/car/base"
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
                size: 20,
                color: '#1D31AA',
                value: 'product'
              }}
              url="/pages/product/index"
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
                value: 'gather'
              }}
              url="/pages/bankcard/index"
            />
          </View>
          <View className="list-col">
            <Router
              title="材料附件(必填)"
              arrow={true}
              orderId={orderId}
              extraColor={isShowMaterial ? '#4fc79a' : '#ffd915'}
              extraText={isShowMaterial ? '完成' : '去完成'}
              iconInfo={{
                prefixClass: 'iconfont',
                size: 25,
                color: '#1D31AA',
                value: 'material'
              }}
              url="/pages/material/index"
            />
          </View>
          <View className="btn-footer">
            <AtButton type='primary' disabled={!isShowReport && disabled } onClick={this.reportForm}>提报表单</AtButton>
          </View>
        </ScrollView>
      )
    } else if (current === 2) {
      return (
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${height}px` }}
        >
          <View className="list-col">
            <Router
              title="GPS安装提报"
              arrow={true}
              extraColor={name ? '#4fc79a' : '#ffd915'}
              extraText={name ? '完成' : '去完成'}
              iconInfo={{
                prefixClass: 'iconfont',
                size: 20,
                color: '#1D31AA',
                value: 'gps'
              }}
              taskName={taskName}
              taskId={taskId}
              orderId={orderId}
              url="/pages/gpsInstall/index"
            />
          </View>
          <View className="list-col">
            <Router
              title="车辆抵押"
              arrow={true}
              taskName={taskName}
              extraColor={name ? '#4fc79a' : '#ffd915'}
              extraText={name ? '完成' : '去完成'}
              iconInfo={{
                prefixClass: 'iconfont',
                size: 25,
                color: '#1D31AA',
                value: 'diya'
              }}
              orderId={orderId}
              taskId={taskId}
              url="/pages/carMortgage/index"
            />
          </View>
          <View className="list-col">
            <Router
              title="合同下载"
              arrow={true}
              taskName={taskName}
              extraColor={name ? '#4fc79a' : '#ffd915'}
              extraText={name ? '完成' : '去完成'}
              iconInfo={{
                prefixClass: 'iconfont',
                size: 25,
                color: '#1D31AA',
                value: 'hetong'
              }}
              taskId={taskId}
              orderId={orderId}
              url="/pages/contractDownload/index"
            />
          </View>
          <View className="list-col">
            <Router
              title="请款资料"
              arrow={true}
              extraColor={name ? '#4fc79a' : '#ffd915'}
              extraText={name ? '完成' : '去完成'}
              iconInfo={{
                prefixClass: 'iconfont',
                size: 25,
                color: '#1D31AA',
                value: 'idcard'
              }}
              taskId={taskId}
              taskName={taskName}
              orderId={orderId}
              url="/pages/loanMaterial/index"
            />
          </View>
        </ScrollView>
      )
    } else if (current === 3) {
      return (
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${windowHeight - 79}px` }}
        >
          
        </ScrollView>
      )
    }
  }

  render() {
    const { steps, current, orderDetail, formData } = this.props.report;
    const { batchContent, batchStatus, primaryContent, primaryStatus } = orderDetail;
    const { returnReason } = formData;
    const { name, idCard, sex, phone } = formData.clCollectClientInfoBigDataStr
    return (
      <View className="report-page">
        <View className="step-mes">
          <View className="prompt">
            <View className="status">
              <View className="status-left">
                <AtIcon value={batchStatus == 0 ? "underReview" : batchStatus == 1 ? "sucess" : "colose"} size="30" prefixClass='iconfont'
                  color={batchStatus == 0 ? "#fff" : "#FFD915"} />
                <Text className="message">{parseInt(primaryStatus)>0?primaryContent:batchContent}</Text>
                <AtIcon value="chevron-right" size="20" />
              </View>
              <AtButton type='primary' size='small' className="small-btn" >审批流程</AtButton>

            </View>
            {
              returnReason && <View className="error-des">
                <View><Text className="reason-title">退回原因:</Text></View>
                <View><Text className="reason">{returnReason}</Text></View>
              </View>
            }
            <View className="link-message">
              <Text className="name">{name}</Text>
              <AtIcon value="phone" size="16" onClick={() => this.callPhone(phone)} prefixClass='iconfont' color="#d0d3d9" />
              <AtIcon value="shuxian" size="16" prefixClass='iconfont' color="#d0d3d9" />
              <Text className="code">{sex}</Text>
              <Text className="code">{idCard}</Text>
            </View>
          </View>
          <Steps current={current} steps={steps} />
        </View>
        {
          this.renderStepContent()
        }
      </View>
    );
  }
}

export default Report;
