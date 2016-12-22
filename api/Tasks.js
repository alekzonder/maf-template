'use strict';

var joi = require('maf/vendors/joi');

var CrudAbstract = require('maf/Api/CrudAbstract');

class Tasks extends CrudAbstract {

    constructor (models, api) {
        super(models, api);

        this._modelName = 'tasks';

        this._setEntityName('task');

        this.Error.MESSAGES.ALREADY_EXISTS = 'task already exists';

        this._creationSchema = joi.object().keys({
            name: joi.string().required(),
            title: joi.string().required(),
            done: joi.boolean().default(false)
        });

        this._modificationSchema = joi.object().keys({
            name: joi.string().required(),
            title: joi.string(),
            done: joi.boolean()
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

module.exports = Tasks;
