
//create Event Emitter for logging events
/*import the events module
create an instance of the Event Emitter
export the LogEventEmitter instance (singleton)
*/
const eventEmitter = require('events');
const LogEventEmitter = new eventEmitter();
module.exports = LogEventEmitter;