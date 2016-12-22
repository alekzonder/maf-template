module.exports = (config, models, di) => {

    return new Promise((resolve, reject) => {

        var A = {
            Lists: require('./Lists'),
            Tasks: require('./Tasks'),
            RestApiClient: require('maf/Rest/Client'),
        };

        var api = {};

        api.lists = new A.Lists(models, api);
        api.tasks = new A.Tasks(models, api);
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
