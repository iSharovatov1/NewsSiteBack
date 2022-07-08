const jwt = require('jsonwebtoken');
require('dotenv').config();

const { News } = require('../db/models');

const key = process.env.secretKey;

async function getAllNews(req, res) {
  try {
    const news = await News.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
    });
    return res.status(200).send(news);
  } catch (error) {
    return res.status(404).send(error);
  }
}
async function createNews(req, res) {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(409).send('Empty fields are not allowed');
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, key);
    const news = await News
      .create({
        title,
        text,
        user_id: +user.id,
      });
    return res.status(201).send(news);
  } catch (error) {
    return res.status(400).send(error);
  }
}
async function updateNews(req, res) {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(409).send('Empty fields are not allowed');
  }
  try {
    const news = await News.findByPk(req.params.id, {});
    if (!news) {
      return res.status(404).send({
        message: 'News Not Found',
      });
    }
    try {
      const updatedNews = await News.update({
        title,
        text,
      });
      return res.status(200).send(updatedNews);
    } catch (error) {
      return res.status(400).send(error);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
}
async function deleteNews(req, res) {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(400).send({
        message: 'News Not Found',
      });
    }
    try {
      await News.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(400).send(error);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
};
