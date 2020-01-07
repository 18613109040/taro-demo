import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { AtButton, AtSwitch } from "taro-ui"
import { connect } from '@tarojs/redux';
import CInput from '../../components/Input';
import BasePicker from '../../components/BasePicker'
import { InitStateProps } from '../../models/report';
import { SystemInfoProps } from '../../interface/common'

import './index.scss';
type IState = {
  contactName1: string; // 联系人姓名1
  contactName1Error: boolean;
  contactRelationship1: string; //联系人借款人关系1
  contactRelationship1Error: boolean;
  contactPhone1: string; //联系人手机号1
  contactPhone1Error: boolean;
  contactIdCard1: string;  // 联系人身份证号1
  contactIdCard1Error: boolean;
  contactName2: string;  // 联系人姓名2
  contactName2Error: boolean;
  contactRelationship2: string; //联系人借款人关系2
  contactRelationship2Error: boolean;
  contactPhone2: string; //联系人手机号2
  contactIdCard2Error: boolean;
  contactPhone2Error: boolean;
  contactIdCard2: string;  // 联系人身份证号2
  contactName3: string;  // 联系人姓名3
  contactName3Error: boolean;
  contactRelationship3: string; //联系人借款人关系3
  contactRelationship3Error: boolean;
  contactPhone3: string; //联系人手机号3
  contactPhone3Error: boolean;
  contactIdCard3Error: boolean;
  contactIdCard3: string;  // 联系人身份证号3
  check: string;
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
class Contact extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '联系人信息',
  }
  constructor(props) {
    super(props)
    const { contactName1, contactRelationship1, contactPhone1, contactIdCard1, contactName2, contactRelationship2, contactPhone2, contactIdCard2,
      contactName3, contactRelationship3, contactPhone3, contactIdCard3 } = props.report.formData
    const check = contactIdCard1 ? '1' : contactIdCard2 ? '2' : contactIdCard3 ? '3' : '0'
    this.state = {
      contactName1: contactName1 || '', // 联系人姓名1
      contactName1Error: false,
      contactRelationship1: contactRelationship1 || '', //联系人借款人关系1
      contactRelationship1Error: false,
      contactPhone1: contactPhone1 || '', //联系人手机号1
      contactPhone1Error: false,
      contactIdCard1: contactIdCard1 || '', // 联系人身份证号1
      contactIdCard1Error: false,
      contactName2: contactName2 || '', // 联系人姓名2
      contactName2Error: false,
      contactRelationship2: contactRelationship2 || '', //联系人借款人关系2
      contactRelationship2Error: false,
      contactPhone2: contactPhone2 || '', //联系人手机号2
      contactPhone2Error: false,
      contactIdCard2: contactIdCard2 || '', // 联系人身份证号2
      contactIdCard2Error: false,
      contactName3: contactName3 || '', // 联系人姓名3
      contactName3Error: false,
      contactRelationship3: contactRelationship3 || '', //联系人借款人关系3
      contactRelationship3Error: false,
      contactPhone3: contactPhone3 || '', //联系人手机号3
      contactPhone3Error: false,
      contactIdCard3: contactIdCard3 || '', // 联系人身份证号3
      contactIdCard3Error: false,
      check: check || '0',
    }
  }
  componentDidMount = () => {

  }
  save = () => {
    const { orderId } =  this.$router.params
    const keys: Array<string> = ['contactName1', 'contactRelationship1', 'contactPhone1', 'contactIdCard1',
      'contactName2', 'contactRelationship2', 'contactPhone2', 'contactIdCard2',
      'contactName3', 'contactRelationship3', 'contactPhone3', 'contactIdCard3',]
    const { check, contactName1, contactRelationship1, contactPhone1, contactIdCard1, contactName2, contactRelationship2, contactPhone2, contactIdCard2,
      contactName3, contactRelationship3, contactPhone3, contactIdCard3 } = this.state;
    let temp: IState = this.state;
    keys.map(key => {
      if (!this.state[key]) {
        if ((key === 'contactIdCard1' || key === 'contactIdCard2' || key === 'contactIdCard3')) {
          if (check == '1' && key === 'contactIdCard1') temp.contactIdCard1Error = true
          if (check == '2' && key === 'contactIdCard2') temp.contactIdCard2Error = true
          if (check == '3' && key === 'contactIdCard3') temp.contactIdCard3Error = true
        } else {
          temp[`${key}Error`] = true
        }
      }
    })
    this.setState({
      ...temp
    }, () => {
      const { contactName1Error, contactRelationship1Error, contactPhone1Error, contactIdCard1Error,
        contactName2Error, contactRelationship2Error, contactPhone2Error, contactIdCard2Error,
        contactName3Error, contactRelationship3Error, contactPhone3Error, contactIdCard3Error } = this.state;
      if (!contactName1Error && !contactRelationship1Error && !contactPhone1Error && !contactName2Error && !contactRelationship2Error && !contactPhone2Error &&
        !contactName3Error && !contactRelationship3Error && !contactPhone3Error && !contactIdCard1Error && !contactIdCard2Error && !contactIdCard3Error) {
        const { dispatch } = this.props;
        dispatch({
          type: 'report/temporaryAction',
          payload: {
            id:orderId, 
            updateStep: 0,
            contactName1, contactRelationship1, contactPhone1, contactIdCard1, contactName2, contactRelationship2, contactPhone2, contactIdCard2,
            contactName3, contactRelationship3, contactPhone3, contactIdCard3
          }
        }).then((res)=>{
          if(res.success){
            Taro.navigateBack()
            // dispatch({
            //   type: 'report/setFormData',
            //   payload: {
            //     contactName1, contactRelationship1, contactPhone1, contactIdCard1, contactName2, contactRelationship2, contactPhone2, contactIdCard2,
            //     contactName3, contactRelationship3, contactPhone3, contactIdCard3
            //   }
            // })
            const { clGuaranteeInfoListStr } = this.props.report.formData
            if (check && check !== '0' && clGuaranteeInfoListStr && !clGuaranteeInfoListStr.name) {
              dispatch({
                type: 'report/setGuarantee',
                payload: {
                  name: this.state[`contactName${check}`],
                  relationship: this.state[`contactRelationship${check}`],
                  phone: this.state[`contactPhone${check}`],
                  cardId: this.state[`contactIdCard${check}`],
                }
              })
            }
          }
        })
       
      }
    })
  }
  onChange = (obj) => {
    const { error, value, valueKey, errorKey } = obj;
    const { contactPhone1, contactPhone2, contactPhone3 } = this.state;
    if (valueKey === 'contactPhone1' && (value === contactPhone2 || value === contactPhone3)) {
      this.setState({
        contactPhone1Error: true,
        [`${valueKey}`]: value
      })
    } else if (valueKey === 'contactPhone2' && (value === contactPhone1 || value === contactPhone3)) {
      this.setState({
        contactPhone2Error: true,
        [`${valueKey}`]: value
      })
    } else if (valueKey === 'contactPhone3' && (value === contactPhone1 || value === contactPhone2)) {
      this.setState({
        contactPhone3Error: true,
        [`${valueKey}`]: value
      })
    } else {
      this.setState({
        [`${errorKey}`]: error,
        [`${valueKey}`]: value
      })
    }
  }
  changeCheck = (value) => {
    if (this.state.check === value) {
      value = ''
    }
    this.setState({
      check: value,
      contactIdCard1: '',
      contactIdCard2: '',
      contactIdCard3: '',
      contactIdCard1Error: false,
      contactIdCard2Error: false,
      contactIdCard3Error: false,
    })
  }
  render() {
    const { marriage } = this.props.report.formData
    const contactRelationshipOptions = marriage ? [{ name: '配偶' }, { name: '父母' }, { name: '子女' }, { name: '亲戚' }, { name: '朋友' }] : [{ name: '父母' }, { name: '子女' }, { name: '亲戚' }, { name: '朋友' }]
    const { check, contactName1, contactName1Error, contactRelationship1, contactRelationship1Error, contactPhone1, contactPhone1Error,
      contactName2, contactName2Error, contactRelationship2, contactRelationship2Error, contactPhone2, contactPhone2Error,
      contactName3, contactName3Error, contactRelationship3, contactRelationship3Error, contactPhone3, contactPhone3Error,
      contactIdCard1, contactIdCard1Error, contactIdCard2, contactIdCard2Error, contactIdCard3, contactIdCard3Error } = this.state;
    const { windowHeight } = this.props.systemInfo;
    return (
      <View className="contact-card-page">
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${windowHeight - 60}px` }}
        >

          <View className="title">
            <Text className="name">联系人1</Text>
            <View className="check">
              <AtSwitch
                border={false}
                title='是否选择为担保人'
                onChange={() => this.changeCheck('1')}
                checked={check === '1' ? true : false}
              />
            </View>
          </View>
          <View className="card">
            <View className="flex-row">
              <View className="col">
                <CInput
                  name='contactName1'
                  defaultValue={contactName1}
                  label="姓名"
                  rules={[{
                    required: true,
                    pattern: /^(([\u4e00-\u9fff]{2,4})|([a-z\.\s\,]{2,50}))$/i,
                    message: '请输入联系人姓名!'
                  }]}
                  error={contactName1Error}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactName1Error', valueKey: 'contactName1' })}
                />
              </View>
              <View className="col-right">
                <BasePicker
                  label="与借款人关系"
                  defaultValue={contactRelationship1}
                  error={contactRelationship1Error}
                  rules={[{
                    required: true,
                    message: '请选择与借款人关系!'
                  }]}
                  range={contactRelationshipOptions}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactRelationship1Error', valueKey: 'contactRelationship1' })}
                />
              </View>
            </View>
            <CInput
              name='contactPhone1'
              defaultValue={contactPhone1}
              label="手机号"
              type="number"
              rules={[{
                required: true,
                pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
                message: '手机格式不正确或者与其他联系人重复!'
              }]}
              error={contactPhone1Error}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactPhone1Error', valueKey: 'contactPhone1' })}
            />
            {
              check === '1' && <CInput
                name='contactIdCard1'
                defaultValue={contactIdCard1}
                label="身份证号"
                rules={[{
                  required: true,
                  pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                  message: '请输入正确的身份证号!'
                }]}
                type="idcard"
                trigger='onChange'
                error={contactIdCard1Error}
                onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactIdCard1Error', valueKey: 'contactIdCard1' })}
              />
            }
          </View>
          <View className="title">
            <Text className="name">联系人2</Text>
            <View className="check">
              <AtSwitch
                border={false}
                title='是否选择为担保人'
                checked={check === '2' ? true : false}
                onChange={() => this.changeCheck('2')}
              />
            </View>
          </View>
          <View className="card">
            <View className="flex-row">
              <View className="col">
                <CInput
                  name='contactName2'
                  defaultValue={contactName2}
                  label="姓名"
                  rules={[{
                    required: true,
                    pattern: /^(([\u4e00-\u9fff]{2,4})|([a-z\.\s\,]{2,50}))$/i,
                    message: '请输入联系人姓名!'
                  }]}
                  error={contactName2Error}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactName2Error', valueKey: 'contactName2' })}
                />
              </View>
              <View className="col-right">
                <BasePicker
                  label="与借款人关系"
                  defaultValue={contactRelationship2}
                  error={contactRelationship2Error}
                  rules={[{
                    required: true,
                    message: '请选择与借款人关系!'
                  }]}
                  range={contactRelationshipOptions}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactRelationship2Error', valueKey: 'contactRelationship2' })}
                />
              </View>
            </View>
            <CInput
              name='contactPhone1'
              defaultValue={contactPhone2}
              label="手机号"
              type="number"
              rules={[{
                required: true,
                pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
                message: '手机格式不正确或者与其他联系人重复!'
              }]}
              error={contactPhone2Error}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactPhone2Error', valueKey: 'contactPhone2' })}
            />
            {
              check === '2' && <CInput
                name='contactIdCard2'
                defaultValue={contactIdCard2}
                label="身份证号"
                rules={[{
                  required: true,
                  pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                  message: '请输入正确的身份证号!'
                }]}
                type="idcard"
                trigger='onChange'
                error={contactIdCard2Error}
                onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactIdCard2Error', valueKey: 'contactIdCard2' })}
              />
            }
          </View>


          <View className="title">
            <Text className="name">联系人3</Text>
            <View className="check">
              <AtSwitch
                border={false}
                title='是否选择为担保人'
                onChange={() => this.changeCheck('3')}
                checked={check === '3' ? true : false}
              />
            </View>
          </View>
          <View className="card">
            <View className="flex-row">
              <View className="col">
                <CInput
                  name='contactName3'
                  defaultValue={contactName3}
                  label="姓名"
                  rules={[{
                    required: true,
                    pattern: /^(([\u4e00-\u9fff]{2,4})|([a-z\.\s\,]{2,50}))$/i,
                    message: '请输入联系人姓名!'
                  }]}
                  error={contactName3Error}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactName3Error', valueKey: 'contactName3' })}
                />
              </View>
              <View className="col-right">
                <BasePicker
                  label="与借款人关系"
                  defaultValue={contactRelationship3}
                  error={contactRelationship3Error}
                  rules={[{
                    required: true,
                    message: '请选择与借款人关系!'
                  }]}
                  range={contactRelationshipOptions}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactRelationship3Error', valueKey: 'contactRelationship3' })}
                />
              </View>
            </View>
            <CInput
              name='contactPhone3'
              defaultValue={contactPhone3}
              label="手机号"
              type="number"
              rules={[{
                required: true,
                pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
                message: '手机格式不正确或者与其他联系人重复!'
              }]}
              error={contactPhone3Error}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactPhone3Error', valueKey: 'contactPhone3' })}
            />
            {
              check === '3' && <CInput
                name='contactIdCard3'
                defaultValue={contactIdCard3}
                label="身份证号"
                rules={[{
                  required: true,
                  pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                  message: '请输入正确的身份证号!'
                }]}
                type="idcard"
                trigger='onChange'
                error={contactIdCard3Error}
                onChange={(obj) => this.onChange({ ...obj, errorKey: 'contactIdCard3Error', valueKey: 'contactIdCard3' })}
              />
            }
          </View>
        </ScrollView>
        <View className="btn-bottom">
          <AtButton type='primary' onClick={this.save}>保存</AtButton>
        </View>
      </View>
    );
  }
}

export default Contact;
