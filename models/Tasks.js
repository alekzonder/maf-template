'use strict';

var Abstract = require('./Abstract');

class Tasks extends Abstract {

    constructor (db) {
        super(db);

        this._collectionName = 'tasks';

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

module.exports = Tasks;
