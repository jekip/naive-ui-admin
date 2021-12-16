// 读取package.json文件，缓存内容
var pjson = require('./../package.json');

/**
 * 版本更新信息列表
 */
exports.versionInfo = async (ctx, next) => {
  ctx.body = {
    result: { status: 1, errorcode: 0 },
    data: {
      version: pjson.version,
    },
  };
};
