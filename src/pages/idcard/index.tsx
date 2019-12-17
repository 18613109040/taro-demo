import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtIcon, AtButton, AtForm } from "taro-ui"
import { connect } from '@tarojs/redux';
import CInput from '../../components/Input';
import Addr from '../../components/Addr';
import Gender from '../../components/Gender';
import DatePicker from '../../components/DatePicker'
import { InitStateProps } from '../../models/report';
import { ChildrenProps } from '../../interface/form';

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
    const { dispatch } = this.props;
    dispatch({
      type: 'report/setIdCardValue',
      payload: obj
    })
  }
  save = () => {
    const { idCard } = this.props.report;
    let number = 0;
    idCard.map(item=>{
      item.children.map(ix=>{
        if(!ix.value){
          ix.error = true
          number++
        }else{
          ix.error = false
        }
      })
    })
   
    if(number==0){
      Taro.navigateBack()
    }else{
      const { dispatch } = this.props;
      dispatch({
        type: 'report/setIdCard',
        payload: idCard
      })
    }
  }
  render() {
    const { idCard } = this.props.report;
    const rendeForm =
      idCard.map((card,index1) => (
        <View key={card.key} className="form-row">
          {
            card.children.map((item:ChildrenProps,index2) => (
              <View className={`form-item ${index2>0? 'pading-form': ''}`} key={item.name}>
                {
                  item.type === 'input' ?
                    <CInput
                      {...item}
                      onChange={(obj) => this.onChange({ ...obj, x:index1, y: index2 })}
                    /> : 
                    item.type === 'date' ?
                    <DatePicker
                      {...item}
                      onChange={(obj) => this.onChange({ ...obj, x:index1, y: index2 })}
                    />:
                    item.type === 'addr' ?
                    <Addr
                      {...item}
                      onChange={(obj) => this.onChange({ ...obj, x:index1, y: index2 })}
                    />:
                    item.type === 'gender' ? 
                    <Gender
                      {...item}
                      onChange={(obj) => this.onChange({ ...obj, x:index1, y: index2 })}
                    />:
                    ''
                }
              </View>
            ))
          }
        </View>
      ))

    return (
      <View className="id-card-page">
        {rendeForm}
        <AtButton type='primary'  onClick={this.save}>保存</AtButton>
      </View>
    );
  }
}

export default IdCard;
