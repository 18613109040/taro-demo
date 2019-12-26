import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../config';

export default (options = { method: 'GET', data: {} }) => {
  if (!noConsole) {
    console.log(
      `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
        options.data
      )}`
    );
  }
  return Taro.request({
    url: baseUrl + options.url,
    data: {
      ...options.data,
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'Hm_lvt_098e6e84ab585bf0c2e6853604192b8b=1575814668; i18n_browser_Lang=zh-cn; JEECGINDEXSTYLE=hplus; JSESSIONID=95426566D1E2BD1990A848DB2275881C; Hm_lpvt_098e6e84ab585bf0c2e6853604192b8b=1577348667; ZINDEXNUMBER=1990'
    },
    method: options.method.toUpperCase(),
  }).then(res => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(
          `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
          res.data
        );
      }
      // if (data.status !== 'ok') {
      //   Taro.showToast({
      //     title: `${res.data.error.message}~` || res.data.error.code,
      //     icon: 'none',
      //     mask: true,
      //   });
      // }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
};
