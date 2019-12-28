// 材料准备
import Taro, { PureComponent } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon, AtButton, AtImagePicker } from "taro-ui"
import { connect } from '@tarojs/redux';
import './index.scss';
type IState = {
  idCardPositiveUrl: string;
  idCardReverseUrl: string;
  bankCardPositiveUrl: string;
  bankCardReverseUrl: string;
  [key:string]: string;
}
type IProps = {

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
    }
  }
  componentDidMount = () => {

  }

  // 小程序上拉加载
  onReachBottom() {

  }
  goToUserInfo = () => {

  }
  onChange = (key) => {
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

  close = (key) => {
    this.setState({
      [`${key}`]: ''
    })
  }
  render() {
    const { idCardPositiveUrl, idCardReverseUrl, bankCardPositiveUrl, bankCardReverseUrl } = this.state;
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
                  <View className="close" onClick={()=>this.close('idCardPositiveUrl')}>
                    <AtIcon value="close" size="20"  prefixClass='iconfont' color="#d0d3d9" />
                  </View>

                </View> :
                <AtIcon onClick={()=>this.onChange('idCardPositiveUrl')} value="idcardpositive" size="100" prefixClass='iconfont' color="#d0d3d9" />

            }
            <View className="name">上传身份证正面</View>
          </View>
          <View>
          {
              idCardReverseUrl ?
                <View className="preview">
                  <Image className="id-card_image" src={idCardReverseUrl} />
                  <View className="close" onClick={()=>this.close('idCardReverseUrl')}>
                    <AtIcon value="close" size="20"  prefixClass='iconfont' color="#d0d3d9" />
                  </View>

                </View> :
                <AtIcon onClick={()=>this.onChange('idCardReverseUrl')} value="idcardreverse" size="100" prefixClass='iconfont' color="#d0d3d9" />

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
                  <View className="close" onClick={()=>this.close('bankCardPositiveUrl')}>
                    <AtIcon value="close" size="20"  prefixClass='iconfont' color="#d0d3d9" />
                  </View>

                </View> :
                <AtIcon onClick={()=>this.onChange('bankCardPositiveUrl')} value="bankCardpositive" size="90" prefixClass='iconfont' color="#d0d3d9" />

            }
            <View className="name">上传银行卡正面</View>
          </View>
          <View>
          {
              bankCardReverseUrl ?
                <View className="preview">
                  <Image className="id-card_image" src={bankCardReverseUrl} />
                  <View className="close" onClick={()=>this.close('bankCardReverseUrl')}>
                    <AtIcon value="close" size="20"  prefixClass='iconfont' color="#d0d3d9" />
                  </View>

                </View> :
                <AtIcon onClick={()=>this.onChange('bankCardReverseUrl')} value="bankCardreverse" size="90" prefixClass='iconfont' color="#d0d3d9" />

            }
            <View className="name">上传银行卡反面</View>
          </View>
        </View>
      
        
      </View>
    );
  }
}

export default FastApproval;
