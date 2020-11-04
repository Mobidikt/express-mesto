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
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail()
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    })
    .then((likes) => res.send({ data: likes }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail()
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    })
    .then((likes) => res.send({ data: likes }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
