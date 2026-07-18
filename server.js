const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3465;

function computeDiff(oldText, newText) {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');

  const m = oldLines.length;
  const n = newLines.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result = [];
  let i = m, j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      result.unshift({ type: 'same', oldLine: oldLines[i - 1], newLine: newLines[j - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'added', oldLine: null, newLine: newLines[j - 1] });
      j--;
    } else {
      result.unshift({ type: 'removed', oldLine: oldLines[i - 1], newLine: null });
      i--;
    }
  }

  const merged = [];
  let k = 0;

  while (k < result.length) {
    if (result[k].type === 'removed') {
      const removedLines = [];
      while (k < result.length && result[k].type === 'removed') {
        removedLines.push(result[k].oldLine);
        k++;
      }

      const addedLines = [];
      while (k < result.length && result[k].type === 'added') {
        addedLines.push(result[k].newLine);
        k++;
      }

      const pairs = Math.min(removedLines.length, addedLines.length);
      for (let p = 0; p < pairs; p++) {
        merged.push({ type: 'changed', oldLine: removedLines[p], newLine: addedLines[p] });
      }
      for (let p = pairs; p < removedLines.length; p++) {
        merged.push({ type: 'removed', oldLine: removedLines[p], newLine: null });
      }
      for (let p = pairs; p < addedLines.length; p++) {
        merged.push({ type: 'added', oldLine: null, newLine: addedLines[p] });
      }
    } else if (result[k].type === 'added') {
      const addedLines = [];
      while (k < result.length && result[k].type === 'added') {
        addedLines.push(result[k].newLine);
        k++;
      }
      for (const line of addedLines) {
        merged.push({ type: 'added', oldLine: null, newLine: line });
      }
    } else {
      merged.push(result[k]);
      k++;
    }
  }

  const stats = { added: 0, removed: 0, changed: 0 };
  for (const line of merged) {
    if (line.type === 'added') stats.added++;
    else if (line.type === 'removed') stats.removed++;
    else if (line.type === 'changed') stats.changed++;
  }

  return { lines: merged, stats };
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/diff') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { oldText, newText } = JSON.parse(body);
        const result = computeDiff(oldText || '', newText || '');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(result));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Diff Viewer запущен на http://localhost:${PORT}`);
});
