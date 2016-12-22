var joi = require('joi');
var _ = require('lodash');

var helpers = require('maf/Rest/helpers');

module.exports = {

    resource: '/lists',

    title: 'lists',

    methods: {

        GET: {
            title: 'lists',

            schema: {
                query: {
                    limit: joi.number().default(10).min(0).max(100),
                    offset: joi.number().default(0).min(0).max(100),
                    fields: helpers.fields.schema
                }
            },

            callback: function (req, res) {
                var lists = req.di.api.lists;

                var filters = {};
                var fields = helpers.fields.get(req.query, 'fields');

                if (typeof req.query.active !== 'undefined') {
                    filters.active = req.query.active;
                }

                lists.find(filters, fields).exec()
                    .then((result) => {
                        res.result(helpers.findResult(result, req.query, lists));
                    })
                    .catch((error) => {
                        if (!error.checkable) {
                            return res.logServerError(error);
                        }

                        error.checkChain(res.logServerError)
                            .check();
                    });
            }
        },

        POST: {
            title: 'create new list',

            schema: {
                body: null
            },

            prehook: function (method, di) {
                method.schema.body = di.api.lists.getCreationSchema();
            },

            callback: function (req, res) {
                var lists = req.di.api.lists;

                lists.create(req.body)
                    .then((doc) => {
                        res.result(lists.clearSystemFields(doc));
                    })
                    .catch((error) => {

                        if (!error.checkable) {
                            return res.logServerError(error);
                        }

                        error.getCheckChain(res.logServerError)
                            .ifEntity(lists.entity)
                            .ifCode(lists.Error.CODES.ALREADY_EXISTS, res.badRequest)
                            .end()
                            .check();


                    });
            }
        }

    }
};
