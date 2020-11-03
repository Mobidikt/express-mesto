const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index.js');

const { PORT = 3000 } = process.env;
const app = express();

const mongoDbUrl = 'mongodb://localhost:27017/mestodb';
const mongoConnectOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(mongoDbUrl, mongoConnectOptions)
  .then(() => {
    console.log('База данных подключена');
  })
  .catch((err) => {
    console.log(`Ошибка при подключении базы данных: ${err}`);
  });

// app.use((req, res, next) => {
//   req.user = { _id: 'dbfe53c3c4d568240378b0c6' };

//   next();
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.listen(PORT, () => console.log(`server port ${PORT}`));
