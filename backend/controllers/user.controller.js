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
//TODO: maybe delete all/ leonard does it later
exports.getItem = async (req, res) => {
    // To be implemented
};

exports.update = async (req, res) => {
    // To be implemented
    const userId = req.params.id;
    const { email, username, full_name, password, is_admin, is_deleted } = req.body;

    try {

    } catch (error) {   
        res.status(500).json({ error: 'Failed to update user' });
    }
};

exports.markAsDeleted = async (req, res) => {
    const userId = req.params.id;

    try {
        const query = 'UPDATE users SET is_deleted = TRUE WHERE user_id = $1 RETURNING *';
        const values = [userId];

        const result = await db.query(query, values);

        if(result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json( { message: 'User marked as deleted', user: result.rows[0].username });
    } catch (error) {   
        res.status(500).json({ error: 'Failed to mark user as deleted' });
    }

}

exports.delete = async (req, res) => {
    const userId = req.params.id;

    try {
        // This permanently removes the record
        const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
        const values = [userId];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ 
            message: 'User permanently removed from system',
            deletedUser: result.rows[0].username 
        });
    } catch (error) {   
        res.status(500).json({ error: 'Failed to delete user' });
    }

};