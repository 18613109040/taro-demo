import Taro, { Component, ComponentClass } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { AtSteps, AtButton, AtForm, AtAvatar, AtGrid } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { StepsProps } from './model'
import { FormProps } from '../../interface/form'
import CInput from '../../components/Input'
import { SystemInfoProps } from '../../interface/common'
import './index.scss';

type IState = {}
type IProps =  {
  steps: Array<StepsProps>;
  form: Array<FormProps>;
  dispatch: any;
  systemInfo: SystemInfoProps;
  userInfo: any;
  common: any;
}
@connect(({ home, common }) => ({
  steps: home.steps,
  form: home.form,
  systemInfo: common.systemInfo,
  userInfo: common.userInfo
}))
class Home extends Component<IProps, IState> {
  config = {
    navigationBarTitleText: 'home',
  };
  constructor(props) {
    super(props)
    this.state = {

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
  stepChange = (current) => {
    console.dir(current)
  }
  formSubmit = () => {
    console.dir(this.props.form)
  }
  onChange = (obj) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/setFormValue',
      payload: obj
    })
  }
  render() {
    const { steps, form, systemInfo, userInfo } = this.props;
    const statusBarHeight = systemInfo.statusBarHeight || 0;
    const screenHeight = systemInfo.screenHeight || 0;
    const customHeight = statusBarHeight+44;
    const rendeForm =
      <AtForm >
        {
          form.map((item,index) => {
            if (item.type === 'input') {
              return (
              <View key={item.name} className="form-item">
                <CInput
                  {...item}
                  onChange={(obj)=>this.onChange({...obj,index:index})}
                />
              </View>)
            }
          })
        }
      </AtForm>
    
    return (
      <View className="home-page">
        {/* <View style={`margin-top : ${statusBarHeight}px`}></View> */}
        <View className="nav-bar">
          <AtAvatar circle size="small" image='https://jdc.jd.com/img/200'/>
          <Text className="user-info-name">{userInfo.name}</Text>
        </View>
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={customHeight}
          style={`height: ${screenHeight}px`}
        >
          
        </ScrollView>
        {/* <View className="at-steps-bg">
          <AtSteps
            items={steps}
            current={0}
            onChange={this.stepChange}
          />
        </View>
        <View className="home-page-content">
          {rendeForm}
          <AtButton onClick={this.formSubmit} >提交</AtButton>
        </View> */}
      </View>
    );
  }
}

export default Home as ComponentClass<IProps, IState>;
