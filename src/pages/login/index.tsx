import Taro, { PureComponent, ComponentClass } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtButton, AtMessage } from 'taro-ui';
import { connect } from '@tarojs/redux';
import CInput from '../../components/Input'
import { SystemInfoProps } from '../../interface/common'
import { baseUrl } from '../../config/index';
import './index.scss';

type IState = {
  userName: string;
  password: string;
  randCode: string;
  userNameError: boolean;
  passwordError: boolean;
  randCodeError: boolean;
  time: number;
}
type IProps = {
  systemInfo: SystemInfoProps;
  dispatch: any;
}
@connect(({ common }) => ({
  systemInfo: common.systemInfo
}))
class Login extends PureComponent<IProps, IState> {
  config = {
    navigationBarTitleText: '登录',
  };
  constructor(props) {
    super(props)
    this.state = {
      userName: 'admin',
      userNameError: false,
      password: 'weiu123',
      passwordError: false,
      randCode: '',
      randCodeError: false,
      time: 1
    }
  }
  componentDidMount = () => {


  };

  //分享
  // onShareAppMessage() {

  // }

  // 小程序上拉加载
  onReachBottom() {

  }
  login = async () => {
    const { userName, password, userNameError, passwordError, randCode, randCodeError } = this.state;
    const { dispatch } = this.props;
    if (userName && password && !userNameError && !passwordError && randCode && !randCodeError) {
      const res = await dispatch({
        type: 'common/loginAction',
        payload: {
          userName,
          password,
          randCode
        }
      })
      console.dir(res)
      if (!res.success) {
        Taro.atMessage({
          message: res.msg,
          type: 'error'
        })
      } else {
        Taro.reLaunch({
          url: '/pages/home/index'
        })
      }

    }
  }
  onChangeName = (obj) => {
    const { value, error } = obj;
    this.setState({
      userName: value,
      userNameError: error
    })
  }
  onChangePassWorld = (obj) => {
    const { value, error } = obj;
    this.setState({
      password: value,
      passwordError: error
    })
  }
  onChangeRandCode = (obj) => {
    const { value, error } = obj;
    this.setState({
      randCode: value,
      randCodeError: error
    })
  }
  changeCode = () => {
    this.setState({
      time: new Date().getTime()
    })
  }
  render() {
    const { systemInfo } = this.props;
    const { userName, password, randCode, randCodeError, time, userNameError, passwordError } = this.state;
    const statusBarHeight = systemInfo.statusBarHeight || 0;
    const disabled = userName&&password&&randCode&&!randCodeError&&!userNameError&&!passwordError?false:true
    return (
      <View className="login-page">
        <AtMessage />
        <View style={`margin-top : ${statusBarHeight + 50}px`}></View>
        <View className="login-page-title">
          <Text>欢迎登录威武融创</Text>
        </View>
        <CInput
          defaultValue={userName}
          name='userName'
          label="用户名"
          trigger="onBlur"
          rules={[{
            required: true,
            pattern: /^(([\u4e00-\u9fff]{2,4})|([a-z\.\s\,]{2,50}))$/i,
            message: '用户名格式不正确'
          }]}
          onChange={this.onChangeName}
        />
        <CInput
          defaultValue={password}
          name='password'
          label="密码"
          type='password'
          trigger="onBlur"
          rules={[{
            required: true,
            pattern: /^(\w){3,20}$/,
            message: '密码格式不正确'
          }]}

          onChange={this.onChangePassWorld}
        />
        <View className="rand-code">
          <View className="code">
            <CInput
              defaultValue={randCode}
              name='randCode'
              label="验证码"
              // trigger="onBlur"
              rules={[{
                required: true,
                pattern: /^(\w){3,20}$/,
                message: '验证码式不正确'
              }]}
              // error={randCodeError}
              onChange={this.onChangeRandCode}
            />
          </View>
          <View className="code-image-view" onClick={this.changeCode} >
            <Image className="code-image" src={`${baseUrl}/randCodeImage?${time}`} />
          </View>
        </View>


        <View className="login-page-buttom">
          <AtButton disabled={disabled} type='primary' onClick={this.login}>登录</AtButton>
        </View>
      </View>
    );
  }
}

export default Login as ComponentClass<IProps, IState>;
