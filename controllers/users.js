const express = require('express');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token')
const passport = require('passport');
const Users = require('../models').Users;
const Tokens = require('../models').Tokens;

module.exports = {
  async signup(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    if (!req.body.username || !req.body.password) {
      res.status(400).send({msg: 'Please pass username and password.'})
    } else {
      try {
        const oldUser = await Users.findAll({ where: { username: req.body.username } })
        if (!!oldUser.length) res.status(409).send('user already exists')

        const user = await Users.create({
          username: req.body.username,
          password: req.body.password,
        })
        const token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
        const refresh = randtoken.uid(255);

        await Tokens.create({
          user_id: user.id,
          token: refresh
        })

        return res.status(201).cookie('token', refresh).send({ token })
      } catch (error) {
        return res.status(400).send(error);
      }
    }
  },

  async signin(req, res) {
    try {
      const user = await Users.findOne({
        where: {
          username: req.body.username
        }
      })

      res.header("Access-Control-Allow-Origin", "*");
      if (!user) {
        return res.status(401).send({
          message: 'Authentication failed. User not found.',
        });
      }

      user.comparePassword(req.body.password, async (err, isMatch) => {
        if(isMatch && !err) {
          const token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
          const refresh = randtoken.uid(255)

          await Tokens.create({
            user_id: user.id,
            token: refresh
          })

          const tokens = await Tokens.findAll({
            order: [
              ['createdAt', 'DESC'],
            ],
            where: {
              user_id: user.id
            }
          })

          tokens.forEach(async item => {
            if (new Date() - item.createdAt > 0.1 * 60 * 60 * 1000) {
              await Tokens.destroy({
                where: {
                  id: item.id
                }
              })

            } 
          })
          res.cookie('refresh_token', refresh, {
            secure: false,
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          })
          return res.json({success: true, token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

}
