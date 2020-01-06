import Taro, { Component } from '@tarojs/taro';
import { View, Text, Radio, RadioGroup, ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import moment from 'moment'
import CInput from '../../components/Input';
import Addr from '../../components/Addr';
import Gender from '../../components/Gender';
import DatePicker from '../../components/DatePicker'
import { InitStateProps } from '../../models/report';
import { SystemInfoProps } from '../../interface/common'
import './index.scss';
type IState = {
  name: string; // 姓名
  idCard: string; // 身份证号
  sex: string;// 性别
  birthday: string; // 出生日期
  placeOfissue: string;//证件签发地
  effectiveness: boolean;//是否长期有效
  idCardStartDate: string;//身份证开始日期
  idCardEndDate: string; // 身份证结束日期
  idAddrProvince: string; // 身份证省
  idAddrCity: string;//市
  idAddrArea: string; // 区
  idAddrDetails: string; //身份证省市区及详细地址
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
class IdCard extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '身份证信息',
  }
  constructor(props) {
    super(props)
    const { name, idCard, sex, birthday, placeOfissue, idCardStartDate, idCardEndDate, effectiveness, idAddrProvince, idAddrCity, idAddrArea, idAddrDetails } = props.report.formData
    this.state = {
      name: name || '', // 姓名
      idCard: idCard || '', // 身份证号
      sex: sex || '',// 性别
      birthday: birthday || '', // 出生日期
      placeOfissue: placeOfissue || '',//证件签发地
      effectiveness: effectiveness==='0'? false: true,  //是否长期有效
      idCardStartDate: idCardStartDate || '',//身份证开始日期
      idCardEndDate: idCardEndDate || '', // 身份证结束日期
      idAddrProvince: idAddrProvince || '', // 身份证省
      idAddrCity: idAddrCity || '',//市
      idAddrArea: idAddrArea || '', // 区
      idAddrDetails: idAddrDetails || '', //身份证省市区及详细地址
    }
  }
  componentDidMount = () => {

  }

  render() {
    const { name, idCard, sex, birthday, placeOfissue,
      effectiveness, idCardStartDate, idCardEndDate, idAddrProvince,
      idAddrCity, idAddrArea, idAddrDetails} = this.state;
    const { windowHeight } = this.props.systemInfo;
    return (
      <View className="id-card-page">
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${windowHeight}px` }}
        >
          <View className="card-body">
            {/* 姓名 */}
            <CInput
              name='name'
              defaultValue={name}
              label="姓名"
              disabled={true}
              rules={[{
                required: true,
                pattern: /^(([\u4e00-\u9fff]{2,4})|([a-z\.\s\,]{2,50}))$/i,
                message: '请输入正确的姓名!'
              }]}
              // onChange={(obj) => this.onChange({ ...obj, errorKey: 'nameError', valueKey: 'name' })}
            />
            {/* 身份证号 */}
            <View className="id-card-view">
              <CInput
                name='idCard'
                disabled={true}
                defaultValue={idCard}
                label="身份证号"
                rules={[{
                  required: true,
                  pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                  message: '请输入正确的身份证号!'
                }]}
                type="idcard"
                trigger='onChange'
                // onChange={(obj) => this.onChange({ ...obj, errorKey: 'idCardError', valueKey: 'idCard' })}
              />
            </View>

            <View className="flex-row">
              <View className="col">
                {/* 性别 */}
                <Gender
                  label="性别"
                  defaultValue={sex}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择性别!'
                  }]}
                  disabled={true}
                  // onChange={(obj) => this.onChange({ ...obj, errorKey: 'sexError', valueKey: 'sex' })}
                />
              </View>
              <View className="col-right">
                {/*  出生日期 */}
                <DatePicker
                  label="出生日期"
                  defaultValue={birthday}
                  disabled={true}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择出生日期!'
                  }]}
                  end={moment().format('YYYY-MM-DD')}
                  // onChange={(obj) => this.onChange({ ...obj, errorKey: 'birthdayError', valueKey: 'birthday' })}
                />
              </View>
            </View>
            {/* 身份证有效期 */}
            <View className="effectivene-list">
              <Text className="title">身份证有效期</Text>
              <RadioGroup
                name={effectiveness ? '0' : '1'}
              >
                <Radio disabled={true} value={'0'} color="#283282" checked={effectiveness ? true : false}>长期</Radio>
                <Radio  disabled={true} value={'1'} color="#283282" className="radio" checked={effectiveness ? false : true} >非长期</Radio>
              </RadioGroup>
            </View>
            {/* 开始时间 -  结束时间  */}
            <View className="flex-row">
              <View className="col">
                <DatePicker
                  label="开始时间"
                  defaultValue={idCardStartDate}
                  disabled={true}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择开始时间!'
                  }]}
                  end={moment().format('YYYY-MM-DD')}
                  // onChange={(obj) => this.onChange({ ...obj, errorKey: 'idCardStartDateError', valueKey: 'idCardStartDate' })}
                />
              </View>
              {
                !effectiveness && <View className="col-right">
                  <DatePicker
                    label="截止时间"
                    disabled={true}
                    defaultValue={idCardEndDate}
                    rules={[{
                      required: true,
                      // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                      message: '请选择截止时间!'
                    }]}
                    start={moment().format('YYYY-MM-DD')}
                    // onChange={(obj) => this.onChange({ ...obj, errorKey: 'idCardEndDateError', valueKey: 'idCardEndDate' })}
                  />
                </View>
              }
            </View>
            {/* 证件签发地 */}
            <CInput
              name='placeOfissue'
              defaultValue={placeOfissue}
              label="证件签发地"
              disabled={true}
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '请输入证件签发地址!'
              }]}
              trigger='onBlur'
              // onChange={(obj) => this.onChange({ ...obj, errorKey: 'placeOfissueError', valueKey: 'placeOfissue' })}
            />
            <Addr
              label="地址"
              defaultValue={(idAddrProvince || idAddrCity || idAddrArea) ? `${idAddrProvince}/${idAddrCity}/${idAddrArea}` : ''}
              rules={[{
                required: true,
                // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                message: '请选择地址!'
              }]}
              disabled={true}
              // onChange={(obj) => this.onChangeAddr({ ...obj })}
            />
            {/* 详细地址 */}
            <CInput
              name='idAddrDetails'
              defaultValue={idAddrDetails}
              disabled={true}
              label="详细地址"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '请输入详细地址!'
              }]}
              trigger='onBlur'
              // onChange={(obj) => this.onChange({ ...obj, errorKey: 'idAddrDetailsError', valueKey: 'idAddrDetails' })}
            />
            {/* 户籍所在地 */}
            {/* <Addr
              label="户籍地址"
              defaultValue={(censusRegisterProvince || censusRegisterCity || censusRegisterCounty) ? `${censusRegisterProvince}/${censusRegisterCity}/${censusRegisterCounty}` : ''}
              error={censusRegisterError}
              rules={[{
                required: true,
                // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                message: '请选择户籍地址!'
              }]}
              onChange={(obj) => this.onChangeCensusRegister({ ...obj })}
            /> */}
            {/* 详细地址 */}
            {/* <CInput
              name='idAddrDetails'
              defaultValue={censusRegisterAddress}
              label="详细地址"
              rules={[{
                required: true,
                pattern: /^\s*\S{2,}\s*$/,
                message: '请输入详细地址!'
              }]}
              trigger='onBlur'
              error={censusRegisterAddressError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'censusRegisterAddressError', valueKey: 'censusRegisterAddress' })}
            /> */}
          </View>
        </ScrollView>
        {/* <View className="btn-bottom">
          <AtButton type='primary' onClick={this.save}>保存</AtButton>
        </View> */}
      </View>
    );
  }
}

export default IdCard;
