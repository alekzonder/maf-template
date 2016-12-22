'use strict';

var joi = require('maf/vendors/joi');

var CrudAbstract = require('maf/Api/CrudAbstract');

class Test extends CrudAbstract {

    constructor (models, api) {
        super(models, api);

        this._modelName = 'test';

        this._setEntityName('test');

        this._creationSchema = joi.object().keys({
            name: joi.string().required(),
            title: joi.string().required()
        });
    }

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
