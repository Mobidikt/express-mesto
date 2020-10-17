const path = require('path');
const readFile = require('../utils/read-file.js');

const dataCards = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  readFile(dataCards)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = { getCards };
