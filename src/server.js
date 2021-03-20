const express = require('express');
const http = require('http');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const config = require('./config.js');
const cors = require('cors');
const authRouter = require('./resources/auth/auth.router');
const pinsRouter = require('./resources/pins/pins.router');
const usersRouter = require('./resources/users/users.router');
const boardsRouter = require('./resources/boards/boards.router');
const messagesSocketController = require('./resources/messages/messages.controller');
const jwt = require('express-jwt');
const dotenv = require('dotenv');
const mongo = require('./config/mongo');

dotenv.config();
const app = express();

const server = http.Server(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.disable('x-powered-by');

app.use('/', authRouter);
app.use('/api/pins', pinsRouter);
app.use('/api/users', usersRouter);
app.use('/api/boards', boardsRouter);
app.use('/healthcheck', (req, res) => {
  console.log('GET healthcheck!');
  return res.status(200).json({ message: 'OK' });
});

app.get(
  '/protected',
  jwt({ secret: process.env.TOKEN_SECRET, algorithms: ['HS256'] }),
  (req, res) => {
    res.send('protected');
  }
);

app.post('/messageChain', messagesSocketController.startChain);

const start = async () => {
  try {
    io.on('connection', (socket) => {
      // Your listener
      console.log('message recieved');
      messagesSocketController.parseMessage(socket, io);
    });
    server.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  start,
  app,
};
