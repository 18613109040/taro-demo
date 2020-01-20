import Taro, { PureComponent, ComponentClass, Config } from '@tarojs/taro';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { SystemInfoProps } from '../../interface/common'
import './index.scss';

type IState = {

  [key: string]: string | boolean | Array<any> | number;
}
type IProps = {
  dispatch: any;
  systemInfo: SystemInfoProps;
  common: any;
  taskList: any;
}
@connect(({ common, order }) => ({
  systemInfo: common.systemInfo,
  taskList: order.taskList
}))
class Home extends PureComponent<IProps, IState> {
  config: Config = {
    navigationBarTitleText: '威武金融',
    navigationBarBackgroundColor: "#4984FD",
    navigationBarTextStyle: 'white'
  };
  constructor(props) {
    super(props)
    this.state = {
   
    }
  }


  //分享
  // onShareAppMessage() {

  // }

  // 小程序上拉加载
  onReachBottom() {

  }
  addApply = () => {
    Taro.navigateTo({
      url: '/pages/prepare/index'
    })
  }
  infoSupplement = () => {
    Taro.navigateTo({
      url: '/pages/infoSupplement/index'
    })
  }
  bigControl = () => {
    Taro.navigateTo({
      url: '/pages/bigControl/index'
    })
  }
  render() {
    return (
      <View className="home-page">
        <View className="header">
          <View className="add-place" onClick={this.addApply}>
            <AtIcon value='add-circle' size='30' color='#fff' />
            <Text className="text">进件快速申请</Text>
          </View>
          {/* <View className="list-header row row__align--center">
            <AtIcon value='verticalline' size='20' color='#4984FD' prefixClass='iconfont' />
            <Text className="task-title">待办任务</Text>
          </View> */}
        </View>
        <View className="row">
          <View className="left" onClick={this.bigControl}>
            <View className="text">
              <Text>信息补录</Text>
              <View className="icon-top">
                <AtIcon value="jingru" size="20"  prefixClass='iconfont' color="#fff"/>
              </View>
            </View>
            <View >
              <Image className="image-load" src={require('../../images/home/bulu.png')}/>
            </View>
            
          </View>
          <View className="right" onClick={this.infoSupplement}>
            <View className="text">
              <Text>待办任务</Text>
              <View className="icon-top">
                <AtIcon value="jingru" size="20"  prefixClass='iconfont' color="#fff"/>
              </View>
            </View>
            <View >
              <Image className="image-load" src={require('../../images/home/daiban.png')}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Home as ComponentClass<IProps, IState>;
