const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index.js');

// const path = require('path');
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

app.use((req, res, next) => {
  req.user = { _id: '5fa41805d8f2932594af3049' };
  next();
});
app.use(routes);


// app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`server port ${PORT}`));
