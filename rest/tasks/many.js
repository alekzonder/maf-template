var joi = require('joi');
var _ = require('lodash');

var helpers = require('maf/Rest/helpers');

module.exports = {

    resource: '/tasks',

    title: 'tasks',

    methods: {

        GET: {
            title: 'tasks',

            schema: {
                query: {
                    limit: joi.number().default(10).min(0).max(100),
                    offset: joi.number().default(0).min(0).max(100),
                    fields: helpers.fields.schema
                }
            },

            callback: function (req, res) {
                var tasks = req.di.api.tasks;

                var filters = {};
                var fields = helpers.fields.get(req.query, 'fields');

                if (typeof req.query.active !== 'undefined') {
                    filters.active = req.query.active;
                }

                tasks.find(filters, fields).exec()
                    .then((result) => {
                        res.result(helpers.findResult(result, req.query, tasks));
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
            title: 'create new task',

            schema: {
                body: null
            },

            prehook: function (method, di) {
                method.schema.body = di.api.tasks.getCreationSchema();
            },

            callback: function (req, res) {
                var tasks = req.di.api.tasks;

                tasks.create(req.body)
                    .then((doc) => {
                        res.result(tasks.clearSystemFields(doc));
                    })
                    .catch((error) => {

                        if (!error.checkable) {
                            return res.logServerError(error);
                        }

                        error.getCheckChain(res.logServerError)
                            .ifEntity(tasks.entity)
                            .ifCode(tasks.Error.CODES.ALREADY_EXISTS, res.badRequest)
                            .end()
                            .check();


                    });
            }
        }

    }
};
