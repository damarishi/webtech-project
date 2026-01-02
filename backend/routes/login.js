const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../pool.js');


router.post('/', async (req, res) => { //o or router.get?

    const email = req.body.email;
    const password = req.body.password;

    const getUser = `SELECT * FROM users WHERE email=$1`;

    try{
        const result = await pool.query(getUser,[email]);
        if(result.length === 0){
            res.status(401).send("Authentication failed");
            return;
        }
        const user_data = result.rows[0];
        const ok = await bcrypt.compare(password, user_data.password);
        if(!ok){
            res.status(401).send("Authentication failed");
            return;
        }
        const secret = "secret";

        const payload = {
            email: email,
            is_Admin: user_data.is_Admin
        }
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        res.status(200).json({
            "message": "login successful",
            username: user_data.username,
            token: token
        });
    }catch(error){
        console.error("Error:", error.message);
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
