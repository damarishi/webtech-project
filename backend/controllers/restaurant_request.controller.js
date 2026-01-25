const db = require('../pool')
const logger = require('../events/logger.js');
const restaurantController = require('./restaurant.controller.js');

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
    const { restaurant_name, requested_by, admin_notes, location } = req.body;

    try {
        const query = 'INSERT INTO restaurant_requests (restaurant_name, requested_by, status_id, admin_notes, location) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const formattedLocation = location.startsWith('(') ? location : `(${location})`;
        const values = [restaurant_name, requested_by, '1', admin_notes, formattedLocation];   //default status_id '1' for 'pending'
        const result = await db.query(query, values);

        logger.emit('log', { 
            description: `Restaurant Request has been created from User ID: ` + requested_by, 
            typeOfLog: 2 
        });

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create request' + error });
    }
};

exports.updateRequest = async (req, res) => {
    const requestId = req.params.id;
    const { restaurant_name, requested_by, status_id, admin_notes, location } = req.body;

    try {
        const query = 
        'UPDATE restaurant_requests SET restaurant_name = $1, requested_by = $2, status_id = $3, admin_notes = $4, location = $5 WHERE id = $6 RETURNING *';
        const formattedLocation = location.startsWith('(') ? location : `(${location})`;
        const values = [restaurant_name, requested_by, status_id, admin_notes, formattedLocation, requestId];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }

        logger.emit('log', { 
            description: `Restaurant Request has been edited: ` + requestId, 
            typeOfLog: 3 
        });

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update request' });
    }
};


exports.approveRequest = async (req, res) => {
    
    const requestId = req.params.id;
    const { restaurant_name, requested_by, status_id, admin_notes, location } = req.body;
        //status_id not used, set to '2' for approved
    try {
        
        const query = 
        'UPDATE restaurant_requests SET restaurant_name = $1, requested_by = $2, status_id = $3, admin_notes = $4, location = $5 WHERE request_id = $6 RETURNING *';
        const formattedLocation = location.startsWith('(') ? location : `(${location})`;
        const values = [restaurant_name, requested_by, 2, admin_notes, formattedLocation, requestId];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }

        logger.emit('log', { 
            description: `Restaurant Request has been approved: ` + requestId, 
            typeOfLog: 3 
        });

        const createRestaurantQuery = `
            INSERT INTO restaurant (restaurant_name, owner_id, location)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        
        const restaurantValues = [restaurant_name, requested_by, formattedLocation];
        const newRestaurant = await db.query(createRestaurantQuery, restaurantValues);


        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update request' });
    }
};

exports.rejectRequest = async (req, res) => {
    
    const requestId = req.params.id;
    const { restaurant_name, requested_by, status_id, admin_notes, location } = req.body;
        //status_id not used, set to '3' for rejected
    try {
        
        const query = 
        'UPDATE restaurant_requests SET restaurant_name = $1, requested_by = $2, status_id = $3, admin_notes = $4, location = $5 WHERE request_id = $6 RETURNING *';
        const formattedLocation = location.startsWith('(') ? location : `(${location})`;
        const values = [restaurant_name, requested_by, 3, admin_notes, formattedLocation, requestId];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }

        logger.emit('log', { 
            description: `Restaurant Request has been rejected: ` + requestId, 
            typeOfLog: 3 
        });


        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update request' });
    }
};

