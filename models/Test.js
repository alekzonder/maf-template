'use strict';

var Abstract = require('./Abstract');

class Test extends Abstract {

    constructor (db) {
        super(db);

        this._collectionName = 'test';

        this._indexes = [
            {
                fields: {
                    name: 1
                },
                options: {
                    name: 'name',
                    unique: true,
                    background: true
                }
            }
        ];
    }

}

module.exports = Test;