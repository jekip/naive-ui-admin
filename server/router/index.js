/* eslint-disable no-bitwise */
const Router = require('koa-router');
const router = new Router();
const utils = require('./../utils/index');

const htmlEntity = require('./html/index');

const files = utils.readAllJSFile(__dirname);

files.forEach((file) => {
  const { filename, filePath } = file;
  const fileEntity = require(filePath);
  if (filename !== 'index') {
    router.use(`/${filename}`, fileEntity.routes(), fileEntity.allowedMethods());
  }
});

router.use('/', htmlEntity.routes(), htmlEntity.allowedMethods());
module.exports = router;
