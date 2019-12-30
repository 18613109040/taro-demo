import Request from '../utils/request';

export const login = data =>
  Request({
    url: '/loginController.do?checkUserNoRand',
    method: 'POST',
    data,
  });