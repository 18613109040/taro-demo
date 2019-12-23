import Taro, { PureComponent, ComponentClass } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton, AtForm, AtInput } from 'taro-ui';
import { connect } from '@tarojs/redux';
import CInput from '../../components/Input'
import { SystemInfoProps } from '../../interface/common'
import './index.scss';

type IState = {
  userName: string;
  password: string;
  userNameError: boolean;
  passwordError: boolean;
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
      userName: '',
      userNameError: false,
      password: '',
      passwordError: false
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
  login = () => {
    const { userName, password, userNameError, passwordError } = this.state;
    if(userName && password && !userNameError && !passwordError ){
      Taro.reLaunch({
        url: '/pages/home/index'
      })
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
  render() {
    const { systemInfo } = this.props;
    const { userName, password } = this.state;
    const statusBarHeight = systemInfo.statusBarHeight || 0;

    return (
      <View className="login-page">
        <View style={`margin-top : ${statusBarHeight + 50}px`}></View>
        <View className="login-page-title">
          <Text>欢迎登录威武融创</Text>
        </View>
        <CInput
          value={userName}
          name='userName'
          label="用户名"
          rules={[{
            required: true,
            pattern: /^(([\u4e00-\u9fff]{2,4})|([a-z\.\s\,]{2,50}))$/i,
            message: '用户名格式不正确'
          }]}
          onChange={this.onChangeName}
        />
        <CInput
          value={password}
          name='password'
          label="密码"
          type='password'
          rules={[{
            required: true,
            pattern: /^(\w){3,20}$/,
            message: '密码格式不正确'
          }]}
          onChange={this.onChangePassWorld}
        />
        <View className="login-page-buttom">
          <AtButton type='primary' onClick={this.login}>登录</AtButton>
        </View>
      </View>
    );
  }
}

export default Login as ComponentClass<IProps, IState>;
