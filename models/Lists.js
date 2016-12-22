'use strict';

var Abstract = require('./Abstract');

class Lists extends Abstract {

    constructor (db) {
        super(db);

        this._collectionName = 'lists';

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

module.exports = Lists;
