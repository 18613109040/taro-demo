import Request from '../utils/request';
// clCollectClientInfoBigDataController/filedeal.do
export const approval = data =>
  Request({
    url: "/clCollectClientInfoBigDataController.do?doAdd",
    method: 'POST',
    data,
  });