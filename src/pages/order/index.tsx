import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView, Text, Image } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtLoadMore } from 'taro-ui'
import { connect } from '@tarojs/redux';
import { SystemInfoProps } from '../../interface/common'
import './index.scss';
type IState = {
  current: number;
  height: number;
  loadMore: boolean;
  tabList: any;
}
type IProps = {
  dispatch: any;
  systemInfo: SystemInfoProps;
  infotask: any;
  firstask: any;
  undertask: any;
  signtask: any;
  gpstask: any;
  freviewtask: any;
  qreviewtask: any;
  financialtask: any;
  approvaltask: any;
  loantask: any;
  sloantask: any;
  closetask: any;
  rejectedtask: any;

}
@connect(({ common, order }) => ({
  systemInfo: common.systemInfo,
  infotask: order.infotask,
  firstask: order.firstask,
  undertask: order.undertask,
  signtask: order.signtask,
  gpstask: order.gpstask,
  freviewtask: order.freviewtask,
  qreviewtask: order.qreviewtask,
  financialtask: order.financialtask,
  approvaltask: order.approvaltask,
  loantask: order.loantask,
  sloantask: order.sloantask,
  closetask: order.closetask,
  rejectedtask: order.rejectedtask,
  
}))
class Order extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '任务类表',  // 材料附件
  }
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      height: props.systemInfo.windowHeight,
      loadMore: false,
      tabList: [{ title: '信息补录', type: 'infotask', id: 0 }, { title: '初审中', type: 'firstask', id: 1 },
      { title: '复审中', type: 'undertask', id: 2 }, { title: '签约', type: 'signtask', id: 3 },
      { title: 'GPS安装中', type: 'gpstask', id: 4 }, { title: '请款初审', type: 'freviewtask', id: 5 },
      { title: '请款复审', type: 'qreviewtask', id: 6 }, { title: '财务审核中', type: 'financialtask', id: 7 }
        , { title: '财务审核通过', type: 'approvaltask', id: 10 }, { title: '第一笔放款', type: 'loantask', id: 11 },
      { title: '第二笔放款', type: 'sloantask', id: 8 }
        , { title: '关闭订单', type: 'closetask', id: 9 }, { title: '已拒绝', type: 'rejectedtask', id: 91 }]
    }
  }
  componentDidMount = () => {
    this.getData();
  }
  async getData () {
    this.setState({ loadMore: true })
    const { current, tabList } = this.state;
    const { dispatch } = this.props;
    const currentType = tabList[current].type
    await dispatch({
      type: 'order/getOrderListAction',
      payload: {
        type: currentType,
        page: this.props[currentType].page,
        rows: 10,
        primaryStatus: tabList[current].id,
        field: 'id,name,phone,createBy,idAddrProvince,idAddrCity,idAddrArea,idAddrDetails,createDate,updateName,updateBy,updateDate,sysOrgCode,sysCompanyCode,taskName,taskId,businessKey,comment,processInstanceId,spAccount,claimParentAccount,financeAccount,majordomoAccount,claimBy,taskType,approvalDate,customerName,idCard,pinganStatus,pinganError,piccStatus,piccError,gpsStatus,productName,loanAmount'
      }
    })
    this.setState({ loadMore: false })
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/destoryOrder',
      payload: {
      }
    })
  }
  handleClick = (value) => {
    this.setState({
      current: value
    }, () => {
      const { tabList } = this.state;
      if (this.props[tabList[value].type].list.length === 0) {
        this.getData()
      }
    })


  }
  onScrollToLower = () => {
    const { current, tabList } = this.state;
    const currentType = tabList[current].type
    const { loadMore } = this.state;
    if (this.props[currentType].list.length < this.props[currentType].total && !loadMore) {
      this.getData()
    }
  }
  orderDetail = (item) => {
    const { businessKey, taskId } = item;
    const { dispatch } = this.props;
    dispatch({
      type: 'common/setIsTask',
      payload: true
    })
    Taro.navigateTo({
      url: `/pages/report/index?orderId=${businessKey}&taskId=${taskId}`
    })
  }
  render() {
    const { windowHeight } = this.props.systemInfo;
    const { current, tabList, loadMore } = this.state;
    const status = loadMore ? 'loading' : loadMore && this.props[tabList[current].type].list.length === this.props[tabList[current].type].total ? 'noMore' : ''
    return (
      <View className="order-page">
        <AtTabs scroll current={current} tabList={tabList} onClick={this.handleClick}>
        </AtTabs>
        <ScrollView
          scrollY
          scrollWithAnimation
          onScrollToLower={this.onScrollToLower}
          style={{ height: `${windowHeight - 54}px`, marginTop: '10PX' }}
        >
          {
            this.props[tabList[current].type].total === 0 ? <View className="no-data">
              <Image className="no-dataimage" src={require('../../images/task/meiyoushuju.png')} />
              <View className="text">
                <Text>没有数据</Text>
              </View>
            </View> : <View>
                {
                  this.props[tabList[current].type].list.map((data) => (
                    <View className="card">
                      <View className="card-detail" key={data.id} onClick={() => this.orderDetail(data)} >
                        <View className="card-meta" >
                          <View className="des">
                            <Text className="user-name">{data.name}</Text>
                            <Text className="time">{data.createDate}</Text>
                          </View>
                        </View>
                        <View>
                          <Text className="product-name">地址: {`${data.idAddrProvince}${data.idAddrCity}${data.idAddrArea}${data.idAddrDetails}`}</Text>
                        </View>
                        <View>
                          <Text className="product-name">手机号码: {data.phone}</Text>
                        </View>
                      </View>
                    </View>

                  ))
                }

              </View>
          }
          {loadMore || status === 'noMore' ?
            <AtLoadMore
              status={status}
            />: ''
          }
        </ScrollView>

      </View>
    );
  }
}

export default Order;
