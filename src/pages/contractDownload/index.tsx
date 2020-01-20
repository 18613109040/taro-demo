import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton, AtToast } from "taro-ui"
import { connect } from '@tarojs/redux';
import { baseUrl } from '../../config/index';
import { InitStateProps } from '../../models/report';
import './index.scss';
type IState = {
  loading: boolean;
  [key: string]: string | boolean | Array<any> | number;
}
type IProps = {
  report: InitStateProps;
  dispatch?: any;
}
@connect(({ report }) => ({
  report: report
}))
class ContractDownload extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '合同下载',
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: false,

    }
  }
  componentDidMount = async () => {
    

  }
  download = async (name) => {
    const { orderId } = this.$router.params
    const { dispatch } = this.props;
    Taro.showLoading({
      title: '下载中...'
    })
    const res = await dispatch({
      type: 'report/generateTemplateAction',
      payload: {
        fileName: name,
        id: orderId
      }
    })
    if (res.success) {
      Taro.downloadFile({
        url: `${baseUrl}/clContractManageController.do?downloadContract&url=${encodeURI(res.obj)}`,
        header: {
          Cookie: Taro.getStorageSync('cookie'),
        },
        success: (resd) => {
          Taro.hideLoading()
          Taro.openDocument({
            filePath: resd.tempFilePath
          })
        }
      })
    } else {
      Taro.hideLoading()
      Taro.showToast({
        title: res.msg,
        icon: 'none',
        duration: 2000
      })
    }
  }
  send= async() =>{
    this.setState({loading: true})
    const { dispatch } = this.props;
    const { orderId, taskId, taskName } = this.$router.params
    const res = await dispatch({
      type: 'report/getOnlineGreateAction',
      payload: {
        taskId,
        id: orderId,
        taskName
      }
    })
    this.setState({loading: false})
    if(res.success){
      Taro.showToast({
        title: res.msg,
        icon: 'success',
        duration: 2000
      })
    }else{
      Taro.showToast({
        title: res.msg,
        icon: 'none',
        duration: 2000
      })
    }
  }
  render() {
    const { loading } = this.state;
    return (
      <View className="contract-download">
        
        <View className="row row__align--center line">
          <Text className="at-col">融资租赁信息问答笔录（线下）</Text>
          <AtButton type='primary' size="small" onClick={() => this.download('iwataAsks')}>下载</AtButton>
        </View>
        <View className="row row__align--center line">
          <Text className="at-col">租金明细表</Text>
          <AtButton type='primary' size="small"  onClick={() => this.download('rentIst')} >下载</AtButton>
        </View>
        <View className="row row__align--center line">
          <Text className="at-col">确认函（线下）</Text>
          <AtButton type='primary' size="small"  onClick={() => this.download('recommendLetter')}>下载</AtButton>
        </View>
        <View className="row row__align--center line">
          <Text className="at-col">汽车租赁合同</Text>
          <AtButton type='primary' size="small" onClick={() => this.download('leaseContract')}>下载</AtButton>
        </View>
        <View className="row row__align--center line">
          <Text className="at-col">发送电子签章合同</Text>
          <AtButton type='primary' loading={loading} size="small" onClick={this.send}>{loading?'短信发送中...':'发送短信'}</AtButton>
        </View>
      </View>
    );
  }
}
export default ContractDownload;