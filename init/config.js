var ServiceConfig = require('maf/Service/Config');

var configSchema = require('../config.schema.js');

module.exports = function (logger) {

    return new Promise((resolve, reject) => {

        var options = {
            configPath: '/data/etc/maf-template/config.json',
            schema: configSchema
        };

        var config = new ServiceConfig(logger, options);

        config.load()
            .then(() => {
                logger.debug('got config', config.toObject());
                resolve(config);
            })
            .catch((error) => {
                reject(error);
            });

    });

};
