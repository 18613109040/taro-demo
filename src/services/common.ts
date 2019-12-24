import Request from '../utils/request';

export const login = data =>
  Request({
    url: '/loginController.do?checkuser',
    method: 'POST',
    data,
  });