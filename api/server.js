const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '..', 'db.json'));
const middlewares = jsonServer.defaults();

// Allow CORS, static, logger, etc.
server.use(middlewares);

// Read-only mode (default true). To allow write, set READ_ONLY=false in Vercel env.
const READ_ONLY = (process.env.READ_ONLY ?? 'true').toLowerCase() !== 'false';

// Optional: namespace under /api
server.use((req, res, next) => {
  // Block write methods when in read-only mode
  if (READ_ONLY && !['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return res.status(403).json({ error: 'Read-only mock API (forbidden)' });
  }
  next();
});

// Mount the router at / (or change to '/api' if you prefer /api/... endpoints)
server.use('/', router);

module.exports = server;