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
        const result = await db.query('SELECT * FROM platform_settings');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
};

exports.create = async (req, res) => {
    try {
        const { 
            setting_name, 
            flat_fee, 
            percent_cut, 
            estimated_delivery_speed, 
            max_delivery_distance, 
            is_active 
        } = req.body;

        const query = 
            'INSERT INTO platform_settings ' +
            '(setting_name, flat_fee, percent_cut, estimated_delivery_speed, max_delivery_distance, is_active) ' +
            'VALUES ($1, $2, $3, $4, $5, $6) ' +
            'RETURNING *';

       const values = [
            setting_name, 
            flat_fee || 0.00, 
            percent_cut || 0.00, 
            estimated_delivery_speed || 30, 
            max_delivery_distance || 10, 
            is_active === "true" ? true : false
        ];
        const result = await db.query(query, values);

        logger.emit('log', { 
            description: `New Platform Setting has been created: ` + setting_name, 
            typeOfLog: 3 
        });
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create settings' });
    }
};

exports.update = async (req, res) => {
    try {
            const { id } = req.params; 
        const { 
            setting_name, 
            flat_fee, 
            percent_cut, 
            estimated_delivery_speed, 
            max_delivery_distance, 
            is_active 
        } = req.body;
        
        const query = `
            UPDATE platform_settings 
            SET 
                setting_name = $1, 
                flat_fee = $2, 
                percent_cut = $3, 
                estimated_delivery_speed = $4, 
                max_delivery_distance = $5, 
                is_active = $6, 
                updated_at = NOW() 
            WHERE id = $7 
            RETURNING *;
        `;

        const values = [
            setting_name, 
            flat_fee, 
            percent_cut, 
            estimated_delivery_speed, 
            max_delivery_distance, 
            is_active, 
            id
        ];

        const result = await db.query(query, values);

        logger.emit('log', { 
            description: `Platform Settings have been edited: ` + id, 
            typeOfLog: 3 
        });

        res.status(200).json(result.rows[0]);
    } catch (error) {   
        res.status(500).json({ error: 'Failed to update settings' });
    }
};

exports.delete = async (req, res) => {
  

    try {
        const { id } = req.params;
        const query = 'DELETE FROM platform_settings WHERE id = $1 RETURNING *';
        const values = [id];
        
        const result = await db.query(query, values);

        logger.emit('log', { 
            description: `Platform Settings have been edited: ` + id, 
            typeOfLog: 3 
        });

        res.status(200).json(result.rows[0]);
    } catch (error) {   
        console.error("DELETE ERROR:", error);
        res.status(500).json({ error: 'Failed to delete setting' });
    }
};