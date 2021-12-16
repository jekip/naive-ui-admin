// router -> controllers -> models 模型

const router = require('koa-router')();
// 版本信息
const version = require('../../controllers/version');

// GET 版本信息列表
router.get('/info', version.versionInfo);

module.exports = router;
