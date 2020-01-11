import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { AtButton, AtModal, AtModalContent, AtModalHeader, AtModalAction } from "taro-ui"
import { connect } from '@tarojs/redux'; 
import CInput from '../../components/Input';
import BasePicker from '../../components/BasePicker'
import { InitStateProps } from '../../models/report';
import { SystemInfoProps } from '../../interface/common'

import './index.scss';
type IState = {
  name: string;// 产品名称
  nameError: boolean;
  applyAmount: string | number;//申请金额
  applyAmountError: boolean;
  repaymentCount: string | number; //期数
  repaymentCountError: boolean;
  periods: Array<any>;
  serviceCharge: string;
  gpsCost: string; 
  productMessage: string; 
  repayment: string; 
  bond: string; 
  isOpened: boolean;
  list:  Array<any>;
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
class Product extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '产品信息',
  }
  constructor(props) {
    super(props)
    const { clProductTypeListStr } = props.report.formData;
    const { name, applyAmount, repaymentCount, serviceCharge,gpsCost,productDescription, repaymentTotalAmount, bond } = clProductTypeListStr
    this.state = {
      name: name || '',// 产品名称
      nameError: false,
      applyAmount: applyAmount || '',//申请金额
      applyAmountError: false,
      repaymentCount: repaymentCount || '', //期数
      repaymentCountError: false,
      periods: [],
      serviceCharge: serviceCharge || '', 
      gpsCost: gpsCost || '', 
      productMessage: productDescription || '', 
      repayment: repaymentTotalAmount || '', 
      bond: bond || '',
      isOpened: false,
      list: []
    }
  }
  componentDidMount = async () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/getProductListAction',
      payload: {}
    })
    const { name } = this.state;
    if(name){
      const res = await dispatch({
        type: 'report/getProductAction',
        payload: {
          productName: name
        }
      })
      const repaymentTimes = res.repaymentTimes.split('.')||[];
      const periods:any = []
      repaymentTimes.map(item=>periods.push({ name: item}))
      this.setState({
        periods: periods,
        productMessage: res.productMessage
      })
    }
    
  }
  onChange = async (obj) => {
    const { error, value, valueKey, errorKey } = obj;
    this.setState({
      [`${errorKey}`]: error,
      [`${valueKey}`]: value
    })
    const { dispatch } = this.props;
    const { repaymentCount, name, applyAmount } = this.state;
    if(valueKey === 'name'){
      if(value === name) return;
      const res = await dispatch({
        type: 'report/getProductAction',
        payload: {
          productName: value
        }
      })
      const repaymentTimes = res.repaymentTimes.split('.')||[];
      const periods:any = []
      repaymentTimes.map(item=>periods.push({ name: item}))
      this.setState({
        periods: periods,
        repaymentCount: '',
        productMessage: res.productMessage,
        gpsCost: '',
        repayment: '',
        serviceCharge: ''
      })
    }else if(valueKey === 'applyAmount' && repaymentCount) {
      const res =  await dispatch({
        type: 'report/getProductComputeAction',
        payload: {
          applyAmount: value,
          phase: repaymentCount,
          name:  name,
          loanAmoun: value
        }
      })
      const { gpsCost, repayment, serviceCharge} = res;
      this.setState({
        gpsCost,
        repayment,
        serviceCharge
      })
    }else if(valueKey === 'repaymentCount' && applyAmount) {
      const res =  await dispatch({
        type: 'report/getProductComputeAction',
        payload: {
          applyAmount: applyAmount,
          phase: value,
          name:  name,
          loanAmoun: applyAmount
        }
      })
      const { gpsCost, repayment, serviceCharge} = res;
      this.setState({
        gpsCost,
        repayment,
        serviceCharge
      })
    }
    
  }
  save = () => {
    const { orderId } =  this.$router.params
    const keys: Array<string> = ['name', 'applyAmount', 'repaymentCount']
    const { name, applyAmount, repaymentCount, bond, nameError, applyAmountError, repaymentCountError, serviceCharge, gpsCost,
      productMessage, repayment } = this.state;
    let temp: IState = this.state;
    keys.map(key => {
      if (!this.state[key]) {
        temp[`${key}Error`] = true
      }
    })
    this.setState({
      ...temp
    }, () => {
      if (!nameError && !applyAmountError &&  !repaymentCountError ) {
        const { dispatch } = this.props;
        dispatch({
          type: 'report/temporaryAction',
          payload: {
            id:orderId, 
            updateStep: 3,
            clProductTypeListStr: JSON.stringify({name, applyAmount, repaymentCount,loanAmount:applyAmount,repaymentTotalAmount: repayment,serviceCharge,gpsCost, productDescription: productMessage, bond })
          }
        }).then(res=>{
          if(res.success){
            Taro.navigateBack()
          }
        })
      }
    })
  }
  showDetail = async () => {
    const { dispatch } = this.props;
    const { repaymentCount, name, applyAmount } = this.state;
    const res =  await dispatch({
      type: 'report/getRepayDetailAction',
      payload: {
        phase: repaymentCount,
        name, 
        loanAmoun: applyAmount
      }
    })
    if(res.success){
      this.setState({
        list: res.obj,
        isOpened: true
      })
    }
  }
  enter = () => {
    this.setState({
      isOpened: false
    })
  }
  render() {
    const { name, applyAmount, repaymentCount, nameError, applyAmountError, repaymentCountError, periods,serviceCharge, gpsCost, productMessage, repayment, bond, isOpened, list  } = this.state;
    const { windowHeight } = this.props.systemInfo;
    const { productList } = this.props.report;
    return (
      <View className="product-card-page">
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${windowHeight - 60}px` }}
        >
          <View className="card-body">
            <BasePicker
              label="产品名称"
              defaultValue={name}
              error={nameError}
              rules={[{
                required: true,
                message: '请选择产品名称!'
              }]}
              range={productList}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'nameError', valueKey: 'name' })}
            />
            <CInput
              name='applyAmount'
              defaultValue={applyAmount}
              label="申请金额"
              type="number"
              trigger="onBlur"
              rules={[{
                required: true,
                message: '请输入申请金额!'
              }]}
              error={applyAmountError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'applyAmountError', valueKey: 'applyAmount' })}
            />
            {/* <CInput
              name='loanAmount'
              defaultValue={loanAmount}
              label="放款金额"
              type="number"
              rules={[{
                required: true,
                message: '放款金额!'
              }]}
              error={loanAmountError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'loanAmountError', valueKey: 'loanAmount' })}
            /> */}
            <BasePicker
              label="期数"
              defaultValue={repaymentCount}
              error={repaymentCountError}
              rules={[{
                required: true,
                message: '请选择期数!'
              }]}
              range={periods}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'repaymentCountError', valueKey: 'repaymentCount' })}
            />
            <CInput
              name='serviceCharge'
              defaultValue={serviceCharge}
              label="租赁服务费"
              disabled={true}
              type="number"
              rules={[{
                required: true,
                message: '请填写租赁服务费!'
              }]}
            />
            <CInput
              name='bond'
              defaultValue={bond}
              label="租赁保证金"
              type="number"
              disabled={true}
              rules={[{
                required: true,
                message: '请填写租赁保证金!'
              }]}
            />
            <CInput
              name='gpsCost'
              defaultValue={gpsCost}
              label="GPS费用"
              disabled={true}
              type="number"
              rules={[{
                required: true,
                message: '请填写GPS费用!'
              }]}
            />
            <CInput
              name='repayment'
              defaultValue={repayment}
              label="总还款金额"
              type="number"
              disabled={true}
              rules={[{
                required: true,
                message: '请填写总还款金额!'
              }]}
            />
            {
              repayment &&<View className="text-detail" onClick={this.showDetail}>
              <Text>还款明细</Text>
            </View>
            }
            {productMessage&&<View className="product-description">
              <View>
                <Text>产品说明</Text>
              </View>
              <View className="description">
                <Text>{productMessage}</Text>
              </View>
            </View>}
          </View>
        </ScrollView>
        <View className="btn-bottom">
          <AtButton type='primary' onClick={this.save}>保存</AtButton>
        </View>
        <AtModal isOpened={isOpened} onClose={this.enter}>
          <AtModalHeader>还款明细</AtModalHeader>
          <AtModalContent>
         
            <View className="at-row at-row__align--center at-row__justify--between">
              <View className="at-col header-title"><Text>期数</Text></View>
              <View className="at-col header-title"><Text>月组金(元)</Text></View>
              <View className="at-col header-title"><Text>管理费</Text></View>
            </View>
            <ScrollView
              scrollY
              scrollWithAnimation
              style={{ height: '300px' }}
            >
            {
              list.map(item=>
                <View className="at-row at-row__align--center at-row__justify--between" key={item.period}>
                  <View className="at-col content-title"><Text>{item.period}</Text></View>
                  <View className="at-col content-title "><Text>{item.monthlyRent}</Text></View>
                  <View className="at-col content-title"><Text>{item.managementExpense}</Text></View>
                </View>
              ) 
            }
            </ScrollView>
          </AtModalContent>
        </AtModal>
      </View>
    );
  }
}

export default Product;
