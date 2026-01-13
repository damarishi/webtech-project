const express = require("express");
const router = express.Router();
const pool = require('../pool');
const cfg = require('../config');

router.get('/', async (req, res) => {
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
});

module.exports = router;