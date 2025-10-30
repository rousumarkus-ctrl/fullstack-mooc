const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Blog extends Model {}

const current = new Date().getFullYear();

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: 1991, msg: `Year must be between 1991 and ${current}` },
        max: { args: current, msg: `Year must be between 1991 and ${current}` },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog',
  }
);

module.exports = Blog;
