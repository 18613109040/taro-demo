import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import { InitStateProps } from '../../models/report';
import ImagePicker from '../../components/ImagePicker'
import { SystemInfoProps } from '../../interface/common'
import './index.scss';
type IState = {
  idCardAndBodyUrl: Array<any>;
  runCard: Array<any>;
  runCard2: Array<any>;
  workIncomeProve:  Array<any>;
  carRegisterCard: Array<any>;
  carPhoto: Array<any>;
  framePhotos: Array<any>;
  trunkPhotos: Array<any>;
  dashboardPhotos:  Array<any>;
  factoryNameplatePhoto: Array<any>;
  internalSeatPhotos: Array<any>;
  pleaseBak2: Array<any>;
  applicationForm: Array<any>;
  otherProve:  Array<any>;
  peopleCredit:  Array<any>;
  car300: Array<any>;
  carReceipts: Array<any>;
  phoneRecord: Array<any>;
  bankRunWater: Array<any>;
  liveProve: Array<any>;
  otherBak: Array<any>;
  relationProve: Array<any>;
  marriageInfo: Array<any>;
  visitFamilyPhoto: Array<any>;
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
class Material extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '',  // 材料附件
  }
  constructor(props) {
    super(props)
    const {idCardAndBodyUrl, runCard, runCard2, workIncomeProve, carRegisterCard, carPhoto, framePhotos, trunkPhotos, dashboardPhotos,factoryNameplatePhoto,
      internalSeatPhotos, pleaseBak2, applicationForm, otherProve, peopleCredit, car300, carReceipts, phoneRecord, bankRunWater, liveProve ,
      otherBak, relationProve, marriageInfo, visitFamilyPhoto } = props.report.formData.clFileInfoListStr
    this.state = {
      idCardAndBodyUrl: idCardAndBodyUrl&&JSON.parse(idCardAndBodyUrl) ||[],
      runCard: runCard&&JSON.parse(runCard)||[],
      runCard2: runCard2&&JSON.parse(runCard2)||[],
      workIncomeProve: workIncomeProve&&JSON.parse(workIncomeProve)||[],
      carRegisterCard: carRegisterCard&&JSON.parse(carRegisterCard)||[],
      carPhoto: carPhoto&&JSON.parse(carPhoto)||[],
      framePhotos: framePhotos&&JSON.parse(framePhotos)||[],
      trunkPhotos: trunkPhotos&&JSON.parse(trunkPhotos)||[],
      dashboardPhotos: dashboardPhotos&&JSON.parse(dashboardPhotos)||[],
      factoryNameplatePhoto: factoryNameplatePhoto&&JSON.parse(factoryNameplatePhoto)||[],
      internalSeatPhotos:  internalSeatPhotos&&JSON.parse(internalSeatPhotos)||[],
      pleaseBak2: pleaseBak2&&JSON.parse(pleaseBak2)||[],
      applicationForm: applicationForm&&JSON.parse(applicationForm)||[],
      otherProve: otherProve&&JSON.parse(otherProve)||[],
      peopleCredit: peopleCredit&&JSON.parse(peopleCredit)||[],
      car300: car300&&JSON.parse(car300)||[],
      carReceipts: carReceipts&&JSON.parse(carReceipts)||[],
      phoneRecord: phoneRecord&&JSON.parse(phoneRecord)||[],
      bankRunWater: bankRunWater&&JSON.parse(bankRunWater)||[],
      liveProve: liveProve&&JSON.parse(liveProve)||[],
      otherBak: otherBak&&JSON.parse(otherBak)||[],
      relationProve: relationProve&&JSON.parse(relationProve)||[],
      marriageInfo: marriageInfo&&JSON.parse(marriageInfo)||[],
      visitFamilyPhoto: visitFamilyPhoto&&JSON.parse(visitFamilyPhoto)||[],
    }
  }
  componentDidMount = () => {

  }
  save = () => {
    Taro.navigateBack()
  }
  changeImage=({key,value,size})=>{
    let temp:any = []
    if(size&&value.length<size){
      temp = new Array(size-value.length).fill({url: ''})
    }
    this.setState({
      [`${key}`]: [...value, ...temp ]
    })
  }
  render() {
    const { idCardAndBodyUrl, runCard, runCard2, workIncomeProve, carRegisterCard, carPhoto, framePhotos, trunkPhotos, dashboardPhotos,
      factoryNameplatePhoto, internalSeatPhotos, pleaseBak2, applicationForm, otherProve, peopleCredit, car300, carReceipts, phoneRecord,
      bankRunWater, liveProve, otherBak, relationProve, marriageInfo, visitFamilyPhoto
     } = this.state;
    const { orderId } =  this.$router.params
    const { windowHeight } = this.props.systemInfo;
    return (
      <View className="material-card-page">
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${windowHeight - 60}px` }}
        >
          <View>
            <View className="title">主借贷人</View>
            <View className="card-list">
              <View className="list-row">
                <ImagePicker
                  required={true}
                  label="手持身份证"
                  files={idCardAndBodyUrl}
                  name="idCardAndBodyUrl"
                  orderId={orderId}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  required={true}
                  label="行驶证主页"
                  files={runCard}
                  name="runCard"
                  orderId={orderId}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  required={true}
                  label="行驶证副页"
                  files={runCard2}
                  name="runCard2"
                  orderId={orderId}
                  onChange={this.changeImage}
                />
              </View>
              <View className="list-row">
                <ImagePicker
                  required={true}
                  label="进件银行卡复印件"
                  files={workIncomeProve}
                  name="workIncomeProve"
                  orderId={orderId}
                  count={2}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  required={true}
                  label="车辆登记证"
                  files={carRegisterCard}
                  name="carRegisterCard"
                  orderId={orderId}
                  count={5}
                  onChange={this.changeImage}
                />
              </View>
            </View>
            <View className="title">车辆信息</View>
            <View className="card-list">
              <View className="list-row">
                <ImagePicker
                  required={true}
                  label="车辆照片"
                  files={carPhoto}
                  name="carPhoto"
                  orderId={orderId}
                  count={8}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  required={true}
                  label="车架号" 
                  files={framePhotos}
                  name="framePhotos"
                  orderId={orderId}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  required={true}
                  label="后备箱"
                  files={trunkPhotos}
                  name="trunkPhotos"
                  orderId={orderId}
                  onChange={this.changeImage}
                />
              </View>
              <View className="list-row">
                <ImagePicker
                  required={true}
                  label="仪表盘"
                  files={dashboardPhotos}
                  name="dashboardPhotos"
                  orderId={orderId}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  required={true}
                  label="出厂铭牌" 
                  files={factoryNameplatePhoto}
                  name="factoryNameplatePhoto"
                  orderId={orderId}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  required={true}
                  label="内部座位"
                  count={2}
                  files={internalSeatPhotos}
                  name="internalSeatPhotos"
                  orderId={orderId}
                  onChange={this.changeImage}
                />
              </View>
              <View className="list-row">
                <ImagePicker
                  required={true}
                  label="人车合影"
                  files={pleaseBak2}
                  name="pleaseBak2"
                  orderId={orderId}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  required={true}
                  label="威武融资租赁申请表"
                  files={applicationForm}
                  name="applicationForm"
                  orderId={orderId}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  required={true}
                  label="工作收入证明"
                  files={otherProve}
                  name="otherProve"
                  orderId={orderId}
                  onChange={this.changeImage}
                />
              </View>
              <View className="list-row">
                <ImagePicker
                  required={true}
                  label="征信授权书原件+手持照+面签照"
                  files={peopleCredit}
                  name="peopleCredit"
                  count={3}
                  orderId={orderId}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  required={true}
                  label="车300网页"
                  files={car300}
                  name="car300"
                  orderId={orderId}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  required={true}
                  files={carReceipts}
                  name="carReceipts"
                  count={2}
                  orderId={orderId}
                  onChange={this.changeImage}
                  label="车辆保单"
                />
              </View>
            </View>
            <View className="title">家庭</View>
            <View className="card-list">
              <View className="list-row">
                <ImagePicker
                  label="户口本"
                  files={relationProve}
                  name="relationProve"
                  count={4}
                  orderId={orderId}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  label="婚姻信息"
                  files={marriageInfo}
                  name="marriageInfo"
                  count={4}
                  orderId={orderId}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  label="家访图片"
                  files={visitFamilyPhoto}
                  name="visitFamilyPhoto"
                  count={15}
                  orderId={orderId}
                  onChange={this.changeImage}
                />
              </View>
              <View className="list-row">
                <ImagePicker
                  label="通话清单"
                  files={phoneRecord}
                  name="phoneRecord"
                  orderId={orderId}
                  count={5}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  label="银行流水"
                  files={bankRunWater}
                  name="bankRunWater"
                  orderId={orderId}
                  count={30}
                  onChange={this.changeImage}
                />
                <ImagePicker
                  label="居住证明"
                  files={liveProve}
                  name="liveProve"
                  orderId={orderId}
                  count={3}
                  onChange={this.changeImage}
                />
              </View>
              <View className="list-row">
                <ImagePicker
                  label="其他资料"
                  files={otherBak}
                  name="otherBak"
                  orderId={orderId}
                  count={5}
                  onChange={this.changeImage}
                />
              </View>
            </View>
          </View>
        
        </ScrollView>
        <View className="btn-bottom">
          <AtButton type='primary' onClick={this.save}>保存</AtButton>
        </View>
      </View>
    );
  }
}

export default Material;
