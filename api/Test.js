'use strict';

var Abstract = require('./Abstract');

class Test extends Abstract {

    find () {

        return new Promise((resolve, reject) => {
            resolve({
                total: 3,
                docs: [1, 2, 3]
            });
        });

    }
}

module.exports = Test;
