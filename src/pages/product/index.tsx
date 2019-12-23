import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import CInput from '../../components/Input';
import BasePicker from '../../components/BasePicker'
import { InitStateProps } from '../../models/report';

import './index.scss';
type IState = {
  name: string;// 产品名称
  nameError: boolean;
  applyAmount: string | number;//申请金额
  applyAmountError: boolean;
  loanAmount: string | number; //放款金额
  loanAmountError: boolean;
  repaymentCount: string | number; //期数
  repaymentCountError: boolean;
  repaymentTotalAmount: string | number; //总还款金额
  repaymentTotalAmountError: boolean;
  bond: string | number;//租赁保证金
  bondError: boolean;
  gpsCost: string | number;//GPS费用
  gpsCostError: boolean;
  productDescription: string; //产品说明
}
type IProps = {
  report: InitStateProps;
  dispatch?: any;
}
@connect(({ report }) => ({
  report: report
}))
class Product extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '产品信息',
  }
  constructor(props) {
    super(props)
    const { clProductTypeListStr } = props.report.formData;
    const { name, applyAmount, loanAmount, repaymentCount, repaymentTotalAmount, bond, gpsCost, productDescription } = clProductTypeListStr
    this.state = {
      name: name||'',// 产品名称
      nameError: false,
      applyAmount: applyAmount||'',//申请金额
      applyAmountError: false,
      loanAmount: loanAmount||'', //放款金额
      loanAmountError: false,
      repaymentCount: repaymentCount||'', //期数
      repaymentCountError: false,
      repaymentTotalAmount: repaymentTotalAmount||'', //总还款金额
      repaymentTotalAmountError: false,
      bond: bond||'',//租赁保证金
      bondError: false,
      gpsCost: gpsCost||'',//GPS费用
      gpsCostError: false,
      productDescription: productDescription||'' //产品说明
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
    const keys: Array<string> = ['name', 'applyAmount', 'loanAmount', 'repaymentCount', 'repaymentTotalAmount', 'bond', 'gpsCost']
    const { name, applyAmount, loanAmount, repaymentCount, repaymentTotalAmount, bond, gpsCost, productDescription } = this.state;
    let temp: IState = this.state;
    keys.map(key => {
      if (!this.state[key]) {
        temp[`${key}Error`] = true
      }
    })
    this.setState({
      ...temp
    }, () => {
      const { nameError, applyAmountError, loanAmountError, repaymentCountError, repaymentTotalAmountError, bondError, gpsCostError } = this.state;
      if (!nameError && !applyAmountError && !loanAmountError && !repaymentCountError && !repaymentTotalAmountError && !bondError && !gpsCostError ) {
        Taro.navigateBack()
        const { dispatch } = this.props;
        dispatch({
          type: 'report/setProductInfo',
          payload: {
            name, applyAmount, loanAmount, repaymentCount, repaymentTotalAmount, bond, gpsCost, productDescription 
          }
        })
      }
    })
  }

  render() {
    const { name, applyAmount, loanAmount, repaymentCount, repaymentTotalAmount, bond, gpsCost, productDescription, 
      nameError, applyAmountError, loanAmountError, repaymentCountError, repaymentTotalAmountError, bondError, gpsCostError } = this.state;
    const productsOptions = [{ name: '产品1' }]
    const repaymentCountOptions = [{name: '24'}]
    return (
      <View className="product-card-page">
        <BasePicker
          label="产品名称"
          defaultValue={name}
          error={nameError}
          rules={[{
            required: true,
            message: '请选择产品名称!'
          }]}
          range={productsOptions}
          onChange={(obj) => this.onChange({ ...obj, errorKey: 'nameError', valueKey: 'name' })}
        />
        <CInput
          name='applyAmount'
          defaultValue={applyAmount}
          label="申请金额"
          type="number"
          rules={[{
            required: true,
            message: '请输入申请金额!'
          }]}
          error={applyAmountError}
          onChange={(obj) => this.onChange({ ...obj, errorKey: 'applyAmountError', valueKey: 'applyAmount' })}
        />
        <CInput
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
        />
        <BasePicker
          label="期数"
          defaultValue={repaymentCount}
          error={repaymentCountError}
          rules={[{
            required: true,
            message: '请选择期数!'
          }]}
          range={repaymentCountOptions}
          onChange={(obj) => this.onChange({ ...obj, errorKey: 'repaymentCountError', valueKey: 'repaymentCount' })}
        />
        <CInput
          name='repaymentTotalAmount'
          defaultValue={repaymentTotalAmount}
          label="总还款金额"
          type="number"
          rules={[{
            required: true,
            message: '请填写总还款金额!'
          }]}
          error={repaymentTotalAmountError}
          onChange={(obj) => this.onChange({ ...obj, errorKey: 'repaymentTotalAmountError', valueKey: 'repaymentTotalAmount' })}
        />
        <CInput
          name='bond'
          defaultValue={bond}
          label="租赁保证金"
          type="number"
          rules={[{
            required: true,
            message: '请填写租赁保证金!'
          }]}
          error={bondError}
          onChange={(obj) => this.onChange({ ...obj, errorKey: 'bondError', valueKey: 'bond' })}
        />
        <CInput
          name='gpsCost'
          defaultValue={gpsCost}
          label="GPS费用"
          type="number"
          rules={[{
            required: true,
            message: '请填写GPS费用!'
          }]}
          error={gpsCostError}
          onChange={(obj) => this.onChange({ ...obj, errorKey: 'gpsCostError', valueKey: 'gpsCost' })}
        />
        <View className="product-description">
          <View>
            <Text>产品说明</Text>
          </View>
          <View className="description">
            <Text>{productDescription}</Text>
          </View>
        </View>
        <AtButton type='primary' onClick={this.save}>保存</AtButton>
      </View>
    );
  }
}

export default Product;
