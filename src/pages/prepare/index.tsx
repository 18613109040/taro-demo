// 材料准备
import Taro, { PureComponent } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon, AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import './index.scss';
type IState = {

}
type IProps = {

}
@connect(({ }) => ({

}))
class PrePare extends PureComponent<IProps, IState>{
  config = {
    navigationBarTitleText: '资料列表',
  }

  componentDidMount = () => {

  }

  // 小程序上拉加载
  onReachBottom() {

  }
  goToUserInfo = () => {

  }
  quick = () => {
    Taro.navigateTo({
      url: '/pages/fastApproval/index'
    })
  }
  render() {
    return (
      <View className="prepare-page">
        <View className="content">
          <View className="name-t">
            <View>
              <AtIcon value="diamond" size="20" prefixClass='iconfont' color="#4984FD" />
            </View>
            <Text className="title">所需材料</Text>
            <View className="right">
              <AtIcon value="diamond" size="20" prefixClass='iconfont' color="#4984FD" />
            </View>
          </View>
          <View>
            <View className="line-header">
              <AtIcon value="diamond" size="12" prefixClass='iconfont' color="#4984FD" />
              <Text className="title">本人身份证</Text>
            </View>
            <View className="material">
              <Image className="image" src={require("../../images/home/card02.png")} />
              <Image className="image" src={require("../../images/home/card01.png")} />
            </View>
            <View className="line-header">
              <AtIcon value="diamond" size="12" prefixClass='iconfont' color="#4984FD" />
              <Text className="title">本人银行卡</Text>
            </View>
            <View className="material">

            </View>
            <View  className="line-header">
              <AtIcon value="diamond" size="12" prefixClass='iconfont' color="#4984FD" />
              <Text className="title">本人驾驶证</Text>
            </View>
            <View className="material">

            </View>
            <View className="line-header">
              <AtIcon value="diamond" size="12" prefixClass='iconfont' color="#4984FD" />
              <Text className="title">本人签署授权书</Text>
            </View>
            <View>

            </View>
            <View className='btn'>
              <AtButton type='primary' onClick={this.quick}>确定</AtButton>
            </View>
          </View>
        </View>

      </View>
    );
  }
}

export default PrePare;
