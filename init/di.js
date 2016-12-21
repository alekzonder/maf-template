var path = require('path');

var Di = require('maf/Di');
var RequestDebug = require('maf/Request/Debug');

var init = {
    db: require(path.join(__dirname, 'db')),
    models: require(path.join(__dirname, '..', 'models')),
    api: require(path.join(__dirname, '..', 'api'))
};

module.exports = (logger, config, originalDi) => {

    return new Promise((resolve, reject) => {

        var di = new Di();

        di.config = config;

        di.logger = logger;

        Promise.resolve()
            .then(() => {

                if (originalDi) {
                    di.debug = new RequestDebug();
                    di.setConnections(originalDi.getConnections());
                } else {
                    return init.db(config, di);
                }

            })
            .then(() => {
                return init.models(config, di);
            })
            .then((models) => {
                di.models = models;
                return init.api(config, models, di);
            })
            .then((api) => {
                di.api = api;
                resolve(di);
            })
            .catch((error) => {
                reject(error);
            });

    });

};
