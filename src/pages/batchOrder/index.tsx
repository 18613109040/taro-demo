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
  systemInfo: SystemInfoProps;
  allbig: any;
  underbig: any;
  backbig: any;
  fulbig: any;
  dispatch?: any;
}
@connect(({ common, order }) => ({
  systemInfo: common.systemInfo,
  allbig: order.allbig,
  underbig: order.underbig,
  backbig: order.backbig,
  fulbig: order.fulbig
}))
class batchOrder extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '',  // 材料附件
  }
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      height: props.systemInfo.windowHeight,
      loadMore: false,
      tabList: [{ title: '全部', type: 'allbig' }, { title: '审核中', type: 'underbig' }, { title: '完成', type: 'fulbig' }, { title: '拒绝', type: 'backbig' }]
    }
  }
  componentDidMount = () => {
    this.getData();
  }
  async getData() {
    this.setState({ loadMore: true })
    const { current, tabList } = this.state;
    const { dispatch } = this.props;
    const currentType = tabList[current].type
    await dispatch({
      type: 'order/getBigListAction',
      payload: {
        type: currentType,
        page: this.props[currentType].page,
        rows: 10,
        pinganBigStatus: current === 0 ? '' : current - 1,
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
  render() {
    const { windowHeight } = this.props.systemInfo;
    const { current, tabList, loadMore } = this.state;
    const status = loadMore ? 'loading' : loadMore && this.props[tabList[current].type].list.length === this.props[tabList[current].type].total ? 'noMore' : ''
    return (
      <View className="order-page">
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick}>

          <AtTabsPane current={current} index={0} >
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
              {loadMore &&
                <AtLoadMore
                  status={status}
                />
              }
            </ScrollView>
          </AtTabsPane>

          <AtTabsPane current={current} index={1} >
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
              {loadMore &&
                <AtLoadMore
                  status={status}
                />
              }
            </ScrollView>
          </AtTabsPane>

          <AtTabsPane current={current} index={2} >
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
              {loadMore &&
                <AtLoadMore
                  status={status}
                />
              }
            </ScrollView>
          </AtTabsPane>

          <AtTabsPane current={current} index={3} >
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
              {loadMore &&
                <AtLoadMore
                  status={status}
                />
              }
            </ScrollView>
          </AtTabsPane>

          
        </AtTabs>

      </View>
    );
  }
}

export default batchOrder;
