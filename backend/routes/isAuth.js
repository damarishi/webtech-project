const jwt = require('jsonwebtoken');
const cfg = require('../config')

module.exports = function checkAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Missing Authorization header' });
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Invalid Authorization format' });
    }

    try {
        req.user = jwt.verify(token, cfg.auth.jwt_key);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};