const Blog = require('./blog');
const Readinglist = require('./readinglist');
const Session = require('./session');
const User = require('./user');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' });
Blog.belongsToMany(User, { through: Readinglist, as: 'users_marked' });

//User.hasMany(Readinglist);
//Blog.hasMany(Readinglist);

//Blog.sync({ alter: true });
//User.sync({ alter: true });

module.exports = {
  Blog,
  User,
  Readinglist,
  Session,
};
