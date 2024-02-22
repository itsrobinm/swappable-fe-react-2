const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      //target: 'http://api.swappable.co.uk/',
      target: "http://localhost:8000/",
      changeOrigin: true,
      pathRewrite: {
        '^/api':'' // remove /api/
      }
    })
  );
};