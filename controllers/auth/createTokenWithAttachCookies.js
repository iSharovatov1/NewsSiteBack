const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

const { Tokens } = require('../../db/models');

const key = process.env.secretKey;

const createTokenWithAttachCookies = async (id, res) => {
  if (typeof id !== 'number') {
    console.error(new Error('id isn`t number'));
    throw new Error('id isn`t number');
  }
  if (!res) {
    console.error(new Error('Response is required'));
    throw new Error('Response is required');
  }
  const refresh = randtoken.uid(255);
  await Tokens.create({
    userId: id,
    token: refresh,
  });
  res.cookie('refreshToken', refresh, {
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  return jwt.sign({ id }, key, { expiresIn: 86400 });
};

module.exports = { createTokenWithAttachCookies };
