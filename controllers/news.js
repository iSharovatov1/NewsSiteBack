const News = require('../models').News;

module.exports = {
  async getAllNews(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const news = await News.findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      return res.status(200).send(news)
    } catch (error) {
      return res.status(400).send(error)
    }
  },

  async getNewsById(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const news = await News.findByPk(req.params.id, {})
      if (!news) {
        return res.status(404).send({
          message: 'News Not Found',
        });
      }
      return res.status(200).send(news);
    } catch (error) {
      return res.status(400).send(error)
    }
  },

  async createNews(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    try {
    const news = await News
      .create({
        title: req.body.title,
        text: req.body.text,
      })
      return res.status(201).send(news)
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  async updateNews(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const news = await News.findByPk(req.params.id, {})
      if (!news) {
        return res.status(404).send({
          message: 'News Not Found',
        });
      }
      try {
        const updateNews = await News.update({
          title: req.body.title,
          text: req.body.text,
        })
        return res.status(200).send(updateNews)
    } catch(error) {
      return res.status(400).send(error)
    }} catch(error) {
      return res.status(400).send(error)
    };
  },

  async deleteNews(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    try {
    const news = await News.findByPk(req.params.id)
    if (!news) {
      return res.status(400).send({
        message: 'News Not Found',
      });
    }
    try {
      await News.destroy()
      res.status(204).send()
      } catch(error) {
        return res.status(400).send(error)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  },
};
