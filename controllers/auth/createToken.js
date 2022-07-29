const jwt = require('jsonwebtoken');

const key = process.env.secretKey;

const createToken = (id) => jwt.sign({ id }, key, { expiresIn: 86400 });

module.exports = { createToken };
