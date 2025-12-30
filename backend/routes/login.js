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