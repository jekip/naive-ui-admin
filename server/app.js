#!/usr/bin/env node

/* eslint-disable comma-dangle */
/* eslint-disable semi */
const Koa = require('koa');
const http = require('http');
const logger = require('koa-logger');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
// const jwt = require('koa-jwt')
const koaStatic = require('koa-static');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const XResponseTime = require('./middleware/XResponseTime');
// const history = require('./middleware/koa2-connect-history-api-fallback');

const app = new Koa();
const router = require('./router');

// ？// 前端使用hash模式 暂时不需要兼容history
// app.use(
//   history({
//     index: '/businessfonted',
//     verbose: true, //打出转发日志
//   })
// );

// logger
app.use(logger());
// CORS middleware for koa2
app.use(cors());
// app.use(
//     cors({
//         origin: 'https://imcoco.top',
//         exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//         maxAge: 5,
//         credentials: true,
//         allowMethods: ['GET', 'POST', 'DELETE'],
//         allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
//     })
// )
// Important security headers for koa
app.use(helmet());
// Compress middleware for Koa
app.use(
  compress({
    filter(contentType) {
      return /text/i.test(contentType);
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH,
  })
);
// x-response-time
app.use(XResponseTime);
app.use(koaStatic('views'));

// Middleware below this line is only reached if JWT token is valid
// unless the URL starts with '/public'
// app.use(jwt({ secret: ['coco', 'imcoco'] }).unless({ path: [/^\/public/, /^\/images/, /\.ico$/] }))

// Must be used before any router is used
// 用法 @see https://github.com/queckezz/koa-views
app.use(
  views(`${__dirname}/views`, {
    map: {
      html: 'handlebars',
    },
    extension: 'html',
  })
);

// router
app.use(router.routes());
app.use(router.allowedMethods());

// a body parser for koa
app.use(bodyParser());
const PORT = process.env.PORT || 8996;
// 这意味着您可以将同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址
http.createServer(app.callback()).listen(PORT, () => {
  console.log(`KOA server has be started on ${PORT}`);
});
