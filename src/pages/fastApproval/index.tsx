// 材料准备
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Image, Radio, RadioGroup, ScrollView } from '@tarojs/components';
import { AtIcon, AtButton, AtMessage, AtSteps } from "taro-ui"
import moment from 'moment'
import CInput from '../../components/Input';
import Addr from '../../components/Addr';
import Gender from '../../components/Gender';
import DatePicker from '../../components/DatePicker'
import { SystemInfoProps } from '../../interface/common'
import { connect } from '@tarojs/redux';
import { baseUrl } from '../../config/index';
import './index.scss';
type IState = {
  idCardPhoto: string;
  idCardPhotoStr: string,
  idCardPhoto2: string;
  idCardPhoto2Str: string,
  driveCard: string;
  driveCardStr: string,
  authFile: string;
  authFileStr: string;
  bankNo: string;
  bankNoStr: string;
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
  repaymentAccount: string;
  repaymentAccountError: boolean;
  bankNoError: boolean;
  items: Array<any>;
  current: number;
  loading: boolean;
  [key: string]: string | boolean | Array<any> | number;
}
type IProps = {
  dispatch: any;
  systemInfo: SystemInfoProps;
}
@connect(({ common }) => ({
  systemInfo: common.systemInfo,
}))
class FastApproval extends Component<IProps, IState>{
  config: Config = {
    navigationBarTitleText: '资料填写',
    navigationBarBackgroundColor: "#fff",
    // navigationBarTextStyle: 'white'
  }
  constructor(props) {
    super(props)
    this.state = {
      items: [{ title: '上传资料', status: '' }, { title: '核对信息', status: '' }, { title: '完成', status: '' }],
      current: 0,
      name: '', // 姓名
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
      repaymentAccount: '', //联行号
      repaymentAccountError: false,
      bankNoError: false,
      idCardPhoto: '',
      idCardPhotoStr: '',
      idCardPhoto2: '',
      idCardPhoto2Str: '',
      bankNo: '',
      bankNoStr: '',
      driveCard: '',
      driveCardStr: '',
      authFile: '',
      authFileStr: '',
      idCardPhotoId: '',
      idCardPhoto2Id: '',
      bankNoId: '',
      driveCardId: '',
      authFileId: '',
      submitDisable: false,
      orderId: '',
      incomingProvince: '',
      incomingCity: '',
      loading: false
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
        Taro.uploadFile({
          url: `${baseUrl}/clCollectClientInfoBigDataController/filedeal.do?id=${this.state[`${key}Id`]}`,
          filePath: res.tempFiles[0].path,
          header:{
            Cookie: Taro.getStorageSync('cookie'),
          },
          name: key,
          success: (res) => {
            const data = JSON.parse(res.data)
            console.dir(data)
            if (data.success) {
              const value = JSON.parse(data.attributes.value)
              const { name, sex, idCard, idAddrProvince, idAddrArea, idAddrCity, idAddrDetails, birthday, placeOfissue, idCardStartDate, idCardEndDate, effectiveness, repaymentAccount, isDriverLicense } = data.attributes.obj
              this.setState({
                [`${key}Id`]: data.obj,
                [`${key}Str`]: data.attributes.value,
                [`${key}`]: `${baseUrl}/${value[0].url}`
              })
              if(key === 'idCardPhoto'){
                this.setState({
                  name,
                  sex: sex==='M'? '男': '女',
                  idCard,
                  idAddrProvince,
                  idAddrArea,
                  idAddrCity,
                  idAddrDetails,
                  birthday
                })
              }else if(key === 'idCardPhoto2') {
                  this.setState({
                    placeOfissue,
                    idCardStartDate,
                    idCardEndDate,
                    effectiveness: effectiveness==="否"?false:true,
                  })
              } else if(key === 'bankNo') {
                this.setState({
                  repaymentAccount
                })
              } else if(key === 'driveCard' ) {
                this.setState({
                  isDriverLicense: isDriverLicense === '有'? true: false
                })
                
              }
            }
          }
        })
      }
    })
  }
  onChange = async (obj) => {
    const { error, value, valueKey, errorKey } = obj;
    this.setState({
      [`${errorKey}`]: error,
      [`${valueKey}`]: value
    })
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
      incomingProvince: value[0].id,
      incomingCity: value[1].id,
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
  submit = async () => {
    if(this.state.loading)
      return ;
    this.setState({
      loading: true
    })
    const { dispatch } = this.props;
    const { name, idCard, sex, birthday, placeOfissue,
      effectiveness, idCardStartDate, idCardEndDate, idAddrProvince,
      idAddrCity, idAddrArea, idAddrDetails, isDriverLicense, phone, repaymentAccount,
      idCardPhotoStr, idCardPhoto2Str, bankNoStr, driveCardStr, authFileStr, items, incomingProvince, incomingCity } = this.state;
    const res = await dispatch({
      type: 'approval/approvalAction',
      payload: {
        name,
        idCard,
        incomingProvince,
        incomingCity,
        sex, birthday, placeOfissue, effectiveness: effectiveness ? 1 : 0, idCardStartDate, idCardEndDate, idAddrProvince,
        idAddrCity, idAddrArea, idAddrDetails, isDriverLicense: isDriverLicense ? 1 : 0, phone, repaymentAccount,
        idCardPhoto: idCardPhotoStr, idCardPhoto2: idCardPhoto2Str, bankNo: bankNoStr, driveCard: driveCardStr, authFile: authFileStr
      }
    })
    this.setState({
      loading: false
    })
    if (res.success) {
      items[1].status = 'success';
      this.setState({
        current: 2,
        items: items,
        orderId: res.obj
      })
    } else {
      Taro.atMessage({
        message: res.msg,
        type: "error",
      })
    }
  }
  onChangeSteps = () => {

  }
  next = () => {
    const { items } = this.state;
    items[0].status = 'success';
    this.setState({
      current: 1,
      items: items
    })

  }
  previous = () => {
    const { items } = this.state;
    items[0].status = '';
    this.setState({
      current: 0,
      items: items
    })
  }
  home = () => {
    Taro.reLaunch({
      url: '/pages/home/index'
    })
  }
  order = () => {
    const { orderId } = this.state;
    Taro.reLaunch({
      url: `/pages/report/index?orderId=${orderId}`
    })
  }
  stepContent() {
    const { idCardPhoto, idCardPhoto2, bankNo, driveCard, authFile,
      name, nameError, idCard, idCardError, sex, sexError, birthday, birthdayError, placeOfissue, placeOfissueError,
      effectiveness, idCardStartDate, idCardStartDateError, idCardEndDate, idCardEndDateError, idAddrProvince,
      idAddrCity, idAddrArea, idAddrError, idAddrDetails, idAddrDetailsError, isDriverLicense, phone, phoneError,
      repaymentAccount, repaymentAccountError, current, loading
    } = this.state;
    const nextDisable: any = (idCardPhoto && idCardPhoto2 && bankNo && driveCard && authFile) ? false : true;
    const submitDisable: any = (name && !nameError && idCard && !idCardError && sex && !sexError && birthday && !birthdayError && placeOfissue && !placeOfissueError && idCardStartDate && !idCardStartDateError && idCardEndDate && !idCardEndDateError && idAddrProvince && idAddrCity && idAddrArea && !idAddrError && idAddrDetails && !idAddrDetailsError && phone && !phoneError && repaymentAccount && !repaymentAccountError) ? false : true
    const { systemInfo } = this.props;
    const { windowHeight } = systemInfo;
    if (current === 0) {
      return (
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${windowHeight - 140}px` }}
        >
          <View className="step-one">
            <View className="content-upload at-row at-row__align--center">
              <View className="at-col">
                <View className="name-title">
                  <Text>身份证</Text>
                  <Text className="color-red">人像</Text>
                  <Text>面</Text>
                </View>
                <View className="des"><Text>上传您身份证人像面</Text></View>
              </View>
              <View>
                {
                  idCardPhoto ?
                    <View className="preview">
                      <Image className="id-card_image" src={idCardPhoto} />
                      <View className="close" onClick={() => this.close('idCardPhoto')}>
                        <AtIcon value="close" size="20" prefixClass='iconfont' color="#d0d3d9" />
                      </View>
                    </View> :
                    <Image onClick={() => this.onChangeImge('idCardPhoto')} className="thumbnail" src={require('../../images/home/idcard02.png')} />
                }

              </View>
            </View>
            <View className="content-upload divider at-row at-row__align--center">
              <View className="at-col">
                <View className="name-title">
                  <Text>身份证</Text>
                  <Text className="color-red">国徽</Text>
                  <Text>面</Text>
                </View>
                <View className="des"><Text>上传您身份证国徽面</Text></View>
              </View>

              <View>
                {
                  idCardPhoto2 ?
                    <View className="preview">
                      <Image className="id-card_image" src={idCardPhoto2} />
                      <View className="close" onClick={() => this.close('idCardPhoto2')}>
                        <AtIcon value="close" size="20" prefixClass='iconfont' color="#d0d3d9" />
                      </View>
                    </View> :
                    <Image onClick={() => this.onChangeImge('idCardPhoto2')} className="thumbnail" src={require('../../images/home/idcard01.png')} />
                }
              </View>
            </View>
            <View className="content-upload divider at-row at-row__align--center">
              <View className="at-col">
                <View className="name-title">
                  <Text>银行卡</Text>
                  <Text className="color-red">正</Text>
                  <Text>面</Text>
                </View>
                <View className="des"><Text>上传您银行卡正面</Text></View>
              </View>
              <View>
              {
                  bankNo ?
                    <View className="preview">
                      <Image className="id-card_image" src={bankNo} />
                      <View className="close" onClick={() => this.close('bankNo')}>
                        <AtIcon value="close" size="20" prefixClass='iconfont' color="#d0d3d9" />
                      </View>
                    </View> :
                    <Image onClick={() => this.onChangeImge('bankNo')} className="thumbnail" src={require('../../images/home/bank.png')} />
                }
              </View>
            </View>
            <View className="content-upload divider at-row at-row__align--center">
              <View className="at-col">
                <View className="name-title">
                  <Text>驾驶证</Text>
                </View>
                <View className="des"><Text>上传您驾驶证</Text></View>
              </View>
              <View>
                {
                  driveCard ?
                    <View className="preview">
                      <Image className="id-card_image" src={driveCard} />
                      <View className="close" onClick={() => this.close('driveCard')}>
                        <AtIcon value="close" size="20" prefixClass='iconfont' color="#d0d3d9" />
                      </View>
                    </View> :
                    <Image onClick={() => this.onChangeImge('driveCard')} className="thumbnail" src={require('../../images/home/driver.png')} />
                }
              </View>
            </View>
            <View className="content-upload divider at-row at-row__align--center">
              <View className="at-col">
                <View className="name-title">
                  <Text>签署授权书</Text>
                </View>
                <View className="des"><Text>上传您签署授权书</Text></View>
              </View>
              <View>
              {
                  authFile ?
                    <View className="preview">
                      <Image className="id-card_image" src={authFile} />
                      <View className="close" onClick={() => this.close('authFile')}>
                        <AtIcon value="close" size="20" prefixClass='iconfont' color="#d0d3d9" />
                      </View>
                    </View> :
                    <Image onClick={() => this.onChangeImge('authFile')} className="thumbnail" src={require('../../images/home/book.png')} />
                }
              </View>
            </View>
          </View>
          <View className="btn-footer">
            <AtButton
              disabled={nextDisable}
              type='primary'
              onClick={this.next}>下一步</AtButton>
          </View>
        
        </ScrollView>)
    } else if (current === 1) {
      return (
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${windowHeight - 140}px` }}
        >
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
                  message: '请输入正确的身份证号!'
                }]}
                type="idcard"
                trigger='onChange'
                error={idCardError}
                onChange={(obj) => this.onChange({ ...obj, errorKey: 'idCardError', valueKey: 'idCard' })}
              />
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
              defaultValue={(idAddrProvince && idAddrCity && idAddrArea) ? `${idAddrProvince}/${idAddrCity}/${idAddrArea}` : ''}
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
              name='repaymentAccount'
              defaultValue={repaymentAccount}
              label="银行卡号"
              rules={[{
                required: true,
                pattern: /^([1-9]{1})(\d{15}|\d{18})$/,
                message: '请输入银行卡号!'
              }]}
              // trigger='onBlur'
              type="idcard"
              error={repaymentAccountError}
              onChange={(obj) => this.onChange({ ...obj, errorKey: 'repaymentAccountError', valueKey: 'repaymentAccount' })}
            />
          </View>

          <View className="btn-footer at-row at-row__align--center">
            <View className="at-col"><AtButton onClick={this.previous}  >上一步</AtButton></View>
            <View className="at-col submit-btn"><AtButton type='primary' loading={loading} disabled={submitDisable} onClick={this.submit}>{loading?"提交中":"提交"}</AtButton></View>
          </View>
        </ScrollView>
      )
    } else if (current === 2) {
      return (
        <ScrollView
          scrollY
          scrollWithAnimation
          style={{ height: `${windowHeight - 80}px` }}
        >
          <View className="sucess">
            <View><AtIcon value="orderSucess" size="100" prefixClass='iconfont' color="#4984FD" /></View>
            <View><Text className="sucess-title">提交成功</Text></View>
            <View><Text className="sucess-des">您的申请已经提交成功,我们会在第一时间审核。</Text></View>
            <View className="btn-sucess-footer at-row at-row__align--center">
              <View className="at-col"><AtButton onClick={this.home} >返回首页</AtButton></View>
              <View className="at-col submit-btn"><AtButton type='primary' onClick={this.order}>查看订单</AtButton></View>
            </View>
          </View>
        </ScrollView>
      )
    }
  }
  render() {
    const { items, current } = this.state;
    return (
      <View className="fast-approval-page">
        <AtMessage />
        <View className="steps-bg">
          <AtSteps
            items={items}
            current={current}
            onChange={this.onChangeSteps}
          />
        </View>
        {
          this.stepContent()
        }
      </View>
    );
  }
}

export default FastApproval;
