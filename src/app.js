const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { infoLogger, errorLogger } = require('./common/logging');
const { errorHandler } = require('./common/error');
const cors = require('cors');
const helmet = require('helmet');
require('express-async-errors');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use((req, res, next) => {
  infoLogger(req);
  next();
});
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
process.on('uncaughtException', error => {
  errorLogger(`Captured error: ${error.message}`);
});

process.on('unhandledRejection', reason => {
  errorLogger(`Unhandled rejection detected: ${reason.message}`);
});

// uncaughtException
// throw Error('Oops!');

// unhandledRejection
// Promise.reject(Error('Oops!'));
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use(errorHandler);

module.exports = app;
