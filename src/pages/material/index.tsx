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
            label="身份证正面(必选)"
          />
            <ImagePicker 
            label="身份证反面(必选)"
          />
          <ImagePicker 
            label="图片"
          />
        </View>
        
        <AtButton type='primary' onClick={this.save}>保存</AtButton>
      </View>
    );
  }
}

export default Material;
