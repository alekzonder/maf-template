'use strict';

var Abstract = require('./Abstract');

class Test extends Abstract {

    find () {

        return new Promise((resolve, reject) => {

            this._models.test.find().exec()
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });

    }
}

module.exports = Test;
