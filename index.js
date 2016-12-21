var path = require('path');

var logger = require('maf/Service/Logger')('maf-template');

var init = {
    config: require(path.join(__dirname, '/init/config')),
    di: require(path.join(__dirname, '/init/di')),
    rest: require(path.join(__dirname, '/init/rest'))
};

init.config(logger)
    .then((config) => {
        logger.setLevel(config.get('logLevel'));
        return init.di(logger, config);
    })
    .then((di) => {

        var appConfig = {
            bodyParser: {
                urlencoded: true
            },
            requestDebug: {
                initDiFn: init.di
            }
        };

        var app = require('maf/Service/Application')(di, appConfig);

        return init.rest(logger, app, di);

    })
    .then((app) => {

        var config = app.di.config;

        var host = config.get('host');
        var port = config.get('port');

        app.listen(port, host, function () {
            logger.info(`listen on ${host}:${port}`);
        });

        // for (var layer of app._router.stack) {
        //     if (!layer.route || !layer.route.path) {
        //         continue;
        //     }
        //
        //     console.log(layer.route.path, Object.keys(layer.route.methods));
        // }

    })
    .catch((error) => {
        logger.fatal(error);
        throw error;
    });
