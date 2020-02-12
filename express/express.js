let url = require('url');
let http = require('http');
let express = function () {
    let app = function (req, res) {
        let {pathname} = url.parse(req.url, true);
        let method = req.method.toLowerCase();
        let index = 0;

        function next(err) {
            if (index >= app.routes.length) {
                return res.end(`CANNOT ${method} ${pathname}`);
            }
            let route = app.routes[index++];
            if (err) {
                if (route.method == 'middle' && route.handler.length == 4) {
                    route.handler(req, res, next)
                }
            }
            if (route.method == 'middle') {
                if (route.path == '/' || pathname.startsWith(route.path + '/') || route.path == pathname) {
                    route.handler(req, res, next);
                } else {
                    next();
                }
            } else {
                if ((route.path == pathname || route.path == "*") && (route.method == req.method.toLowerCase()) || method == 'all') {
                    return route.handler(req, res);
                } else {
                    next();
                }
            }
        }

        next();
    }
    app.routes = [];
    app.listen = function (port) {
        http.createServer(app).listen(port);
    }
    http.METHODS.forEach(function (method) {
        method = method.toLowerCase();
        app[method] = function (path, handler) {
            app.routes.push({
                path, handler, method
            });
        }
    });
    app.all = function (path, handler) {
        app.routes.push({
            path, handler, method: 'all'
        });
    }
    app.use = function (path, handler) {
        if (typeof handler != 'function') {
            handler = path;
            path = "/";
        }
        app.routes.push({
            method: 'middle',
            path,
            handler
        });
    }

    return app;
}

module.exports = express;