'use strict';

var joi = require('maf/vendors/joi');

var Abstract = require('maf/Api/Abstract');

class Lists extends Abstract {

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

}

module.exports = Lists;
