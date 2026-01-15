//Setup
/*
get logger instance
get db connection
*/
const eventEmitter = require('events');

const logger = new eventEmitter();
const db = require('../pool');

//log event listener
/*
listen for 'log' events
on receiving a log event, process the data
extract description, timestamp, typeOfLog from data
insert log entry into the database
*/
logger.on('log', async (data) => {
    console.log('Log event received');

    const {description, typeOfLog } = data;
    try {

        await db.query(
            'INSERT INTO logs (description, typeOfLog) VALUES ($1, $2)',
            [description, typeOfLog]
        );

    } catch (error) {
        console.error('Error logging event:', error);   
    }
});

module.exports = logger;