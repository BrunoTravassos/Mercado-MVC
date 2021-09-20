const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bdCon = require(".db_connection");
const Usuarios = require("../models/usuario-model");

module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: 'email', passwordField:'senha' }, (email, senha, done) => {
        Usuarios.findOne({ email: email }).then((usuario) => {
            
             console.log(email);
            if (!usuario) {
                console.log(usuario)
                return done(null, false,{message:"Esta conta não existe"})
            } else if(senha == usuario.senha) {
                return done(null,usuario)
            } else {
                
                console.log(senha);
                console.log(usuario.senha);
                return done(null, false, {message:"Senha incorreta"})
            }
        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })
    passport.deserializeUser((id, done) => {
        Usuarios.findById(id, (err, usuario) => {
            done(err,usuario)
        })
    })
}