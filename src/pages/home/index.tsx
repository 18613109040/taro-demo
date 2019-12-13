import Taro, { Component , ComponentClass} from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtSteps, AtInput, AtForm } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { InitStateProps } from './model'
import CInput from '../../components/Input'
import Item from '../../components/Form/item'
import './index.scss';
type IProps = InitStateProps
type IState = {}

@connect(({home}) => ({
  steps: home.steps
}))
class Home extends Component<IProps,IState> {
  config = {
    navigationBarTitleText: 'home',
  };
  constructor (props) {
    super(props)
    this.state = {
     
    }
  }
  componentDidMount = () => {
    // console.dir(this.props.home)
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'home/getAppBannerAction',
    //   payload: {}
    // })
    
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
  render() {
    const { steps } = this.props;
    return (
      <View className="home-page">
        <View className="at-steps-bg">
          <AtSteps 
            items={steps}
            current={0}
            onChange={this.stepChange}
          />
        </View>
        <AtInput/>
        <Item 
          label='国籍'
          name="hy"
          rules={[{
            required: true,
            pattern: /^\s*[0-9a-z]{5,15}\s*$/,
            message: 'Please select your country!'
          }]}
        >
          <CInput defaultValue=""/>
        </Item>
        {/* <AtForm>
          <AtInput 
            name='value' 
            title='文本' 
            type='text' 
            placeholder='单行文本' 
          />
        </AtForm> */}
      </View>
    );
  }
}

export default Home  as ComponentClass<IProps, IState>;
