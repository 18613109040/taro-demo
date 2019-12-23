import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import { InitStateProps } from '../../models/report';
import ImagePicker from '../../components/ImagePicker'

import './index.scss';
type IState = {

}
type IProps = {
  report: InitStateProps;
  dispatch?: any;
}
@connect(({ report }) => ({
  report: report
}))
class Material extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '',  // 材料附件
  }
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount = () => {

  }
  onChange = (obj) => {
    const { error, value, valueKey, errorKey } = obj;
    this.setState({
      [`${errorKey}`]: error,
      [`${valueKey}`]: value
    })
  }
  save = () => {


  }

  render() {
    return (
      <View className="material-card-page">
        <View className="list-row">
          <ImagePicker
            error={true}
            label="身份证正面(必选)"
          />
          <ImagePicker
            label="身份证反面(必选)"
          />
          <ImagePicker
            label="手持身份证(必选)"
          />
        </View>
        <View className="list-row">
          <ImagePicker
            label="银行卡正反面(必选)"
          />
          <ImagePicker
            label="行驶证主页(必选)"
          />
          <ImagePicker
            label="行驶证副页(必选)"
          />
        </View>
        <View className="list-row">
          <ImagePicker
            label="驾驶证(必选)"
          />
          <ImagePicker
            label="进件银行卡复印件(必选)"
          />
          <ImagePicker
            label="车辆登记证(必选)"
          />
        </View>
        <View className="list-row">
          <ImagePicker
            label="车辆照片(必选)"
          />
          <ImagePicker
            label="车架号(必选)"
          />
          <ImagePicker
            label="后备箱(必选)"
          />
        </View>
        <View className="list-row">
          <ImagePicker
            label="仪表盘(必选)"
          />
          <ImagePicker
            label="出厂铭牌(必选)"
          />
          <ImagePicker
            label="内部座位(必选)"
          />
        </View>
        <View className="list-row">
          <ImagePicker
            label="人车合影(必选)"
          />
          <ImagePicker
            label="威武融资租赁申请表(必选)"
          />
          <ImagePicker
            label="工作收入证明(必选)"
          />
        </View>
        <View className="list-row">
          <ImagePicker
            label="征信授权书原件+手持照+面签照(必选)"
          />
          <ImagePicker
            label="车300网页(必选)"
          />
          <ImagePicker
            label="车辆保单(必选)"
          />
        </View>
        <View className="list-row">
          <ImagePicker
            label="户口本"
          />
          <ImagePicker
            label="婚姻信息"
          />
          <ImagePicker
            label="家访图片"
          />
        </View>
        <View className="list-row">
          <ImagePicker
            label="通话清单"
          />
          <ImagePicker
            label="银行流水"
          />
          <ImagePicker
            label="居住证明"
          />
        </View>
        <View className="list-row">
          <ImagePicker
            label="其他资料"
          />
        </View>
        <AtButton type='primary' onClick={this.save}>保存</AtButton>
      </View>
    );
  }
}

export default Material;
