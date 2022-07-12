const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {
    static associate(models) {
      Tokens.hasOne(models.Users, {
        foreignKey: 'id',
        as: 'user',
      });
    }
  }
  Tokens.init({
    token: DataTypes.STRING,
    userId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tokens',
  });
  return Tokens;
};
