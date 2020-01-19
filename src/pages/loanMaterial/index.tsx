import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import { InitStateProps } from '../../models/report';
import ImagePicker from '../../components/ImagePicker'
import { SystemInfoProps } from '../../interface/common'
import './index.scss';
type IState = {
  pleaseIdCardPhoto: Array<any>;
  pleaseDeductPrintscreen: Array<any>;
  pleaseAddLoansSuccessPrintscreen: Array<any>;
  pleaseIwataAsks: Array<any>;
  pleaseRentIst: Array<any>;
  pleaseStorePhoto: Array<any>;
  pleaseCarReceipts: Array<any>;
  pleaseGPSPhoto: Array<any>;
  pleaseCashVideo: Array<any>;
  pleaseRecommendLetter: Array<any>;
  pleaseDitchAndClient: Array<any>;
  pleaseReturnedMoney: Array<any>;
  pleaseBankContract: Array<any>;
  pleaseRelatedDuty: Array<any>;
  pleaseOtherFile: Array<any>;
  [key: string]: string | boolean | Array<any> | number;
}
type IProps = {
  report: InitStateProps;
  systemInfo: SystemInfoProps;
  dispatch?: any;

}
@connect(({ report, common }) => ({
  report: report,
  systemInfo: common.systemInfo
}))
class LoanMaterial extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '请款资料上传',
  }
  constructor(props) {
    super(props)
    const { pleaseIdCardPhoto, pleaseDeductPrintscreen,pleaseAddLoansSuccessPrintscreen,pleaseIwataAsks,
      pleaseRentIst,pleaseStorePhoto, pleaseCarReceipts, pleaseGPSPhoto,pleaseCashVideo,pleaseRecommendLetter,
      pleaseDitchAndClient,pleaseReturnedMoney, pleaseBankContract, pleaseRelatedDuty, pleaseOtherFile} = props.report.formData.clFileInfoListStr

    this.state = {
      pleaseIdCardPhoto: pleaseIdCardPhoto && JSON.parse(pleaseIdCardPhoto)||[],
      pleaseDeductPrintscreen: pleaseDeductPrintscreen&& JSON.parse(pleaseDeductPrintscreen) || [],
      pleaseAddLoansSuccessPrintscreen: pleaseAddLoansSuccessPrintscreen&& JSON.parse(pleaseAddLoansSuccessPrintscreen)|| [],
      pleaseIwataAsks: pleaseIwataAsks&&JSON.parse(pleaseIwataAsks)||[],
      pleaseRentIst: pleaseRentIst&&JSON.parse(pleaseRentIst)||[],
      pleaseStorePhoto: pleaseStorePhoto&&JSON.parse(pleaseStorePhoto)||[],
      pleaseCarReceipts: pleaseCarReceipts&&JSON.parse(pleaseCarReceipts)||[],
      pleaseGPSPhoto: pleaseGPSPhoto&&JSON.parse(pleaseGPSPhoto)||[],
      pleaseCashVideo: pleaseCashVideo&&JSON.parse(pleaseCashVideo)||[],
      pleaseRecommendLetter: pleaseRecommendLetter&&JSON.parse(pleaseRecommendLetter)||[],
      pleaseDitchAndClient: pleaseDitchAndClient&&JSON.parse(pleaseDitchAndClient)||[],
      pleaseReturnedMoney: pleaseReturnedMoney&&JSON.parse(pleaseReturnedMoney)||[],
      pleaseBankContract: pleaseBankContract&&JSON.parse(pleaseBankContract)||[],
      pleaseRelatedDuty: pleaseRelatedDuty&&JSON.parse(pleaseRelatedDuty)||[],
      pleaseOtherFile: pleaseOtherFile&&JSON.parse(pleaseOtherFile)||[],
      height: props.systemInfo.windowHeight
    }
  }
  componentDidMount = async () => {
    const query = Taro.createSelectorQuery();
    query.select('.btn-bottom').boundingClientRect();
    const { windowHeight } = Taro.getSystemInfoSync();
    query.exec((res)=>{
      this.setState({
        height: windowHeight - res[0].height
      })
    });
  }
  save = () => {
    Taro.navigateBack()
  }
  changeImage = ({ key, value }) => {
    this.setState({
      [`${key}`]: value // [...value, ...temp ]
    })
  }
  render() {
    const { height, pleaseIdCardPhoto, pleaseDeductPrintscreen, pleaseAddLoansSuccessPrintscreen, pleaseIwataAsks, pleaseRentIst, pleaseStorePhoto,
      pleaseCarReceipts, pleaseGPSPhoto, pleaseCashVideo, pleaseRecommendLetter, pleaseDitchAndClient, pleaseReturnedMoney, pleaseBankContract,
      pleaseRelatedDuty, pleaseOtherFile
    } = this.state;
    const { orderId } = this.$router.params
    return (
      <View className="material-card-page">
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${height}px` }}
        >
          <View>
            <View className="title">收款人附件</View>
            <View className="card-list">
              <View className="list-row">
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    required={true}
                    label="身份证复印件扫描件"
                    files={pleaseIdCardPhoto}
                    name="pleaseIdCardPhoto"
                    orderId={orderId}
                    onChange={this.changeImage}
                  />
                </View>
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    required={true}
                    label="划扣绑定成功截图"
                    files={pleaseDeductPrintscreen}
                    name="pleaseDeductPrintscreen"
                    orderId={orderId}
                    count={5}
                    onChange={this.changeImage}
                  />
                </View>
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    required={true}
                    label="添加贷后成功截图"
                    count={2}
                    files={pleaseAddLoansSuccessPrintscreen}
                    name="pleaseAddLoansSuccessPrintscreen"
                    orderId={orderId}
                    onChange={this.changeImage}
                  />
                </View>
              </View>
              <View className="list-row">
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    required={true}
                    label="融资租赁信息问答笔录"
                    files={pleaseIwataAsks}
                    name="pleaseIwataAsks"
                    orderId={orderId}
                    count={2}
                    onChange={this.changeImage}
                  />
                </View>
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    required={true}
                    label="租金明细表"
                    files={pleaseRentIst}
                    name="pleaseRentIst"
                    orderId={orderId}
                    count={3}
                    onChange={this.changeImage}
                  />
                </View>
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    // required={true}
                    label="门店签约合照"
                    files={pleaseStorePhoto}
                    name="pleaseStorePhoto"
                    orderId={orderId}
                    onChange={this.changeImage}
                  />
                </View>
              </View>
              <View className="list-row">
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    required={true}
                    label="车辆保单"
                    files={pleaseCarReceipts}
                    name="pleaseCarReceipts"
                    orderId={orderId}
                    count={2}
                    onChange={this.changeImage}
                  />
                </View>
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    required={true}
                    label="GPS照片"
                    files={pleaseGPSPhoto}
                    name="pleaseGPSPhoto"
                    orderId={orderId}
                    count={2}
                    onChange={this.changeImage}
                  />
                </View>
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    required={true}
                    label="客户请款视频"
                    files={pleaseCashVideo}
                    name="pleaseCashVideo"
                    orderId={orderId}
                    count={3}
                    type='video'
                    onChange={this.changeImage}
                  />
                </View>
              </View>
              <View className="list-row">
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    required={true}
                    label="推荐确认函"
                    files={pleaseRecommendLetter}
                    name="pleaseRecommendLetter"
                    orderId={orderId}
                    count={3}
                    onChange={this.changeImage}
                  />
                </View>
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    // required={true}
                    label="通话清单"
                    files={pleaseDitchAndClient}
                    name="pleaseDitchAndClient"
                    orderId={orderId}
                    count={5}
                    type='file'
                    onChange={this.changeImage}
                  />
                </View>
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    // required={true}
                    label="回款凭证对话框"
                    files={pleaseReturnedMoney}
                    name="pleaseReturnedMoney"
                    orderId={orderId}
                    count={6}
                    onChange={this.changeImage}
                  />
                </View>
              </View>
              <View className="list-row">
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    // required={true}
                    label="租赁合同框（上传银行要求的版本）"
                    files={pleaseBankContract}
                    name="pleaseBankContract"
                    orderId={orderId}
                    count={6}
                    onChange={this.changeImage}
                  />
                </View>
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    // required={true}
                    label="连带责任保证书"
                    files={pleaseRelatedDuty}
                    name="pleaseRelatedDuty"
                    orderId={orderId}
                    count={6}
                    onChange={this.changeImage}
                  />
                </View>
                <View className='flex-1 at-row at-row__align--center at-row__justify--center'>
                  <ImagePicker
                    required={true}
                    label="其他资料"
                    files={pleaseOtherFile}
                    name="pleaseOtherFile"
                    orderId={orderId}
                    count={6}
                    onChange={this.changeImage}
                  />
                </View>
              </View>
            </View>
          </View>

        </ScrollView>
        <View className="btn-bottom">
          <AtButton type='primary' onClick={this.save}>提交请款材料</AtButton>
        </View>
      </View>
    );
  }
}

export default LoanMaterial;
