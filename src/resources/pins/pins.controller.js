const pinsModel = require('./pins.model');

const getAll = async (req, res) => {
  const pins = await pinsModel.all();
  return res.status(200).json(pins);
};

const getOne = async (req, res) => {
  const pin = await pinsModel.get(req.params.id);
  if (pin) {
    return res.status(200).json(pin);
  }
  return res.status(404).end();
};

const create = (req, res) => {
  const newPin = req.body;
  const pinsUpdated = pinsModel.create(newPin);
  return res.status(201).json(pinsUpdated);
};

const update = async (req, res) => {
  const updatedPin = req.body;
  const pinsUpdated = await pinsModel.update(req.params.id, updatedPin);
  return res.status(200).json(pinsUpdated);
};

const remove = (req, res) => {
  pinsModel.removeOne(req.params.id);
  return res.status(200).json({ message: 'Pin deleted' });
};

module.exports = {
  create,
  update,
  getAll,
  getOne,
  remove,
};
