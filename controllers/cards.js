const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (err) {
    return res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Неверная ссылка' });
    }
    return res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.cardId).orFail();
    return res.status(200).send({ message: 'Карточка удалена' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    } if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Нет карточки с таким id' });
    } return res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const likeCard = async (req, res) => {
  try {
    const likes = await Card.findByIdAndUpdate(req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true })
      .orFail();
    return res.status(200).send({ data: likes });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    } if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Нет карточки с таким id' });
    }
    return res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const likes = await Card.findByIdAndUpdate(req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }).orFail();
    return res.status(200).send({ data: likes });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    } if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Нет карточки с таким id' });
    }
    return res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
