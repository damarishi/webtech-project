const db = require('../pool')
const pool = require("../pool");
const results = require("pg/lib/query");
const { calculateDistance, estimateTime } = require('../services/distanceService');
const position = require('../interfaces/Positon');
const logger = require('../events/logger.js');


/*
    Get all restaurants
 */
exports.getAll = async (req, res) => {
    try {
        const query = {
            text: 'SELECT * FROM restaurant',
            values: []
        };

        const results = await pool.query(query);

        if (results.rows.length <= 0) {
            return res.status(404).json({ error: "No restaurant found." });
        }

        res.status(200).json(results.rows);
    } catch (error) {
        console.error("Error while fetching restaurants: ", error.message);
        res.status(500).json({ error: "Error while fetching restaurants:" + error.message });
    }
};

exports.createRestaurant = async (req, res) => {
    try {
        const { restaurant_name, owner_id, location } = req.body;
        const queryText = `
            INSERT INTO restaurant (restaurant_name, owner_id, location)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const formattedLocation = location.startsWith('(') ? location : `(${location})`;
        const values = [restaurant_name, owner_id, formattedLocation];

        const result = await db.query(queryText, values);

        logger.emit('log', {
            description: `Restaurant has been created: ` + restaurant_name,
            typeOfLog: 3
        });


        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error while creating restaurants: ", error.message);
        res.status(500).json({ error: "Error while creating restaurants:" + error.message });
    }
}

exports.editRestaurant = async (req, res) => {
    try {
        const restaurant_id = req.params.id;
        const { restaurant_name, owner_id, location } = req.body;
        const formattedLocation = location.startsWith('(') ? location : `(${location})`;

        const query = `
            UPDATE restaurant 
            SET restaurant_name = $1, 
                owner_id = $2, 
                location = $3
            WHERE restaurant_id = $4
            RETURNING *;
        `;

        const values = [restaurant_name, owner_id, formattedLocation, restaurant_id];

        const result = await db.query(query, values);

        logger.emit('log', {
            description: `Restaurant has been edited: ` + restaurant_id,
            typeOfLog: 3
        });

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error while editing restaurants: ", error.message);
        res.status(500).json({ error: "Error while editing restaurants:" + error.message });
    }
}

exports.deleteRestaurant = async (req, res) => {
    try{
        const restaurant_id = req.params.id;

        const query = 'DELETE FROM restaurant WHERE restaurant_id = $1 RETURNING *'
        const values = [restaurant_id];
        const result = await db.query(query, values);

        logger.emit('log', {
            description: `Restaurant has been deleted: ` + restaurant_id,
            typeOfLog: 3
        });

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
}

exports.getRestaurantsWithDistance = async (req, res) => {
    try {
        const sortBy = req.query.sortBy;
        const sortDirection = req.query.sortDirection === 'asc' ? 'asc' : 'desc';

        const maxMinutes = Number(req.query.maxMinutes) || 999;
        const speed = 0.5;
        const prepTime = 10;

        const queryUser = {
            text: 'SELECT location FROM users WHERE user_id = $1',
            values: [req.user.user_id]
        };

        const userResult = await pool.query(queryUser);
        const userPoint = parsePoint(userResult.rows[0]?.location);
        if (!userPoint) return res.status(400).json({ error: "User location missing" });

        const queryRestaurant = {
            text: 'SELECT restaurant_id, restaurant_name, location, avg_rating, review_count  FROM restaurant'
        };

        const restaurantResult = await pool.query(queryRestaurant);

        const enriched = restaurantResult.rows.map(r => {
            const restaurantPoint = parsePoint(r.location);
            const distance = calculateDistance(userPoint, restaurantPoint);
            const estimatedDeliveryTime = estimateTime(distance, speed, prepTime);

            return {
                ...r,
                distance,
                estimatedDeliveryTime
            };
        });

        const filtered = enriched.filter(
            r => r.estimatedDeliveryTime <= maxMinutes
        );

        if (sortBy === 'rating') {
            filtered.sort((a, b) => {
                if (sortDirection === 'asc') {
                    return a.avg_rating - b.avg_rating;
                }
                return b.avg_rating - a.avg_rating;
            });
        }

        console.log(filtered);

        res.json(filtered);
    } catch (error) {
        console.error("Error while calculating distances:", error.message);
        res.status(500).json({ error: "Error while calculating distances: " + error.message });
    }
};

exports.getItem = async (req, res) => {
    const id = req.params.id;

    try {
        const query = {
            text: 'SELECT restaurant_id, restaurant_name, location, owner_id FROM restaurant WHERE restaurant_id = $1',
            values: [id]
        };
        
        const result = await pool.query(query);
        
        if (result.rows.length <= 0) {
            return res.status(404).json({ error: "No restaurant found." });
        }
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error while fetching restaurant:" + error.message);
        res.status(500).json({ error: "Error while fetching restaurant:" + error.message });
    }
}

exports.getMenu = async (req, res) => {
    const id = req.params.id;

    try {
        const query = `
            SELECT c.category_id,
                   c.name                                AS category_name,
                   i.item_id,
                   i.name                                AS item_name,
                   i.price,
                   i.position,
                   ARRAY_REMOVE(ARRAY_AGG(t.name), NULL) AS tags
            FROM categories c
                     JOIN items i ON i.category_id = c.category_id
                     LEFT JOIN item_tags it ON it.item_id = i.item_id
                     LEFT JOIN tags t ON t.tag_id = it.tag_id
            WHERE i.restaurant_id = $1
            GROUP BY c.category_id, i.item_id
            ORDER BY c.category_id, i.position
        `;

        const {rows} = await pool.query(query, [id]);

        if (rows.length <= 0) {
            return res.status(404).json({error: "No menu found."});
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error while fetching menu:" + error.message);
        res.status(500).json({error: "Error while fetching menu:" + error.message});
    }
}

function parsePoint(point) {
    if (!point) return null;

    return { x: point.x, y: point.y };
}


