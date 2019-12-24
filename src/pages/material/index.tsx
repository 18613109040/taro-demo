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
        <View className="title">主借贷人</View>
        <View className="card-list">
          <View className="list-row">
            <ImagePicker
              required={true}
              label="身份证正面"
            />
            <ImagePicker
            required={true}
              label="身份证反面"
            />
            <ImagePicker
            required={true}
              label="手持身份证"
            />
          </View>
          <View className="list-row">
            <ImagePicker
            required={true}
              label="银行卡正反面"
            />
            <ImagePicker
            required={true}
              label="行驶证主页"
            />
            <ImagePicker
            required={true}
              label="行驶证副页"
            />
          </View>
          <View className="list-row">
          <ImagePicker
          required={true}
            label="驾驶证"
          />
          <ImagePicker
          required={true}
            label="进件银行卡复印件"
          />
          <ImagePicker
          required={true}
            label="车辆登记证"
          />
        </View>
        </View>
        <View className="title">车辆信息</View>
        <View className="card-list">
          <View className="list-row">
            <ImagePicker
            required={true}
              label="车辆照片"
            />
            <ImagePicker
            required={true}
              label="车架号"
            />
            <ImagePicker
            required={true}
              label="后备箱"
            />
          </View>
          <View className="list-row">
            <ImagePicker
            required={true}
              label="仪表盘"
            />
            <ImagePicker
            required={true}
              label="出厂铭牌"
            />
            <ImagePicker
            required={true}
              label="内部座位"
            />
          </View>
          <View className="list-row">
            <ImagePicker
            required={true}
              label="人车合影"
            />
            <ImagePicker
            required={true}
              label="威武融资租赁申请表"
            />
            <ImagePicker
            required={true}
              label="工作收入证明"
            />
          </View>
          <View className="list-row">
          <ImagePicker
          required={true}
            label="征信授权书原件+手持照+面签照"
          />
          <ImagePicker
          required={true}
            label="车300网页"
          />
          <ImagePicker
          required={true}
            label="车辆保单"
          />
        </View>
        </View>
        <View className="title">家庭</View>
          <View className="card-list">
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
        </View>
        <AtButton type='primary' onClick={this.save}>保存</AtButton>
      </View>
    );
  }
}

export default Material;
