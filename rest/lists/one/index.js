module.exports = {

    resource: '/lists/:name',

    title: 'lists',

    methods: {

        GET: require('./GET')
    }
};
