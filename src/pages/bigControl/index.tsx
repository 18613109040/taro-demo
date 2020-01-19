import Taro, { PureComponent, Config } from '@tarojs/taro';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import { AtLoadMore } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { SystemInfoProps } from '../../interface/common'
import './index.scss';

type IState = {
  height: number;
  [key: string]: string | boolean | Array<any> | number;
}
type IProps = {
  dispatch: any;
  systemInfo: SystemInfoProps;
  common: any;
  bigList: any;
}
@connect(({ common, order }) => ({
  systemInfo: common.systemInfo,
  bigList: order.bigList
}))
class bigControl extends PureComponent<IProps, IState> {
  config: Config = {
    navigationBarTitleText: '信息补录',
    navigationBarBackgroundColor: "#4984FD",
    navigationBarTextStyle: 'white'
  };
  constructor(props) {
    super(props)
    this.state = {
      height: props.systemInfo.windowHeight,
      loadMore: false
    }
  }
  componentWillMount() {
    this.getBigListData()
  }
  async getBigListData() {
    this.setState({ loadMore: true })
    const { dispatch, bigList: { page } } = this.props;
    await dispatch({
      type: 'order/getBigListAction',
      payload: {
        type: 'bigList',
        page: page,
        rows: 10,
        primaryStatus:0,
        field: 'id,name,phone,createBy,idAddrProvince,idAddrCity,idAddrArea,idAddrDetails,createDate,updateName,updateBy,updateDate,sysOrgCode,sysCompanyCode,taskName,taskId,businessKey,comment,processInstanceId,spAccount,claimParentAccount,financeAccount,majordomoAccount,claimBy,taskType,approvalDate,customerName,idCard,pinganStatus,pinganError,piccStatus,piccError,gpsStatus,productName,loanAmount'
      }
    })
    this.setState({ loadMore: false })
  }
  // 小程序上拉加载
  onReachBottom() {

  }
  taskDetail = (item) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/setIsTask',
      payload: false
    })
    const { id } = item;
    Taro.navigateTo({
      url: `/pages/report/index?orderId=${id}`
    })
  }
  onScrollToLower = () => {
    const { bigList: { list, total } } = this.props;
    const { loadMore } = this.state;
    if (list.length < total && !loadMore) {
      this.getBigListData()
    }

  }
  render() {
    const { bigList: { list, total } } = this.props;
    const { height, loadMore } = this.state;
    const status = loadMore ? 'loading' : loadMore && list.length === total ? 'noMore' : ''
    return (
      <View className="info-supplement">
        <ScrollView
          scrollY
          scrollWithAnimation
          onScrollToLower={this.onScrollToLower}
          style={{ height: `${height}px` }}
        >
          {
            total == 0 ? <View className="no-data">
              <Image className="no-dataimage" src={require('../../images/task/meiyoushuju.png')}/>
              <View className="text">
                <Text>没有数据</Text>
              </View>
            </View> : <View>
                {
                  list.map(item =>
                    <View className="card">
                      <View className="card-detail" key={item.id} onClick={() => this.taskDetail(item)} >
                        <View className="card-meta" >
                          <View className="des">
                            <Text className="user-name">{item.name}</Text>
                            <Text className="time">{item.createDate}</Text>
                          </View>
                        </View>
                        <View>
                          <Text className="product-name">地址: {`${item.idAddrProvince}${item.idAddrCity}${item.idAddrArea}${item.idAddrDetails}`}</Text>
                        </View>
                        <View>
                          <Text className="product-name">手机号码: {item.phone}</Text>
                        </View>
                      </View>
                    </View>)
                }
                {loadMore &&
                  <AtLoadMore
                    status={status}
                  />
                }
              </View>
          }

        </ScrollView>
      </View>
    );
  }
}

export default bigControl;