var joi = require('joi');
var _ = require('lodash');

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
                    fields: joi.alternatives().try(joi.array().items(joi.string()), joi.string()).default(null)
                }
            },

            callback: function (req, res) {
                var logger = req.di.logger;
                var api = req.di.api;

                var filters = {},
                    fields = null;

                // if (typeof req.query.fields === 'string') {
                //     fields = _.map(req.query.fields.split(','), v => _.trim(v));
                // } else if (Array.isArray(req.query.fields)) {
                //     fields = req.query.fields;
                // }

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
                        var ec = {
                            checks: api.test.ErrorCodes
                        };

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
