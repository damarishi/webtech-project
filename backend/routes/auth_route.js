const express = require("express");
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../pool.js');
const cfg = require('../config');
const userRole = require("../interfaces/userrole_enum");

const isAuth = require('../services/isAuth');

async function checkDB(){
    try{
        await pool.query("SELECT 1");
    }catch{
        return false;
    }
    return true;
}
const getUserQuery = `
        SELECT u.*,
               ARRAY_AGG(r.name) FILTER (WHERE r.name IS NOT NULL) AS roles
        FROM users u
        LEFT JOIN user_roles ur ON ur.user_id = u.user_id
        LEFT JOIN roles r ON r.role_id = ur.role_id
        WHERE u.email = $1 AND u.is_deleted = FALSE
        GROUP BY u.user_id;
        `;
//TODO: Logging
router.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password,12);
    const username = req.body.username;
    const full_name = req.body.fullName;
    const location = req.body.location;
    const roles = req.body.roles;

    //console.log(location);

    if(!await checkDB()){
        const err = "DB unreachable"
        console.error("S: "+err)
        res.status(503).json({error: err});
    }

    const editExistingUserQuery = `
        UPDATE users SET
        password = $1, username = $2,
        full_name = $3,
        location = $4
        where email = $5;
    `;

    const addUserQuery =`
        INSERT INTO users (email, username, full_name, password, location) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING user_id
    `;

    const addUserRolesQuery = `
    INSERT INTO user_roles(user_id, role_id)
    SELECT $1, unnest($2::int[])
    ON CONFLICT DO NOTHING;
    `;

    try{

        const userCheckResult = await pool.query(getUserQuery,[email]);

        if(userCheckResult.rowCount > 0){
            const user = userCheckResult.rows[0];
            if(!user.is_deleted){
                res.status(409).json({message: 'User already exists'});
                return;
            }
            //User is deleted -> Reactivate Account, keep roles, add roles if requested
            const updatedUserResult = await pool.query(editExistingUserQuery,[email, username, full_name, location, password]);
            if(user.roles.length !== 3){
                const newUserRoles = roles.filter(item => !user.roles.includes(item)).map(name => userRole[name].id);
                await pool.query(addUserRolesQuery,[user.user_id,newUserRoles]);
            }
            res.status(200).json({message: 'Account reactivated successfully'});
            return;
        }
        //Create new user from scratch
        const newUserRoles = roles.map(name => userRole[name].id);
        const createNewUserResult = await pool.query(addUserQuery,[email, username, full_name, password, location]);
        const addUserRolesResult = await pool.query(addUserRolesQuery, [createNewUserResult.rows[0].user_id,newUserRoles]);

        res.status(200).json({message: 'new user created successfully', email});


    }catch(error){
        console.error("S: Internal error \n", error.message);
        res.status(500).json({message: error.message});
    }
})
//TODO: Logging
router.post('/login', async (req, res) => { //o or router.get?

    const email = req.body.email;
    const password = req.body.password;

    try{
        const result = await pool.query(getUserQuery,[email]);
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
            user_id: user_data.user_id,
            email: email,
            is_admin: user_data.is_admin,
            username: user_data.username,
            roles: user_data.roles,
            location: user_data.location,
        }
        console.log(payload);
        const token = jwt.sign(payload, cfg.auth.jwt_key, { expiresIn: cfg.auth.expiration });

        res.status(200).json({
            "message": "login successful",
            username: user_data.username,
            user_id: user_data.email,
            roles: user_data.roles,
            location: user_data.location,
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
const logEmitter = require("../events/logger.js");


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