import Request from '../utils/request';

export const getOrderList = data =>
  Request({
    url: '/spController.do',
    method: 'GET',
    data,
  });

