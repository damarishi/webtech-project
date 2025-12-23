const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    try {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send("Login site");
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({error: error.message});
    }
});

module.exports = router;