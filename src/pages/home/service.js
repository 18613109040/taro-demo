import Request from '../../utils/request';

export const appBanner = data =>
  Request({
    url: '/api-cms/v3/app-banner/ZH',
    method: 'GET',
    data,
  });

