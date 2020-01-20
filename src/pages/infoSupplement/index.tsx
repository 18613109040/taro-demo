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
  taskList: any;
}
@connect(({ common, order }) => ({
  systemInfo: common.systemInfo,
  taskList: order.taskList
}))
class InfoSupplement extends PureComponent<IProps, IState> {
  config: Config = {
    navigationBarTitleText: '待办任务',
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
    this.getTaskListData()
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/destoryOrder',
      payload: {
      }
    })
  }
  async getTaskListData() {
    this.setState({ loadMore: true })
    const { dispatch, taskList: { page } } = this.props;
    await dispatch({
      type: 'order/getTaskListAction',
      payload: {
        page: page,
        rows: 10,
        taskType: 1,
        field: 'id,createName,createBy,createDate,updateName,updateBy,updateDate,sysOrgCode,sysCompanyCode,taskName,taskId,businessKey,comment,processInstanceId,spAccount,claimParentAccount,financeAccount,majordomoAccount,claimBy,taskType,approvalDate,customerName,idCard,pinganStatus,pinganError,piccStatus,piccError,gpsStatus,productName,loanAmount'
      }
    })
    this.setState({ loadMore: false })
  }
  // 小程序上拉加载
  onReachBottom() {

  }
  taskDetail = (item) => {
    const { businessKey, taskId, taskName } = item;
    const { dispatch } = this.props;
    dispatch({
      type: 'common/setIsTask',
      payload: true
    })
    Taro.navigateTo({
      url: `/pages/report/index?orderId=${businessKey}&taskId=${taskId}&taskName=${taskName}`
    })
  }
  onScrollToLower = () => {
    const { taskList: { list, total } } = this.props;
    const { loadMore } = this.state;
    if (list.length < total && !loadMore) {
      this.getTaskListData()
    }

  }
  render() {
    const { taskList: { list, total } } = this.props;
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
                            <Text className="user-name">{item.customerName}</Text>
                            <Text className="time">{item.approvalDate}</Text>
                          </View>
                          <Text className="status">{item.taskName}</Text>
                        </View>
                        <View>
                          <Text className="product-name">{item.productName}</Text>
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

export default InfoSupplement;