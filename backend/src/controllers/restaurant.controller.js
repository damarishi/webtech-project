const db = require('../../pool')

/*
    Returns promise with data depending on query
    TODO: maybe use DTOs here later
*/

/*
    Get all restaurants
*/
exports.getAll = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM restaurants');
        res.status(200).json(result.rows);

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
};