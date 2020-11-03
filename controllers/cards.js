const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createCard = (req, res, next) =>{
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .catch((err) => {
      throw new BadRequestError({ message: `${err.message}` });
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) =>{
  Card.findByIdAndDelete(req.params._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: CLIENT_ERROR.CARD_NOT_FOUND });
    })
    .then(() => res.send({ message: SUCCESS.REMOVE_CARD }))
    .catch(next);
};

module.exports = { getCards, createCard, deleteCard };
