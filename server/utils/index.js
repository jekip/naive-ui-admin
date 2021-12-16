const path = require('path');
const fs = require('fs');

/**
 * 判断是否是js文件
 * @param {String} file 文件名
 * @returns true|false
 */
const isJS = (file) => /^[^.].*\.js$/.test(file);

/**
 * 遍历目录以及子目录下所有的js文件
 * @param {String} dir 目录名
 * @returns {string[]} 所有的js文件名
 */
function readAllJSFilename(dir) {
  const files = fs.readdirSync(dir);
  return files.reduce((pre, curr) => {
    if (isJS(curr)) return [...pre, curr];
    if (fs.statSync(path.resolve(dir, curr)).isDirectory()) {
      return [...pre, ...readAllJSFilename(path.resolve(dir, curr))];
    }
    return pre;
  }, []);
}

/**
 * 遍历目录以及子目录下所有的js文件
 * @param {String} dir 目录名
 * @returns {string[]} 所有js文件的完整绝对路径
 */
function readAllJSFilePath(dir) {
  const files = fs.readdirSync(dir);
  return files.reduce((pre, curr) => {
    if (isJS(curr)) return [...pre, path.resolve(dir, curr)];
    if (fs.statSync(path.resolve(dir, curr)).isDirectory()) {
      return [...pre, ...readAllJSFilePath(path.resolve(dir, curr))];
    }
    return pre;
  }, []);
}

/**
 * 遍历目录以及子目录下所有的js文件
 * @param {String} dir 目录名
 * @returns {Array<{filename: String, filePath: String}>} 返回文件名和文件路径数组
 */
function readAllJSFile(dir) {
  const files = fs.readdirSync(dir);
  return files.reduce((pre, curr) => {
    if (isJS(curr))
      return [...pre, { filename: curr.replace(/\.js$/, ''), filePath: path.resolve(dir, curr) }];
    if (fs.statSync(path.resolve(dir, curr)).isDirectory()) {
      return [...pre, ...readAllJSFile(path.resolve(dir, curr))];
    }
    return pre;
  }, []);
}

//
exports.isJS = isJS;
exports.readAllJSFilename = readAllJSFilename;
exports.readAllJSFilePath = readAllJSFilePath;
exports.readAllJSFile = readAllJSFile;
