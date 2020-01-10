import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import CInput from '../../components/Input';
import BasePicker from '../../components/BasePicker'
import { InitStateProps } from '../../models/report';
import { SystemInfoProps } from '../../interface/common'

import './index.scss';
type IState = {
  bankNoType: string; //银行卡类型
  bankNoTypeError: boolean;
  accountName: string; //开户名
  accountNameError: boolean;
  bankPhone: string;//银行预留手机号
  bankPhoneError: boolean;
  openingBank: string; //开户行
  openingBankError: boolean;
  accountOpeningBranch: string; //开户支行
  accountOpeningBranchError: boolean;
  bankNo: string; //联行号
  bankNoError: boolean;
  repaymentAccount: string; //还款账号
  repaymentAccountError: boolean;
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
class BankCard extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '还款信息',
  }
  constructor(props) {
    super(props)
    const { clCollectGatheringInfoListStr } = props.report.formData;
    const { bankNoType, accountName, bankPhone, openingBank, accountOpeningBranch, bankNo, repaymentAccount } = clCollectGatheringInfoListStr
    this.state = {
      bankNoType: bankNoType || '',//银行卡类型
      bankNoTypeError: false,
      accountName: accountName || '', //开户名
      accountNameError: false,
      bankPhone: bankPhone || '', //银行预留手机号
      bankPhoneError: false,
      openingBank: openingBank || '', //开户行
      openingBankError: false,
      accountOpeningBranch: accountOpeningBranch || '', //开户支行
      accountOpeningBranchError: false,
      bankNo: bankNo || '', //联行号
      bankNoError: false,
      repaymentAccount: repaymentAccount || '', //还款账号
      repaymentAccountError: false
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
    const { orderId } =  this.$router.params
    const keys: Array<string> = ['bankNoType', 'accountName', 'bankPhone', 'openingBank', 'accountOpeningBranch', 'bankNo', 'repaymentAccount']
    const { bankNoType, accountName, bankPhone, openingBank, accountOpeningBranch, bankNo, repaymentAccount } = this.state;
    let temp: IState = this.state;
    keys.map(key => {
      if (!this.state[key]) {
        temp[`${key}Error`] = true
      }
    })
    this.setState({
      ...temp
    }, () => {
      const { bankNoTypeError, accountNameError, bankPhoneError, openingBankError, accountOpeningBranchError, repaymentAccountError } = this.state;
      if (!bankNoTypeError && !accountNameError && !bankPhoneError && !openingBankError && !accountOpeningBranchError && !repaymentAccountError) {
        const { dispatch } = this.props;
        dispatch({
          type: 'report/temporaryAction',
          payload: {
            id:orderId, 
            updateStep: 4,
            clCollectGatheringInfoListStr: JSON.stringify({bankNoType, accountName, bankPhone, openingBank, accountOpeningBranch, bankNo, repaymentAccount})
          }
        }).then(res=>{
          Taro.navigateBack()
          if(res.success){
            dispatch({
              type: 'report/setBankInfo',
              payload: {
                bankNoType, accountName, bankPhone, openingBank, accountOpeningBranch, bankNo, repaymentAccount,
              }
            })
          }
        })
      
      }
    })
  }

  render() {
    const {
      bankNoType, accountName, bankPhone, openingBank, accountOpeningBranch, bankNo, repaymentAccount,
      bankNoTypeError, accountNameError, bankPhoneError, openingBankError, accountOpeningBranchError, bankNoError, repaymentAccountError
    } = this.state;
    const productsOptions = [{ name: '1类卡' }]
    const { windowHeight } = this.props.systemInfo;
    return (
      <View className="product-card-page">
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${windowHeight - 60}px` }}
        >
          <View className="card-body">
            <BasePicker
              label="银行卡类型"
              defaultValue={bankNoType}
              error={bankNoTypeError}
              rules={[{
                required: true,
                message: '请选择银行卡类型!'
              }]}
              range={productsOptions}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'bankNoTypeError', valueKey: 'bankNoType' })}
            />
            {/* <BasePicker
              label="收款账户类型"
              defaultValue={bankType}
              error={bankTypeError}
              rules={[{
                required: true,
                message: '请选择收款账户类型!'
              }]}
              range={bankTypeOptions}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'bankTypeError', valueKey: 'bankType' })}
            /> */}
            <CInput
              name='accountName'
              defaultValue={accountName}
              label="开户名"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '请输入开户名!'
              }]}
              trigger='onBlur'
              error={accountNameError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'accountNameError', valueKey: 'accountName' })}
            />
            <CInput
              name='bankPhone'
              defaultValue={bankPhone}
              label="银行预留手机号"
              rules={[{
                required: true,
                pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
                message: '请输入银行预留手机号!'
              }]}
              trigger='onBlur'
              type="number"
              error={bankPhoneError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'bankPhoneError', valueKey: 'bankPhone' })}
            />
            <CInput
              name='openingBank'
              defaultValue={openingBank}
              label="开户行"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '请输入开户行!'
              }]}
              trigger='onBlur'
              error={openingBankError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'openingBankError', valueKey: 'openingBank' })}
            />
            <CInput
              name='accountOpeningBranch'
              defaultValue={accountOpeningBranch}
              label="开户支行"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '请输入开户支行!'
              }]}
              trigger='onBlur'
              error={accountOpeningBranchError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'accountOpeningBranchError', valueKey: 'accountOpeningBranch' })}
            />
            <CInput
              name='bankNo'
              defaultValue={bankNo}
              label="联行号"
              rules={[{
                required: true,
                // pattern: /^([1-9]{1})(\d{15}|\d{18})$/,
                message: '请输入联行号!'
              }]}
              // trigger='onBlur'
              type="number"
              error={bankNoError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'bankNoError', valueKey: 'bankNo' })}
            />
            <CInput
              name='repaymentAccount'
              defaultValue={repaymentAccount}
              label="收款还款账号"
              rules={[{
                required: true,
                pattern: /^([1-9]{1})(\d{15}|\d{18})$/,
                message: '请输入还款账号!'
              }]}
              trigger='onBlur'
              type="idcard"
              error={repaymentAccountError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'repaymentAccountError', valueKey: 'repaymentAccount' })}
            />
          </View>
        </ScrollView>
        <View className="btn-bottom">
          <AtButton type='primary' onClick={this.save}>保存</AtButton>
        </View>
      </View>
    );
  }
}

export default BankCard;
