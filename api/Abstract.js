'use strict';

var _ = require('lodash');
var uuid = require('uuid');
var moment = require('moment');

var Abstract = require('maf/Api/Abstract');

var terror = require('terror');

var ApiError = terror.create('ApiError');

class ApiAbstract extends Abstract {

    /**
     * @constructor
     * @param  {Object} models
     * @param  {Object} api
     */
    constructor (models, api) {
        super(models, api);
    }

    getCreationSchema () {
        return _.cloneDeep(this._creationSchema);
    }

    getModificationSchema () {
        return _.cloneDeep(this._modificationSchema);
    }

    _generateUuid () {
        return uuid.v4();
    }

    _time () {
        return moment().unix();
    }

    _validateCreation (data, options) {
        return this._validate(data, this._creationSchema, options);
    }

    _validateModification (data, options) {
        return this._validate(data, this._modificationSchema, options);
    }

    _isEmptyObject (object) {
        if (!object || (typeof object === 'object' && Object.keys(object).length === 0)) {
            return true;
        }

        return false;
    }

    /**
      * prepare fields
      *
      * @param  {Object} fields
      * @return {Object}
      */
    _prepareFields (fields) {
        var result = {};

        _.each(fields, (f) => {
            result[f] = 1;
        });

        return result;
    }

     /**
      * return Error object
      *
      * @param {String} code
      * @return {Error}
      */
    Error (code) {
        return ApiError.createError(code);
    }

}

module.exports = ApiAbstract;
