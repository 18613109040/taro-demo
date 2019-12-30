// 材料准备
import Taro, { PureComponent } from '@tarojs/taro';
import { View, Text, Image, Radio, RadioGroup } from '@tarojs/components';
import { AtIcon, AtButton, AtImagePicker, AtLoading } from "taro-ui"
import moment from 'moment'
import CInput from '../../components/Input';
import Addr from '../../components/Addr';
import Gender from '../../components/Gender';
import DatePicker from '../../components/DatePicker'
import { connect } from '@tarojs/redux';
import './index.scss';
type IState = {
  idCardPositiveUrl: string;
  idCardReverseUrl: string;
  bankCardPositiveUrl: string;
  bankCardReverseUrl: string;
  name: string; // 姓名
  nameError: boolean;
  idCard: string; // 身份证号
  idCardError: boolean;
  sex: string;// 性别
  sexError: boolean;
  birthday: string; // 出生日期
  birthdayError: boolean;
  placeOfissue: string;//证件签发地
  placeOfissueError: boolean;
  effectiveness: boolean;//是否长期有效
  idCardStartDate: string;//身份证开始日期
  idCardStartDateError: boolean;
  idCardEndDate: string; // 身份证结束日期
  idCardEndDateError: boolean;
  idAddrProvince: string; // 身份证省
  idAddrCity: string;//市
  idAddrArea: string; // 区
  idAddrError: boolean;
  idAddrDetails: string; //身份证省市区及详细地址
  validateStatus: string;
  idCardMsg: string;
  isDriverLicense: boolean;
  phone: string; //手机号
  phoneError: boolean;
  bankNo: string; //联行号
  bankNoError: boolean;
  [key: string]: string | boolean;
}
type IProps = {
  dispatch: any;
}
@connect(({ }) => ({

}))
class FastApproval extends PureComponent<IProps, IState>{
  config = {
    navigationBarTitleText: '资料填写',
  }
  constructor(props) {
    super(props)
    this.state = {
      idCardPositiveUrl: '',
      idCardReverseUrl: '',
      bankCardPositiveUrl: '',
      bankCardReverseUrl: '',
      name:  '', // 姓名
      nameError: false,
      idCard: '', // 身份证号
      idCardError: false,
      sex: '',// 性别
      sexError: false,
      birthday: '', // 出生日期
      birthdayError: false,
      placeOfissue: '',//证件签发地
      placeOfissueError: false,
      effectiveness: false,  //是否长期有效
      idCardStartDate: '',//身份证开始日期
      idCardStartDateError: false,
      idCardEndDate: '', // 身份证结束日期
      idCardEndDateError: false,
      idAddrProvince: '', // 身份证省
      idAddrCity: '',//市
      idAddrArea: '', // 区
      idAddrError: false,
      idAddrDetails: '', //身份证省市区及详细地址
      idAddrDetailsError: false,
      validateStatus: '',
      idCardMsg: '请输入正确的身份证号!',
      isDriverLicense: true,
      phone: '', //手机号
      phoneError: false,
      bankNo:  '', //联行号
      bankNoError: false,
    }
  }
  componentDidMount = () => {

  }

  // 小程序上拉加载
  onReachBottom() {

  }
  goToUserInfo = () => {

  }
  onChangeImge = (key) => {
    Taro.chooseImage({
      sourceType: ['album', 'camera'],
      count: 1,
      success: (res) => {
        this.setState({
          [`${key}`]: res.tempFiles[0].path
        })
      }
    })
  }
  onChange = async (obj) => {
    const { error, value, valueKey, errorKey } = obj;
    if (valueKey === 'idCard') {
      if (!error) {
        this.setState({
          validateStatus: 'validating',
          idCard: value
        })
        const { dispatch } = this.props;
        const res = await dispatch({
          type: 'report/validRepetitionAction',
          payload: {
            idCard: value,
            id: ''
          }
        })
        const { success, obj } = res
        if (success && obj && obj.length === 0) {
          this.setState({
            validateStatus: 'success',
            idCardError: false,
            idCardMsg: '请输入正确的身份证号!'
          })
        } else {
          this.setState({
            validateStatus: '',
            idCardError: true,
            idCardMsg: '该身份证号已经存在系统中'
          })
        }
      }
    } else {
      this.setState({
        [`${errorKey}`]: error,
        [`${valueKey}`]: value
      })
    }

  }
  effectivenessChange = (e) => {
    const { value } = e.target;
    this.setState({
      effectiveness: value === '0' ? true : false
    })
  }
  onChangeAddr = (obj) => {
    const { error, value } = obj;
    this.setState({
      idAddrError: error,
      idAddrProvince: value[0].name,
      idAddrCity: value[1].name,
      idAddrArea: value[2].name,
    })
  }
  driverLicenseChange = (e) => {
    const { value } = e.target;
    this.setState({
      isDriverLicense: value === '0' ? true : false
    })
  }
  close = (key) => {
    this.setState({
      [`${key}`]: ''
    })
  }
  save = () => {
    
  }
  render() {
    const { idCardPositiveUrl, idCardReverseUrl, bankCardPositiveUrl, bankCardReverseUrl, name, nameError, idCard, idCardError, sex, sexError, birthday, birthdayError, placeOfissue, placeOfissueError,
      effectiveness, idCardStartDate, idCardStartDateError, idCardEndDate, idCardEndDateError, idAddrProvince,
      idAddrCity, idAddrArea, idAddrError, idAddrDetails, idAddrDetailsError, validateStatus, idCardMsg, isDriverLicense, phone, phoneError,
      bankNo, bankNoError
     } = this.state;
    return (
      <View className="fast-approval-page">
        <View className='header at-row at-row__align--center'>
          <AtIcon value="verticalline" size="20" prefixClass='iconfont' color="#4984FD" />
          <View className="title">身份证识别</View>
        </View>
        <View className='card at-row at-row__align--center at-row__justify--between'>
          <View>

            {
              idCardPositiveUrl ?
                <View className="preview">
                  <Image className="id-card_image" src={idCardPositiveUrl} />
                  <View className="close" onClick={() => this.close('idCardPositiveUrl')}>
                    <AtIcon value="close" size="20" prefixClass='iconfont' color="#d0d3d9" />
                  </View>

                </View> :
                <AtIcon onClick={() => this.onChangeImge('idCardPositiveUrl')} value="idcardpositive" size="100" prefixClass='iconfont' color="#d0d3d9" />

            }
            <View className="name">上传身份证正面</View>
          </View>
          <View>
            {
              idCardReverseUrl ?
                <View className="preview">
                  <Image className="id-card_image" src={idCardReverseUrl} />
                  <View className="close" onClick={() => this.close('idCardReverseUrl')}>
                    <AtIcon value="close" size="20" prefixClass='iconfont' color="#d0d3d9" />
                  </View>

                </View> :
                <AtIcon onClick={() => this.onChangeImge('idCardReverseUrl')} value="idcardreverse" size="100" prefixClass='iconfont' color="#d0d3d9" />

            }
            <View className="name">上传身份证反面</View>
          </View>
        </View>

        <View className='header at-row at-row__align--center'>
          <AtIcon value="verticalline" size="20" prefixClass='iconfont' color="#4984FD" />
          <View className="title">银行卡识别</View>
        </View>
        <View className='card at-row at-row__align--center at-row__justify--between'>
          <View>

            {
              bankCardPositiveUrl ?
                <View className="preview">
                  <Image className="id-card_image" src={bankCardPositiveUrl} />
                  <View className="close" onClick={() => this.close('bankCardPositiveUrl')}>
                    <AtIcon value="close" size="20" prefixClass='iconfont' color="#d0d3d9" />
                  </View>

                </View> :
                <AtIcon onClick={() => this.onChangeImge('bankCardPositiveUrl')} value="bankCardpositive" size="90" prefixClass='iconfont' color="#d0d3d9" />

            }
            <View className="name">上传银行卡正面</View>
          </View>
          <View>
            {
              bankCardReverseUrl ?
                <View className="preview">
                  <Image className="id-card_image" src={bankCardReverseUrl} />
                  <View className="close" onClick={() => this.close('bankCardReverseUrl')}>
                    <AtIcon value="close" size="20" prefixClass='iconfont' color="#d0d3d9" />
                  </View>

                </View> :
                <AtIcon onClick={() => this.onChangeImge('bankCardReverseUrl')} value="bankCardreverse" size="90" prefixClass='iconfont' color="#d0d3d9" />

            }
            <View className="name">上传银行卡反面</View>
          </View>
        </View>

        <View className='header at-row at-row__align--center'>
          <AtIcon value="verticalline" size="20" prefixClass='iconfont' color="#4984FD" />
          <View className="title">基本信息</View>
        </View>
        <View className="user-info">
          {/* 姓名 */}
          <CInput
            name='name'
            defaultValue={name}
            label="姓名"
            rules={[{
              required: true,
              pattern: /^(([\u4e00-\u9fff]{2,4})|([a-z\.\s\,]{2,50}))$/i,
              message: '请输入正确的姓名!'
            }]}
            error={nameError}
            onChange={(obj) => this.onChange({ ...obj, errorKey: 'nameError', valueKey: 'name' })}
          />
          {/* 身份证号 */}
          <View className="id-card-view">
            <CInput
              name='idCard'
              defaultValue={idCard}
              label="身份证号"
              rules={[{
                required: true,
                pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                message: idCardMsg//'请输入正确的身份证号!'
              }]}
              type="idcard"
              trigger='onChange'
              error={idCardError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'idCardError', valueKey: 'idCard' })}
            />
            {/* <AtIcon value='loading' size='30' color='#F00' /> */}
            {
              validateStatus === 'validating' ?
                <View className="loading">
                  <AtLoading />
                </View> : validateStatus === 'success' ? <View className="loading"> <AtIcon value='check' size='20' color="#283282" /> </View> : ''
            }

          </View>

          <View className="flex-row">
            <View className="col">
              {/* 性别 */}
              <Gender
                label="性别"
                defaultValue={sex}
                error={sexError}
                rules={[{
                  required: true,
                  // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                  message: '请选择性别!'
                }]}
                onChange={(obj) => this.onChange({ ...obj, errorKey: 'sexError', valueKey: 'sex' })}
              />
            </View>
            <View className="col-right">
              {/*  出生日期 */}
              <DatePicker
                label="出生日期"
                defaultValue={birthday}
                error={birthdayError}
                rules={[{
                  required: true,
                  // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                  message: '请选择出生日期!'
                }]}
                end={moment().format('YYYY-MM-DD')}
                onChange={(obj) => this.onChange({ ...obj, errorKey: 'birthdayError', valueKey: 'birthday' })}
              />
            </View>
          </View>
          {/* 身份证有效期 */}
          <View className="effectivene-list">
            <Text className="title">身份证有效期</Text>
            <RadioGroup
              name={effectiveness ? '0' : '1'}
              onChange={this.effectivenessChange}
            >
              <Radio value={'0'} color="#283282" className="radio" checked={effectiveness ? true : false}>长期</Radio>
              <Radio value={'1'} color="#283282" className="radio" checked={effectiveness ? false : true} >非长期</Radio>
            </RadioGroup>
          </View>
          {/* 开始时间 -  结束时间  */}
          <View className="flex-row">
            <View className="col">
              <DatePicker
                label="开始时间"
                defaultValue={idCardStartDate}
                error={idCardStartDateError}
                rules={[{
                  required: true,
                  // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                  message: '请选择开始时间!'
                }]}
                end={moment().format('YYYY-MM-DD')}
                onChange={(obj) => this.onChange({ ...obj, errorKey: 'idCardStartDateError', valueKey: 'idCardStartDate' })}
              />
            </View>
            {
              !effectiveness && <View className="col-right">
                <DatePicker
                  label="截止时间"
                  defaultValue={idCardEndDate}
                  error={idCardEndDateError}
                  rules={[{
                    required: true,
                    // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请选择截止时间!'
                  }]}
                  start={moment().format('YYYY-MM-DD')}
                  onChange={(obj) => this.onChange({ ...obj, errorKey: 'idCardEndDateError', valueKey: 'idCardEndDate' })}
                />
              </View>
            }
          </View>
          {/* 证件签发地 */}
          <CInput
            name='placeOfissue'
            defaultValue={placeOfissue}
            label="证件签发地"
            rules={[{
              required: true,
              pattern: /^\s*\S{2,}\s*$/,
              message: '请输入证件签发地址!'
            }]}
            trigger='onBlur'
            error={placeOfissueError}
            onChange={(obj) => this.onChange({ ...obj, errorKey: 'placeOfissueError', valueKey: 'placeOfissue' })}
          />
          <Addr
            label="地址"
            defaultValue={(idAddrProvince || idAddrCity || idAddrArea) ? `${idAddrProvince}/${idAddrCity}/${idAddrArea}` : ''}
            error={idAddrError}
            rules={[{
              required: true,
              // pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
              message: '请选择地址!'
            }]}
            onChange={(obj) => this.onChangeAddr({ ...obj })}
          />
          {/* 详细地址 */}
          <CInput
            name='idAddrDetails'
            defaultValue={idAddrDetails}
            label="详细地址"
            rules={[{
              required: true,
              pattern: /^\s*\S{2,}\s*$/,
              message: '请输入详细地址!'
            }]}
            trigger='onBlur'
            error={idAddrDetailsError}
            onChange={(obj) => this.onChange({ ...obj, errorKey: 'idAddrDetailsError', valueKey: 'idAddrDetails' })}
          />

            <View className="effectivene-list">
              <Text className="title">驾照情况</Text>
              <RadioGroup
                name={isDriverLicense ? '0' : '1'}
                onChange={this.driverLicenseChange}
              >
                <Radio value={'0'} color="#283282" checked={isDriverLicense ? true : false}>有</Radio>
                <Radio value={'1'} color="#283282" className="radio" checked={isDriverLicense ? false : true} >无</Radio>
              </RadioGroup>
            </View>

            <CInput
              name='phone'
              defaultValue={phone}
              label="手机号"
              type="number"
              rules={[{
                required: true,
                pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
                message: '请输入正确的手机号!'
              }]}
              error={phoneError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'phoneError', valueKey: 'phone' })}
            />
             <CInput
              name='bankNo'
              defaultValue={bankNo}
              label="联行号"
              rules={[{
                required: true,
                pattern: /^([1-9]{1})(\d{15}|\d{18})$/,
                message: '请输入联行号!'
              }]}
              trigger='onBlur'
              type="idcard"
              error={bankNoError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'bankNoError', valueKey: 'bankNo' })}
            />
        </View>
        <View className="btn-bottom">
          <AtButton type='primary' onClick={this.save}>保存</AtButton>
        </View>
      </View>
    );
  }
}

export default FastApproval;
