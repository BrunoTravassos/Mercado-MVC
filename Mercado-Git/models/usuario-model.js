const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const Usuarios = mongoose.model('usuarios', {
  nome:  String,
  email: String,
  eAdim: {
    type: Number,
    default: 0
    },
    senha:String
   });
  
module.exports = Usuarios; 