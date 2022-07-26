const { News } = require('../../db/models');

async function getAllNews(req, res) {
  try {
    const news = await News.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      include: 'user',
    });
    return res.status(200).send(news);
  } catch (error) {
    return res.status(404).send(error);
  }
}

module.exports = { getAllNews };
