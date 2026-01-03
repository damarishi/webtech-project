const express = require("express");
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../pool.js');
const cfg = require('../config');

const isAuth = require('./isAuth');


router.post('/', async (req, res) => { //o or router.get?

    const email = req.body.email;
    const password = req.body.password;



    const getUser = `SELECT * FROM users WHERE email=$1 AND is_deleted = false`;

    try{
        try{
            await pool.query("SELECT 1");
        }catch{
            const err = "DB unreachable"
            console.error(err)
            res.status(503).json({error: err});
        }
        const result = await pool.query(getUser,[email]);
        if(result.rowCount === 0){
            res.status(401).send("Authentication failed");
            return;
        }
        const user_data = result.rows[0];
        const ok = await bcrypt.compare(password, user_data.password);
        if(!ok){
            res.status(401).send("Authentication failed");
            return;
        }

        const payload = {
            email: email,
            is_admin: user_data.is_admin,
            username: user_data.username
        }
        const token = jwt.sign(payload, cfg.auth.jwt_key, { expiresIn: cfg.auth.expiration });

        res.status(200).json({
            "message": "login successful",
            username: user_data.username,
            roles: ["role1", "role2","role3"],
            token: token
        });
    }catch(error){
        console.error("Error:", error.message);
        res.status(500).json({message: error.message});
    }
});
router.get('/auth', isAuth, (req, res) => {
    res.status(200).json({message: 'You are logged in!!', user: req.user});
});

module.exports = router;






//just for testing purposes, delete later
//get logEmitter used for sending log events
const logEmitter = require("../src/events/index.js");

router.get("/test", (req, res) => {
    try {
        //...testing logger

        logEmitter.emit('log', {
            description: 'Test log entry from /login/test route',
            typeOfLog: 'TEST'
        });

        res.setHeader('Content-Type', 'text/html');
        res.status(200).send("/login/test site");
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({error: error.message});
    }
});