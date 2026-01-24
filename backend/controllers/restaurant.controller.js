const db = require('../pool')
const pool = require("../pool");
const results = require("pg/lib/query");

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
            SELECT
                c.category_id,
                c.name AS category_name,
                i.item_id,
                i.name AS item_name,
                i.price,
                i.position,
                ARRAY_REMOVE(ARRAY_AGG(t.name), NULL) AS tags
            FROM categories c
            JOIN items i ON i.category_id = c.category_id
            LEFT JOIN item_tags dt ON dt.item_id = i.item_id
            LEFT JOIN tags t ON t.tag_id = dt.tag_id
            WHERE i.restaurant_id = $1
            GROUP BY c.category_id, i.item_id 
            ORDER BY c.category_id, i.position
            `;

        const { rows } = await pool.query(query, [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ error: "No menu found." });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error while fetching menu:" + error.message);
        res.status(500).json({ error: "Error while fetching menu:" + error.message });
    }
}
