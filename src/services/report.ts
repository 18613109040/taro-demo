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
// 暂时保存
export const temporaryService = data =>
  Request({
    url: '/clCollectClientInfoBigDataController.do?updateDraft',
    method: 'POST',
    data,
  });
// 订单详情
export const getOrderDetail = data =>
  Request({
    url: '/clCollectClientInfoBigDataController.do?getStatus',
    method: 'GET',
    data,
  });
// 获取产品信息
export const getProductList = data =>
  Request({
    url: '/clProductController.do?getProductData',
    method: 'GET',
    data,
  });
// 获取产品详情
export const getProduct = data =>
  Request({
    url: '/clProductController.do?getProductInfo',
    method: 'GET',
    data,
  });

// 获取产品计算属性
export const getProductCompute = data =>
  Request({
    url: '/clCollectClientInfoController.do?applyAmount',
    method: 'GET',
    data,
  });
// 删除图片
export const deteleFile = data => 
  Request({
    url: '/clCollectClientInfoController.do?deteleFile',
    method: 'POST',
    data,
  });

// 获取还款明细 
export const repayDetail = data => 
  Request({
    url: '/clRepaymentRecordController.do?repaymentInfo',
    method: 'GET',
    data,
  });

export const updateInfo = data => 
  Request({
    url: '/clCollectClientInfoController.do?updateInfo',
    method: 'POST',
    data,
  });

// 获取省
export const getProvince = data => 
  Request({
    url: '/byProvinceController.do?getAll',
    method: 'GET',
    data,
  });

// 通过省获取市
export const getCitysById = data => 
  Request({
    url: '/byCityController.do?getByPid',
    method: 'GET',
    data,
  });
// 获取县
export const getAreasById = data => 
  Request({
    url: '/byAreaController.do?getByPid',
    method: 'GET',
    data,
  });
// 获取GPS
export const getGpsInstallInfo = data =>
  Request({
    url: '/clGpsInstallInfoController.do?getById',
    method: 'GET',
    data,
  });
// 获取车辆抵押信息
export const getCarMortgageInfo = data =>
  Request({
    url: '/clCollectClientInfoController.do?clCarInfoList',
    method: 'GET',
    data,
  });
// 生成下载模板
export const generateTemplate = data =>
  Request({
    url: '/clContractManageController.do?offlineContract',
    method: 'POST',
    data,
  });
