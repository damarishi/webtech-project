const pool = require("../pool");
const logger = require('../events/logger.js');

/**
 * Get reviews for a restaurant
 */
exports.getByRestaurant = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const query = {
            text: `SELECT r.review_id, r.rating, r.comment, r.created_at, u.username
                    FROM reviews r
                    JOIN users u ON u.user_id = r.user_id
                    WHERE r.restaurant_id = $1
                    ORDER BY r.created_at DESC
                    `,
            values: [restaurantId]
        }

        const result = await pool.query(query);

        res.json(result.rows);
    } catch (error) {
        console.log('Error while fetching reviews: ' + error.message);
        res.status(500).json({error: 'Error while fetching reviews' + error.message});
    }
}

/**
 * Creaet review
 */
exports.create = async (req, res) => {
    const userId = req.user.user_id;
    const { restaurantId, rating, comment } = req.body;

    try {
        const query = {
            text: `INSERT INTO reviews (user_id, restaurant_id, rating, comment)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *`,
            values: [userId, restaurantId, rating, comment]
        }

        const result = await pool.query(query);
        await updateRestaurantRating(restaurantId);

        logger.emit('log', { 
            description: `Review has been created by UserId: ` + userId + ` RestaurantId: ` + restaurantId,
            typeOfLog: 2 
        });

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error while creating reviews: ' + error.message);
        res.status(500).json({error: 'Error while creating review' + error.message});
    }
}

async function updateRestaurantRating(restaurantId) {
    const query = {
        text: `
            UPDATE restaurant
            SET
                avg_rating = COALESCE((
                    SELECT ROUND(AVG(rating)::numeric, 2)
                    FROM reviews
                    WHERE restaurant_id = $1
                    ), 0),
                review_count = (
                    SELECT COUNT(*)
                    FROM reviews
                    WHERE restaurant_id = $1
                )
            WHERE restaurant_id = $1
        `,
        values: [restaurantId]
    };

    await pool.query(query);
}