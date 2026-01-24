const db = require('../pool');

exports.getAll = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM logs');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
};

exports.createLog = async (req, res) => {
    try{
        const { description, typeoflog } = req.body;

        const query = 'INSERT INTO logs (description, typeoflog) VALUES ($1, $2) RETURNING *'
        const values = [description, typeoflog];
        const result = await db.query(query, values);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
}

exports.updateLog = async (req, res) => {
    try{
        const logId = req.params.id;
        const { description, typeoflog } = req.body;

        const query = 'UPDATE logs SET description = $1, typeoflog = $2 WHERE id = $3 RETURNING *'
        const values = [description, typeoflog, logId];
        const result = await db.query(query, values);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
}

exports.deleteLog = async (req, res) => {
    try{
        const logId = req.params.id;

        const query = 'DELETE FROM logs WHERE id = $1 RETURNING *'
        const values = [logId];
        const result = await db.query(query, values);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
}