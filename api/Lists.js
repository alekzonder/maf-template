'use strict';

var joi = require('maf/vendors/joi');

var CrudAbstract = require('maf/Api/CrudAbstract');

class Lists extends CrudAbstract {

    constructor (models, api) {
        super(models, api);

        this._modelName = 'lists';

        this._setEntityName('list');

        this.Error.MESSAGES.ALREADY_EXISTS = 'list already exists';

        this._creationSchema = joi.object().keys({
            name: joi.string().required(),
            title: joi.string().required()
        });

        this._modificationSchema = joi.object().keys({
            name: joi.string(),
            title: joi.string()
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

module.exports = Lists;
