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



    const getUser = `
        SELECT u.*,
               ARRAY_AGG(r.name) AS roles
        FROM users u
        LEFT JOIN user_roles ur ON ur.user_id = u.user_id
        LEFT JOIN roles r ON r.role_id = ur.role_id
        WHERE u.email = $1 AND u.is_deleted = FALSE
        GROUP BY u.user_id;
        `;

    try{
        try{
            await pool.query("SELECT 1");
        }catch{
            const err = "DB unreachable"
            console.error("S: "+err)
            res.status(503).json({error: err});
        }
        const result = await pool.query(getUser,[email]);
        if(result.rowCount === 0){
            console.error("S: Failed user authentification for \""+email+ "\"");
            res.status(401).send("Authentication failed");
            return;
        }
        const user_data = result.rows[0];
        const ok = await bcrypt.compare(password, user_data.password);
        if(!ok){
            console.error("S: Failed user authentification for \""+email+ "\"");
            res.status(401).send("Authentication failed");
            return;
        }

        console.log("S: \"" + user_data.username +"\" Logged in");

        const payload = {
            email: email,
            is_admin: user_data.is_admin,
            username: user_data.username,
            roles: user_data.roles
        }
        const token = jwt.sign(payload, cfg.auth.jwt_key, { expiresIn: cfg.auth.expiration });

        res.status(200).json({
            "message": "login successful",
            username: user_data.username,
            roles: ["role1", "role2","role3"],
            token: token
        });
    }catch(error){
        console.error("S: Internal error \n", error.message);
        res.status(500).json({message: error.message});
    }
});
router.get('/auth', isAuth, (req, res) => {
    res.status(200).json({message: 'Login Success', user: req.user});
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