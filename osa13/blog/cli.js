require('dotenv').config();

const { Sequelize } = require('sequelize');
const { Blog } = require('./models/blog');
const { DATABASE_URL } = require('./util/config');

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: false,
  },
});

const toString = (blog) => {
  return `${blog.author}: ${blog.title}, ${blog.likes} likes`;
};

Blog.findAll().then((blogs) =>
  blogs.map((blog) => console.log(toString(blog)))
);
