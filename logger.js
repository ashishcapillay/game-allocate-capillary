const pino = require('pino');
const logger = pino({
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:dd-mm-yyyy HH:MM:ss'
        }
    }
});
logger.info('Logger Initialized');
module.exports = logger;
