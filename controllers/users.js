const path = require('path');
const readFile = require('../utils/read-file.js');

const dataUsers = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  readFile(dataUsers)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  readFile(dataUsers)
    .then((data) => {
      const userRes = data.find((user) => user._id === id);
      return userRes;
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports = { getUsers, getUser };
