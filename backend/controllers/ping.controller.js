const db = require('../pool')

exports.ping = async (req, res) => {
    try {
        res.status(200).json({message: 'ping', timestamp: new Date() });
    } catch (error) {
        res.status(500).json({ error: 'Failed to ping' });
    }
};
