#!/usr/bin/bash
node -v
npm -v

npm i --production
pm2 startOrReload pm2.config.js
