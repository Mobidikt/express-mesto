const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const createUser = (req, res) => {
  console.log(req.body);
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  // const { name, about, avatar } = req.body;
  // try {
  //   const user = await User.create({ name, about, avatar });
  //   res.status(200).send(user);
  // } catch (err) {
  //   res.status(400).send(err);
  // }
};

module.exports = { getUsers, getUser, createUser };
