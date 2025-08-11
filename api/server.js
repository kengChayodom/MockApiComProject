const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '..', 'db.json'));
const middlewares = jsonServer.defaults();

const READ_ONLY = (process.env.READ_ONLY ?? 'true').toLowerCase() !== 'false';

// ===== เพิ่มตรงนี้ =====
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // อนุญาตทุก origin
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  res.header('Access-Control-Expose-Headers', 'X-Total-Count, Link')

  if (req.method === 'OPTIONS') { 
    return res.sendStatus(200);
  }
  next();
});
// ========================

server.use(middlewares);

// Block write methods when in read-only mode
server.use((req, res, next) => {
  if (READ_ONLY && !['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return res.status(403).json({ error: 'Read-only mock API (forbidden)' });
  }
  next();
});

server.use('/', router);

module.exports = server;
