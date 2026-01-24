const db = require('../pool')

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
        const result = await db.query('SELECT * FROM discounts');
        
        logger.emit('log', { 
            description: `Discounts have been fetched`, 
            typeOfLog: 1 
        });

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch discounts' });
    }
};

exports.createDiscount = async (req, res) => {
    try {
        const {code, value, active } = req.body;    //active state defaults to true when creating

        const activeState = active !== "" ? active : true;

        const query = 'INSERT INTO discounts (code, value, active) VALUES ($1, $2, $3) RETURNING *';
        const values = [code, value, activeState];

        const result = await db.query(query, values);
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create discount' });
    }
};

exports.editDiscount = async (req, res) => {
    try {
        const discount_id = req.params.id;
        const {code, value, active } = req.body;    

        const activeState = active !== "" ? active : true;

        const query = 'UPDATE discounts SET code = $1, value = $2, active = $3 WHERE discount_id = $4 RETURNING *';
        const values = [code, value, activeState, discount_id];

        const result = await db.query(query, values);
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update discount' });
    }
};

exports.deleteDiscount = async (req, res) => {
    try {
        const discount_id = req.params.id;

        const query = 'DELETE FROM discounts WHERE discount_id = $1 RETURNING *';
        const values = [discount_id];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Discount not found' });
        }
        
        res.status(200).json({ message: 'Discount deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete discount' });
    }
};
