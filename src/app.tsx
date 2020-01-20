import '@tarojs/async-await';
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux';
import AppContainer from './pages/app/index'
import dva from './utils/dva';
import models from './models';
import './styles/base.scss';
const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {
  config: Config = {
    pages: [
      
      'pages/home/index',
      'pages/login/index',
      'pages/bigControl/index',
      'pages/batchOrder/index',
      'pages/infoSupplement/index',
      'pages/report/index',
      'pages/order/index',
      'pages/carMortgage/index',
      'pages/car/base',
      'pages/base/index',
      'pages/bankcard/index',
      'pages/fastApproval/index',
      'pages/account/index',
      'pages/loanMaterial/index',
      'pages/contractDownload/index',
      'pages/material/index',
      'pages/gpsInstall/index',
      'pages/product/index',
      'pages/prepare/index',
      'pages/idcard/index',
      'pages/guarantee/index',
      'pages/contact/index',
     
      
      
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#F5F5FA',
      navigationBarTitleText: 'Taro Demo',
      navigationBarTextStyle: 'black',
      // navigationStyle: "custom"
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: './images/tabBar/home.png',
          selectedIconPath: './images/tabBar/home-fill.png',
        },
        {
          pagePath: 'pages/batchOrder/index',
          text: '秒批',
          iconPath: './images/tabBar/fengkong.png',
          selectedIconPath: './images/tabBar/fengkong-fill.png',
        },
        {
          pagePath: 'pages/order/index',
          text: '任务',
          iconPath: './images/tabBar/order.png',
          selectedIconPath: './images/tabBar/order-fill.png',
        },
        {
          pagePath: 'pages/account/index',
          text: '我的',
          iconPath: './images/tabBar/my.png',
          selectedIconPath: './images/tabBar/my-fill.png',
        },
      ],
      color: '#333',
      selectedColor: '#283282',
      backgroundColor: '#fff',
      borderStyle: 'white',
    },
  };
  componentWillMount() {
    // const cookies = Taro.getStorageSync('cookie');
    // if(cookies){
    //   Taro.reLaunch({
    //     url: '/pages/home/index'
    //   })
    // }

  }
  componentDidMount() { }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
