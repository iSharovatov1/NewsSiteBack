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
  Users.prototype.comparePassword = function (password) {
    if (password) {
      return bcrypt.compareSync(password, this.password);
    }
    console.error(new Error('Password is required'));
    throw new Error('Password is required');
  };
  Users.addHook(
    'beforeCreate',
    (user) => {
      if (!user.password) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      }
    },
  );
  return Users;
};
