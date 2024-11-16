const jwt = require('jsonwebtoken');
const secretKey = 'EchoSecretCodeIsHere'; // Same key as in app.js

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user; // Save user info for use in routes
        next();
    });
}

module.exports = verifyToken;
