const mongoose = require('mongoose');
// Define model schema
const messageChainSchema = mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
    },
  ],
});

// Define model schema
const messageSchema = mongoose.Schema({
  messageChain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'messageChainModel',
  },
  message: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
});

// Compile model from schema
const MessageChain = mongoose.model('MessageChainModel', messageChainSchema);
const MessageModel = mongoose.model('MessageModel', messageSchema);

const create = (message) => {
  Message.create(message, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created Docs : ', docs);
    }
  });
};

const createChain = async (chain) => {
  return await MessageChain.create(messageChain);
};

const get = async (id) => {
  let query = { _id: id };
  return await Message.findOne(query);
};

const allByChain = async (chainId) => {
  return await Message.find({ messageChain: chainId });
};

module.exports = {
  create,
  createChain,
  get,
  allByChain,
};
