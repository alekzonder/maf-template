var createApiCollection = require('maf/Api/createCollection');

module.exports = (config, models, di) => {

    return new Promise((resolve, reject) => {

        var apiClasses = {
            lists: require('./Lists'),
            tasks: require('./Tasks'),
            test: require('./Test'),
            rest: require('maf/Rest/Client'),
        };

        var createFunctions = {

            test: function (di, ApiClass) {
                return new ApiClass({some: 'custom data'});
            },

            default: function (di, ApiClass) {
                return new ApiClass(di.models, di.api);
            }
        };

        // old style init createFunctionss
        // var createFunctions = function (di, ApiClass) {
        //     return new ApiClass(di.models, di.api);
        // };

        createApiCollection(di, apiClasses, createFunctions)
            .then((api) => {
                resolve(api);
            })
            .catch((error) => {
                reject(error);
            });

    });

};
