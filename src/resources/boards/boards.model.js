const mongoose = require('mongoose');

// Define model schema
const boardModelSchema = mongoose.Schema({
  id: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  title: String,
  collaborators: [],
});

// Compile model from schema
const Board = mongoose.model('BoardModel', boardModelSchema);

const create = (board) => {
  Board.create(board, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created Docs : ', docs);
    }
  });
};

const get = async (id) => {
  let query = { _id: id };
  return await Board.findOne(query).populate('author');
};

const all = async () => {
  return await Board.find().populate('author', 'username');
};

const remove = (id) => {
  let query = { _id: id };
  Board.deleteOne(query, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted Doc : ', docs);
    }
  });
};

const update = (id, updatedboard) => {
  let query = { _id: id };
  Board.updateOne(query, updatedboard, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Updated Docs : ', docs);
    }
  });
};

module.exports = {
  create,
  update,
  remove,
  get,
  all,
};
