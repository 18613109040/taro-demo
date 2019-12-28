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
      'pages/fastApproval/index',
      'pages/material/index',
      'pages/prepare/index',
      'pages/order/index',
      'pages/report/index',
      'pages/login/index',
      
      'pages/home/index',
      
      
      'pages/idcard/index',
      'pages/product/index',
      
      'pages/guarantee/index',
      'pages/contact/index',
      'pages/car/base',
      'pages/bankcard/index',
      
      'pages/base/index',

      
      
      'pages/userinfo/index',
      'pages/userlist/index',
      'pages/account/index',
      
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
          text: '机票',
          iconPath: './images/tabBar/home.png',
          selectedIconPath: './images/tabBar/home-fill.png',
        },
        // {
        //   pagePath: 'pages/products/index',
        //   text: '订单',
        //   iconPath: './images/tab/find.png',
        //   selectedIconPath: './images/tab/find-active.png',
        // },
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
    // store.dispatch({
    //   type: 'common/'
    // })
    // console.dir(Taro.getMenuButtonBoundingClientRect())
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
