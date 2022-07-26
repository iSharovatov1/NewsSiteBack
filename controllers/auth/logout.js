const { Tokens } = require('../../db/models');

async function logout(req, res) {
  const token = req.headers.authorization.split(' ')[1];
  try {
    await Tokens.destroy({ where: { token } });
    return res.json({ success: true, token });
  } catch (error) {
    return res.json({ success: false, error });
  }
}

module.exports = { logout };
