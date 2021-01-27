const boardsModel = require('./boards.model');
const pinsModel = require('../pins/pins.model');

const getAll = async (req, res) => {
  const boards = await boardsModel.all();
  return res.status(200).json(boards);
};

const getOne = async (req, res) => {
  const board = await boardsModel.get(req.params.id);
  if (board) {
    return res.status(200).json(board);
  }
  return res.status(404).end();
};

const getPinsOfBoard = async (req, res) => {
  const pins = await pinsModel.search({
    boards: { $elemMatch: { $eq: req.params.id } },
  });
  return res.status(200).json(pins);
};

const create = (req, res) => {
  const newBoard = req.body;
  const boardsUpdated = boardsModel.create(newBoard);
  return res.status(201).json(boardsUpdated);
};

const update = async (req, res) => {
  const updatedBoard = req.body;
  const boardsUpdated = await boardsModel.update(req.params.id, updatedBoard);
  return res.status(200).json(boardsUpdated);
};

const remove = (req, res) => {
  boardsModel.delete(req.params.id);
  return res.status(200).json({ message: 'Board deleted' });
};

module.exports = {
  create,
  update,
  getAll,
  getOne,
  remove,
  getPinsOfBoard,
};
