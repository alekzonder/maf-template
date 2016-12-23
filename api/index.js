var createApiCollection = require('maf/Api/createCollection');

module.exports = (config, models, di) => {

    return new Promise((resolve, reject) => {

        var apiClasses = {
            lists: require('./Lists'),
            tasks: require('./Tasks'),
            rest: require('maf/Rest/Client'),
        };

        var createFn = function (di, ApiClass) {
            return new ApiClass(di.models, di.api);
        };

        createApiCollection(di, apiClasses, createFn)
            .then((api) => {
                resolve(api);
            })
            .catch((error) => {
                reject(error);
            });

    });

};
