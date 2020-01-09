import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton } from "taro-ui"
import { connect } from '@tarojs/redux';
import { baseUrl } from '../../config/index';
import { InitStateProps, type } from '../../models/report';
import './index.scss';
type IState = {
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
      
    }
  }
  componentDidMount = async () => {
    const { dispatch } = this.props;
    
  }

  save = () => {
 
  }
  download=(name)=>{
    const { orderId } =  this.$router.params
    const { dispatch } = this.props;
    dispatch({
      type: 'report/downLoadFileAction',
      payload: {
        fileName: name,
        id: orderId
      }
    })
    // Taro.downloadFile({
    //   url: `${baseUrl}/clContractManageController.do?offlineContract&fileName=${name}&id=${orderId}`,
    //   header: {
    //     Cookie: Taro.getStorageSync('cookie'),
    //   },
    //   success: (res)=>{
    //     console.dir(res)
    //     Taro.openDocument({
    //       filePath: res.tempFilePath
    //     })
    //   },
    //   fail: (res)=>{
    //     console.dir(res)
    //   }
    // })
  }
  // 
  render() {
    
    return (
      <View className="contract-download">
        <View className="at-row at-row__align--center line">
          <Text className="at-col">融资租赁信息问答笔录（线下）</Text>
          <AtButton type='primary' size="small" onClick={()=>this.download('iwataAsks')}>下载</AtButton>
        </View>
        <View className="at-row at-row__align--center line">
          <Text className="at-col">租金明细表</Text>
          <AtButton type='primary' size="small">下载</AtButton>
        </View>
        <View className="at-row at-row__align--center line">
          <Text className="at-col">确认函（线下）</Text>
          <AtButton type='primary' size="small">下载</AtButton>
        </View>
        <View className="at-row at-row__align--center line">
          <Text className="at-col">汽车租赁合同</Text>
          <AtButton type='primary' size="small">下载</AtButton>
        </View>
        
      </View>
    );
  }
}

export default ContractDownload;