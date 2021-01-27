const mongoose = require('mongoose');

const pinModelSchema = mongoose.Schema({
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BoardModel',
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  source: mongoose.Schema.Types.String,
  urlImage: mongoose.Schema.Types.String,
  name: mongoose.Schema.Types.String,
  description: mongoose.Schema.Types.String,
});

const Pin = mongoose.model('PinModel', pinModelSchema);

const create = async (pin) => {
  return await Pin.create(pin);
};

const all = async () => {
  return await Pin.find();
};

const getOne = async (id) => {
  return await Pin.findOneById(id);
};

const search = async (query) => {
  return await Pin.find(query);
};

const update = async (id, updatedPin) => {
  return await Pin.updateOne({ _id: id }, updatedPin);
};

const removeOne = async (id) => {
  return await Pin.remove({ _id: id });
};

module.exports = {
  create,
  all,
  search,
  update,
  removeOne,
};
