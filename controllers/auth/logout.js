const { Tokens } = require('../../db/models');

async function logout(req, res) {
  const { cookies: { refreshToken } } = req;
  try {
    res.clearCookie('refreshToken');
    await Tokens.destroy({ where: { token: refreshToken } });
    return res.status(200).json({ success: true, refreshToken });
  } catch (error) {
    return res.json({ success: false, error });
  }
}

module.exports = { logout };
