const messagesModel = require('./messages.model');

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const LOAD_MESSAGES_EVENT = 'loadMessage';

const startChain = (req, res) => {
  const messageChain = messagesModel.create(req.body);
  return res.status(201).json(messageChain);
};

const parseMessage = (socket, io) => {
  // Join a conversation
  const { messageChainId } = socket.handshake.query;
  socket.join(messageChainId);

  socket.on(LOAD_MESSAGES_EVENT, (data) => {
    const messages = messagesModel.allByChain(messageChainId);
    messages.map((message) =>
      io.in(messageChainId).emit(NEW_CHAT_MESSAGE_EVENT, message.message)
    );
  });

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(messageChainId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    socket.leave(messageChainId);
  });
};

module.exports = {
  startChain,
  parseMessage,
};
