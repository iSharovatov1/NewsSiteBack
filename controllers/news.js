const News = require('../models').News;

module.exports = {
  list(req, res) {
    return News
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((news) => {
        console.log(111);
        res.status(200).send(news)
      })
      .catch((error) => { res.status(400).send(error); console.log(error);});
  },

  getById(req, res) {
    return News
      .findByPk(req.params.id, {
      })
      .then((news) => {
        if (!news) {
          return res.status(404).send({
            message: 'News Not Found',
          });
        }
        return res.status(200).send(news);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  add(req, res) {
    return News
      .create({
        title: req.body.title,
        text: req.body.text,
      })
      .then((news) => res.status(201).send(news))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return News
      .findByPk(req.params.id, {
      })
      .then(news => {
        if (!news) {
          return res.status(404).send({
            message: 'News Not Found',
          });
        }
        return News
          .update({
            title: req.body.title,
            text: req.body.text,
          })
          .then(() => res.status(200).send(news))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return News
      .findByPk(req.params.id)
      .then(news => {
        if (!news) {
          return res.status(400).send({
            message: 'News Not Found',
          });
        }
        return News
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};