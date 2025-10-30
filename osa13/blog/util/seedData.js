const { User, Blog } = require('../models');

const blogs = [
  { author: 'Author1', url: 'URL1', title: 'Title1', likes: 1, userId: 1 },
  { author: 'Author2', url: 'URL2', title: 'Title2', likes: 2, userId: 1 },
  { author: 'Author2', url: 'URL3', title: 'Title3', likes: 2, userId: 1 },
  { author: 'Author2', url: 'URL4', title: 'Title4', likes: 2, userId: 1 },
  { author: 'Author2', url: 'URL5', title: 'Title5', userId: 2 },
];

const users = [
  { username: 'foo@bar.com', name: 'foo' },
  { username: 'test@test.com', name: 'test' },
];

users.map((user) => {
  User.create(user);
});
blogs.map((blog) => {
  Blog.create(blog);
});
