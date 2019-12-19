import Request from '../../utils/request';

export const validRepetition = data =>
  Request({
    url: '/clCollectClientInfoController.do?validRepetition',
    method: 'POST',
    data,
  });

