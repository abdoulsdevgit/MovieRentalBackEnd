const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied. No token provided');

    try{
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch(err) {
        res.status(400).send('Bad request. Invalid Token');
    }
}

module.exports.auth = auth;