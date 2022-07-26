const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Tokens, {
        foreignKey: 'userId',
        as: 'tokens',
      });
      Users.hasMany(models.News, {
        foreignKey: 'userId',
        as: 'news',
      });
    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.prototype.comparePassword = async function (password) {
    const isCompare = await bcrypt.compare(password, this.password);
    return isCompare;
  };
  return Users;
};
