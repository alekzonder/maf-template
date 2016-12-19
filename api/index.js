module.exports = (config, models, di) => {

    return new Promise((resolve, reject) => {

        var A = {
            Test: require('./Test'),
            RestApiClient: require('maf/Rest/Client'),
        };

        var api = {};

        api.test = new A.Test({}, models, api);
        api.rest = new A.RestApiClient();

        for (var name in api) {
            if (di.debug && api[name].setDebugger) {
                api[name].setDebugger(di.debug);
            }
        }

        api.createTest = () => {

            return new Promise((resolve, reject) => {
                api.checks.createTest()
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });

        };

        resolve(api);
    });

};
