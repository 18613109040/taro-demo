import Taro, { PureComponent, ComponentClass, Config   } from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
import { AtButton, AtMessage, AtIcon} from 'taro-ui';
import { connect } from '@tarojs/redux';
import { SystemInfoProps } from '../../interface/common'
import './index.scss';

type IState = {
  userName: string;
  password: string;
}
type IProps = {
  systemInfo: SystemInfoProps;
  dispatch: any;
}
@connect(({ common }) => ({
  systemInfo: common.systemInfo
}))
class Login extends PureComponent<IProps, IState> {
  config: Config = {
    navigationBarTitleText: '登录',
    navigationBarBackgroundColor: "#4984FD",
    navigationBarTextStyle: 'white'
  }
  
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: 'weiu123'
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
    const { userName, password } = this.state;
    const { dispatch } = this.props;
    if (userName && password) {
      const res = await dispatch({
        type: 'common/loginAction',
        payload: {
          userName,
          password,
          orgId: '',
          ReturnURL: ''
        }
      })
      if (!res.success) {
        Taro.atMessage({
          message: res.msg,
          type: 'error',
          duration: 4000
        })
      } else {
        Taro.reLaunch({
          url: '/pages/home/index'
        })
      }

    }
  }
  onChangeName = (e) => {
    this.setState({
      userName: e.currentTarget.value
    })
  }
  onChangePassWorld = (e) => {
    this.setState({
      password: e.currentTarget.value
    })
  }
  render() {
    const { userName, password } = this.state;
    const disabled = userName&&password?false:true
    return (
      <View className="login-page">
        <AtMessage />
        <View className="login-header">
          <AtIcon value="loginimage" size="150" prefixClass='iconfont' color="#fff" />
        </View>
        <View className="login-content">
          <View className="list at-row at-row__align--center">
            <AtIcon value="user" size="20" color="#232833" />
            <Input
              placeholder="请输入用户名"
              className="user-name"
              onInput={this.onChangeName}
            />
          </View>
          <View className="list at-row at-row__align--center">
            <AtIcon value="lock" size="20" color="#232833" />
            <Input
              placeholder="请输入用户名"
              type='password'
              password
              onInput={this.onChangePassWorld}
              className="user-name"
            />
          </View>
          <View className="login-page-buttom">
          <AtButton disabled={disabled} type='primary' onClick={this.login}>登录</AtButton>
        </View>
        </View>
      </View>
    );
  }
}

export default Login as ComponentClass<IProps, IState>;
