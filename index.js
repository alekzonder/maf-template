// huge RAM usage
// require('maf/vendors/trace');
// require('maf/vendors/clarify');

var path = require('path');

var logger = require('maf/Service/Logger')('maf-template');

require('maf/init/errorHandlers')(logger);

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

        app.use(require('maf/express/resource-not-found')());

        var config = app.di.config;

        var host = config.get('host');
        var port = config.get('port');

        app.listen(port, host, function () {
            logger.info(`listen on ${host}:${port}`);
        });
    })
    .catch((error) => {
        logger.fatal(error);
        throw error;
    });
