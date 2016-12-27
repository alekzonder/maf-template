var logger = require('maf/Service/Logger')('maf-template-cli');

var initCli = require('maf/Service/Init/Cli');

var init = {
    config: require('./init/config'),
    di: require('./init/di')
};

initCli(logger, init)
    .then(() => {
        logger.debug('repl started');
    })
    .catch((error) => {
        logger.error(error);
        process.exit(1);
    });
