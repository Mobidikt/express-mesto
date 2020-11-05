const { Schema, model } = require('mongoose').set('debug', true);

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    match: [/(https?|ftp|file):\/\/(www\.)?([-a-z0-9]+\.)([0-9a-z].*)/, 'введён некорректный URL'],
  },
}, { versionKey: false });

module.exports = model('user', userSchema);
