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
            text: 'SELECT * FROM restaurant WHERE restaurant_id = $1',
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
