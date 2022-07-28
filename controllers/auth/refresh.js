const jwt = require('jsonwebtoken');

const { Tokens } = require('../../db/models');

const key = process.env.secretKey;

async function refresh(req, res) {
  const { cookies: { refreshToken } } = req;
  const oldToken = req.headers.authorization.split(' ')[1];
  const userId = jwt.decode(oldToken).id;
  try {
    const token = await Tokens.findOne({ where: { token: refreshToken } });
    if (token) {
      const newToken = jwt.sign({ id: userId }, key, { expiresIn: 86400 });
      return res.status(200).json({ success: true, token: newToken });
    }
    return res.status(401).json({ success: false });
  } catch (error) {
    return res.json({ success: false, error });
  }
}

module.exports = { refresh };
