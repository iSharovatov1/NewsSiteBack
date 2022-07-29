const { News, Users } = require('../../db/models');

async function getAllNews(req, res) {
  try {
    const news = await News.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      include: {
        model: Users,
        as: 'user',
        attributes: ['id', 'email'],
      },
    });
    return res.status(200).send(news);
  } catch (error) {
    return res.status(404).send(error);
  }
}

module.exports = { getAllNews };
