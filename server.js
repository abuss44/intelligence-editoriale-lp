const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
};

http.createServer(function(req, res) {
  var url  = decodeURIComponent(req.url.split('?')[0]);
  var file = path.join(ROOT, url === '/' ? 'index.html' : url);

  fs.readFile(file, function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end('Not found: ' + url);
      return;
    }
    var ext  = path.extname(file).toLowerCase();
    var mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}).listen(PORT, function() {
  console.log('Server running at http://localhost:' + PORT);
});
