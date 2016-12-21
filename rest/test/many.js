var joi = require('joi');
var _ = require('lodash');

var helpers = require('maf/Rest/helpers');

module.exports = {

    resource: '/test',

    title: 'test',

    methods: {

        GET: {
            title: 'test',

            schema: {
                query: {
                    limit: joi.number().default(10).min(0).max(100),
                    offset: joi.number().default(0).min(0).max(100),
                    fields: helpers.fields.schema
                }
            },

            callback: function (req, res) {
                var logger = req.di.logger;
                var api = req.di.api;

                var filters = {};
                var fields = helpers.fields.get(req.query, 'fields');

                if (typeof req.query.active !== 'undefined') {
                    filters.active = req.query.active;
                }

                api.test.find(filters, fields)
                    .then((result) => {

                        var metadata = {
                            resultset: {
                                count: result.docs.length,
                                total: result.total,
                                limit: req.query.limit,
                                offset: req.query.offset
                            }
                        };

                        res.result(result.docs, metadata);
                    })
                    .catch((error) => {
                        if (!error.checkable) {
                            return res.logServerError(error);
                        }

                        error.checkChain(res.logServerError)
                            .check();
                    });
            }
        }

    }
};
