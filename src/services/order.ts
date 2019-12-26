import Request from '../utils/request';

export const getOrderList = data =>
  Request({
    url: '/clCollectClientInfoController.do',
    method: 'GET',
    data,
  });

