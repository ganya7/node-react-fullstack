// const proxy = require('http-proxy-middleware')   // deprecated
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    // app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));   // deprecated
    app.use(createProxyMiddleware(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
}

/*
// deprecated proxy code : doesnt work

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/**', { target: 'http://localhost:5000' }));
}; */