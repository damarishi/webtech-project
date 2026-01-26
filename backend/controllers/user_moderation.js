const db = require('../pool');
const logger = require('../events/logger.js');

/*
    Returns promise with data depending on query
    TODO: maybe use DTOs here later
*/

/*
    Get all users
*/
exports.getAll = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT user_id, username, times_warned, banned_until ' +
            'FROM users ' +
            'WHERE is_deleted = FALSE'
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

exports.warnUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const query = 
            `UPDATE users 
            SET times_warned = times_warned + 1 
            WHERE user_id = $1 AND is_deleted = FALSE
            RETURNING user_id, username, times_warned, banned_until`;
        const values = [userId];
        const result = await db.query(query, values);

        logger.emit('log', { 
            description: `User has been warned: ` + userId, 
            typeOfLog: 3 
        });

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to warn users' });
    }
};

exports.suspendUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const suspendTime = req.body.weeks;

        const query = 
            `UPDATE users 
            SET banned_until = NOW() + ($1 * INTERVAL '1 week')
            WHERE user_id = $2 AND is_deleted = FALSE
            RETURNING user_id, username, times_warned, banned_until`;
        const values = [suspendTime, userId];

        logger.emit('log', { 
            description: `User has been suspended: ` + userId + ` for` + suspendTime + ` weeks`, 
            typeOfLog: 3 
        });
        
        const result = await db.query(query, values);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to suspend users' });
    }
};