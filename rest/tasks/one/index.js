module.exports = {

    resource: '/tasks/:id',

    title: 'tasks',

    methods: {
        GET: require('./GET')
    }
};
