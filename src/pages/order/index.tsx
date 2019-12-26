import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux';
import { SystemInfoProps } from '../../interface/common'
import { OrderProps } from '../../interface/order'
import './index.scss';
type IState = {
  current: number;
}
type IProps = {
  systemInfo: SystemInfoProps;
  order: OrderProps;
  dispatch?: any;
}
@connect(({ common, order }) => ({
  systemInfo: common.systemInfo,
  order: order
}))
class Order extends Component<IProps, IState>{
  config = {
    navigationBarTitleText: '',  // 材料附件
  }
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }
  componentDidMount = () => {
    this.getData()
  }
  getData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/getOrderListAction',
      payload: {
        type: 'all',
        datagrid: '',
        page: 1,
        rows: 10,
        sort: 'id',
        order: 'desc',
        name: '',
        phone: '',
        reportStatus: 2,
        primaryStatus: 1,
        idCard: '',
        productName: '',
        id: '',
        field: 'id,createName,updateName,updateDate,name,productName'
      }
    })
  }
  handleClick = (value) => {
    this.setState({
      current: value
    })
  }
  onScrollToLower = () => {
    this.getData()
  }
  render() {
    const { windowHeight } = this.props.systemInfo;
    const { order: { all } } = this.props;
    const { current } = this.state;
    const tabList = [{ title: '标签1' }, { title: '标签2' }, { title: '标签3' }, { title: '标签4' }, { title: '标签5' }, { title: '标签6' }]
    const status = ['审核中', '', '审核-已通过','','','','','审核-已拒绝']
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
              <View>
                {
                  all && all.list && all.list.map((item, index) => (
                    <View className="card-detail" key={index} >
                      <View className="card-meta" >
                        <View className="des">
                          <Text className="user-name">{item.name}</Text>
                          <Text className="time">{item.updateDate}</Text>
                        </View>
                  <Text className="status">{item.reportStatus === 2 ? ''}</Text>
                      </View>
                      <View>
                        <Text className="product-name">{item.productName}</Text>
                      </View>
                    </View>

                  ))
                }

              </View>
            </ScrollView>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <ScrollView
              scrollY
              scrollWithAnimation
              style={{ height: `${windowHeight - 54}px`, marginTop: '10PX' }}
            ></ScrollView>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <ScrollView
              scrollY
              scrollWithAnimation
              style={{ height: `${windowHeight - 54}px`, marginTop: '10PX' }}
            ></ScrollView>
          </AtTabsPane>
        </AtTabs>

      </View>
    );
  }
}

export default Order;
