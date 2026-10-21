/**
 * 构建产物体积报告
 *
 * 统计「首屏加载体积」（从 index.html 入口出发的静态导入闭包）与「总量」，
 * 用于把包体优化的效果量化，而不是只看 dist 目录总大小。
 *
 * 用法：node scripts/report-bundle-size.mjs [distDir]
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { gzipSync, brotliCompressSync } from 'node:zlib';
import { join, resolve } from 'node:path';

const distDir = resolve(process.argv[2] || 'dist');
const assetsDir = join(distDir, 'assets');

/** 抽取一个 chunk 的静态依赖（import ... from "./x.js" / import "./x.js" / require） */
function importsOf(code) {
  const deps = new Set();
  const re = /(?:from|import|require\()\s*["'](\.\/[^"']+\.js)["']/g;
  let m;
  while ((m = re.exec(code))) deps.add(m[1]);
  return [...deps];
}

const cache = new Map();
function readChunk(rel) {
  if (!cache.has(rel)) {
    const abs = join(assetsDir, rel);
    cache.set(rel, readFileSync(abs, 'utf8'));
  }
  return cache.get(rel);
}

function sizeOf(rel) {
  return statSync(join(assetsDir, rel)).size;
}

const html = readFileSync(join(distDir, 'index.html'), 'utf8');
const entries = [...html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)]
  .map((m) => m[1])
  .filter((src) => src.startsWith('/assets/') || src.startsWith('assets/'))
  .map((src) => src.replace(/^\/?assets\//, ''));

const seen = new Set();
const queue = [...entries];
while (queue.length) {
  const rel = queue.pop();
  if (seen.has(rel)) continue;
  seen.add(rel);
  for (const dep of importsOf(readChunk(rel))) {
    if (!seen.has(dep)) queue.push(dep);
  }
}

const all = readdirSync(assetsDir).filter((f) => f.endsWith('.js'));
const kb = (n) => (n / 1024).toFixed(1);
const sum = (list, fn = sizeOf) => list.reduce((acc, f) => acc + fn(f), 0);

/** 压缩后体积：更贴近用户实际下载大小 */
const gzipSizeOf = (f) => gzipSync(readChunk(f)).length;
const brotliSizeOf = (f) => brotliCompressSync(readChunk(f)).length;

const firstLoad = [...seen].sort((a, b) => sizeOf(b) - sizeOf(a));
const firstLoadSize = sum(firstLoad);
const totalSize = sum(all);

console.log('\n产物目录：' + distDir);
console.log('─────────────────────────────────────────────────────────');
console.log('首屏加载（入口静态闭包）       原始      gzip   brotli');
for (const f of firstLoad) {
  console.log(
    `  ${kb(sizeOf(f)).padStart(9)} ${kb(gzipSizeOf(f)).padStart(9)} ${kb(brotliSizeOf(f)).padStart(
      9
    )} KB  ${f}`
  );
}
console.log(`  ${'-'.repeat(52)}`);
console.log(
  `  ${kb(firstLoadSize).padStart(9)} ${kb(sum(firstLoad, gzipSizeOf)).padStart(9)} ${kb(
    sum(firstLoad, brotliSizeOf)
  ).padStart(9)} KB  合计 ${firstLoad.length} 个 chunk`
);
console.log('─────────────────────────────────────────────────────────');
console.log(
  `全部 JS：${kb(totalSize)} KB / gzip ${kb(sum(all, gzipSizeOf))} KB（${all.length} 个 chunk）`
);
console.log(`其中按需（非首屏）：${kb(totalSize - firstLoadSize)} KB\n`);

// 体积预算：超过阈值时以非零码退出，便于接入 CI
const budgetKb = Number(process.env.BUNDLE_BUDGET_KB || 0);
const firstLoadGzipKb = sum(firstLoad, gzipSizeOf) / 1024;
if (budgetKb && firstLoadGzipKb > budgetKb) {
  console.error(`✗ 首屏 gzip 体积 ${firstLoadGzipKb.toFixed(1)} KB 超出预算 ${budgetKb} KB`);
  process.exit(1);
}
if (budgetKb) {
  console.log(`✓ 首屏 gzip ${firstLoadGzipKb.toFixed(1)} KB，预算内（≤ ${budgetKb} KB）\n`);
}
