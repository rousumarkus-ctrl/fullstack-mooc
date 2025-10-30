const express = require('express');
const app = express();

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorRouter = require('./controllers/authors');
const readinglistRouter = require('./controllers/readinglists');

app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readinglistRouter);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.log(error.name);

  if (error.name === 'TypeError') {
    return response.status(400).send({ error: 'typed error' });
  } else if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: 'Database error' });
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
