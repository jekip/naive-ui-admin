
export type operationTypeList = {
  operationID: number; //操作ID
  salesName: string; //业务员
  customerID: number; //客户代码
  planAmount: number; // 箱
  realAmount: number; // 箱
  planCheck: string; //清点
  realCheck: string; //清点
  planOpenBox: string; //拆箱
  realOpenBox: string; //拆箱
  planOpenTray: string; //拆托盘
  realOpenTray: string; //拆托盘
  planBoxLabel: string; //箱唛标签
  realBoxLabel: string; //箱唛标签
  planSkuLabel: string; //SKU标签
  realSkuLabel: string; //SKU标签
  planSelectBoxOnSku: string; //按sku挑箱
  realSelectBoxOnSku: string; //按sku挑箱
  planTrayAmount: number; //托盘数
  realTrayAmount: number; //托盘数
  planOneUseTray: string; //托盘耗材费
  realOneUseTray: string; //托盘耗材费
  planTraySize: string; //托盘尺寸
  realTraySize: string; //托盘尺寸
  planTakePic: string; //照相
  realTakePic: string; //照相
  planMakeBoxStrong: string; //箱体加固
  realMakeBoxStrong: string; //箱体加固
  planNoLogoSelect: string; //无标识附加费
  realNoLogoSelect: string; //无标识附加费
  planCoverLogo: string; //覆盖标识
  realCoverLogo: string; //覆盖标识
  planPaperBox: string; //纸箱耗材
  realPaperBox: string; //纸箱耗材
  planCourierBag: string; //快递袋
  realCourierBag: string; //快递袋
  planOtherConsumables: string; //其他耗材
  realOtherConsumables: string; //其他耗材
  planDestruction: string; //销毁
  realDestruction: string; //销毁
  singleThingOneOrder: string; //一单一件订单
  multipleThingOneOrder: string; //一单多件订单
  totalPackages: number; //总件数
};
