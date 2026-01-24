const db = require('../pool');

exports.getAll = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM orders');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
};