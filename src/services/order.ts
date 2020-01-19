import Request from "../utils/request";

export const getOrderList = data =>
  Request({
    url: "/clCollectClientInfoController.do?datagrid",
    method: "GET",
    data
  });
// 获取待办任务
export const getTaskList = data =>
  Request({
    url: "/clTaskController.do?datagrid",
    method: "POST",
    data
  });

// 获取大数据列表
export const getBigList = data =>
  Request({
    url: "/clCollectClientInfoBigDataController.do?datagrid",
    method: "POST",
    data
  });
