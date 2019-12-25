import Request from '../utils/request';

export const validRepetition = data =>
  Request({
    url: '/clCollectClientInfoController.do?validRepetition',
    method: 'POST',
    data,
  });

export const getProductOptions = data =>
  Request({
    url: '/clProductController.do?getProductData&keyWord=0',
    method: 'POST',
    data,
  });

// 保存
export const temporaryService = data =>
  Request({
    url: '/clCollectClientInfoController.do?doAdd',
    method: 'POST',
    data,
  });
