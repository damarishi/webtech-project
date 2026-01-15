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
        const result = await db.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

exports.create = async (req, res) => {
    try {
        const {email, username, full_name, password, is_admin, is_deleted} = req.body;
        const hashed_password = await bcrypt.hash(req.body.password,12);
        const query = 'INSERT INTO users (email, username, full_name, password, is_admin, is_deleted) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [email, username, full_name, hashed_password, is_admin, is_deleted];

        const result = await db.query(query, values);
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};