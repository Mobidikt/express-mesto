const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};
// const getUser = (req, res) => {
//   console.log(req.params.userId);
//   User.findOne({ id: req.params.userId })
//     .then((user) => {
//       console.log(user);
//       if (!user) {
//         return res.status(404).send({ message: 'Нет пользователя с таким id' });
//       }
//       return res.status(200).send({ data: user });
//     })
//     .catch((error) => {
//       if (error.name === 'CastError') {
//         return res.status(400).send({ message: 'Переданы некорректные данные' });
//       }
//       return res.status(500).send({ message: `Внутренняя ошибка сервера ${error}` });
//     });
// };

const getUser = async (req, res) => {
  console.log(req.params.userId);
  try {
    const user = await User.findById(req.params.userId);
    console.log(user);
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    return res.status(200).send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(500).send({ message: 'Переданы некорректные данные' });
    }
    return res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

// const updateUser = async (req, res) {
//   try {

//   } catch (err) {

//   }
// };

// const updateUserAvatar = async (req, res) {
//  try {
//     const { avatar } = req.body;
//     const newAvatar = await User.findByIdAndUpdate(req.user._id, { avatar }, {
//       new: true,
//       runValidators: true,
//     } );
//     return res.status(200).send(newAvatar);
//   } catch (err) {

//   }
// };

module.exports = {
  getUsers,
  getUser,
  createUser,
  // updateUser,
  // updateUserAvatar,
};
