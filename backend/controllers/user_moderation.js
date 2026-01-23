const db = require('../pool')

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
            'SELECT username, times_warned, banned_until ' +
            'FROM users ' +
            'WHERE is_deleted = FALSE'
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};