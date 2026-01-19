const db = require('../pool')

/*
    Returns promise with data depending on query
    TODO: maybe use DTOs here later
*/

/*
    Get all requests
*/
exports.getAll = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM restaurant_requests');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
};

/*
    Creates new request
*/
exports.createRequest = async (req, res) => {
    const { restaurant_name, requested_by, admin_notes } = req.body;

    try {
        const query = 'INSERT INTO restaurant_requests (restaurant_name, requested_by, status_id, admin_notes) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [restaurant_name, requested_by, '1', admin_notes];   //default status_id '1' for 'pending'
        const result = await db.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create request' });
    }
};

exports.updateRequest = async (req, res) => {
    const requestId = req.params.id;
    const { restaurant_name, requested_by, status_id, admin_notes } = req.body;

    try {
        const query = 
        'UPDATE restaurant_requests SET restaurant_name = $1, requested_by = $2, status_id = $3, admin_notes = $4 WHERE id = $5 RETURNING *';
        const values = [restaurant_name, requested_by, status_id, admin_notes, requestId];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update request' });
    }
};


exports.approveRequest = async (req, res) => {
    
    const requestId = req.params.id;
    const { restaurant_name, requested_by, status_id, admin_notes } = req.body;
        //status_id not used, set to '2' for approved
    try {
        
        const query = 
        'UPDATE restaurant_requests SET restaurant_name = $1, requested_by = $2, status_id = $3, admin_notes = $4 WHERE request_id = $5 RETURNING *';
        const values = [restaurant_name, requested_by, 2, admin_notes, requestId];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update request' });
    }
};

exports.rejectRequest = async (req, res) => {
    
    const requestId = req.params.id;
    const { restaurant_name, requested_by, status_id, admin_notes } = req.body;
        //status_id not used, set to '3' for rejected
    try {
        
        const query = 
        'UPDATE restaurant_requests SET restaurant_name = $1, requested_by = $2, status_id = $3, admin_notes = $4 WHERE request_id = $5 RETURNING *';
        const values = [restaurant_name, requested_by, 3, admin_notes, requestId];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update request' });
    }
};

