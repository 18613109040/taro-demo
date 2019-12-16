import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtIcon, AtButton, AtForm } from "taro-ui"
import { connect } from '@tarojs/redux';
import CInput from '../../components/Input';
import ChooseAddr from '../../components/ChooseAddr';
import { InitStateProps } from '../../models/report';

import './index.scss';
type IState = {}
type IProps = {
  report: InitStateProps;
  dispatch?: any;
}
@connect(({ report }) => ({
  report: report
}))
class IdCard extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '身份证信息',
  }

  componentDidMount = () => {

  }
  onChange = (obj) => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'home/setFormValue',
    //   payload: obj
    // })
  }
  onChangeAddr =(obj) => {
    console.dir(obj)
  }
  render() {
    const { idCard } = this.props.report;
    const rendeForm =
    <View >
      {
        idCard.map((item,index) => {
          if (item.type === 'input') {
            return (
            <View key={item.name} className="form-item">
              <CInput
                {...item}
                onChange={(obj)=>this.onChange({...obj,index:index})}
              />
            </View>)
          }
        })
      }
    </View>
    return (
      <View className="id-card-page">
        {rendeForm}
        <ChooseAddr show={false} onChange={this.onChangeAddr}/>
      </View>
    );
  }
}

export default IdCard;
