const db = require('../../pool')

/*
    Returns promise with data depending on query
    TODO: maybe use DTOs here later
*/

/*
    Get all users
*/
exports.getAll = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.status(200).json(result.rows);

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};