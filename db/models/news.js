const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.hasOne(models.Users, {
        foreignKey: 'id',
        as: 'Users',
      });
    }
  }
  News.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    user_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};
