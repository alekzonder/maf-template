'use strict';

var Abstract = require('./Abstract');

class Test extends Abstract {

    find (filters, fields) {

        return new Promise((resolve, reject) => {

            this._models.test.find(filters, fields)
                .exec()
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
