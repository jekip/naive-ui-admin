const router = require('koa-router')();

router.get('/', async (ctx /* next */) => {
  ctx.state = {
    // title: 'BLOG test',
    // body: 'BLOG test router',
  };

  await ctx.render('index.html');
});

module.exports = router;
