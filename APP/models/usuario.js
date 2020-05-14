'use strict' //tipo de notacion
const mongoose = require('mongosse')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema ({
email: { type: String, unique: true, lowercase:true},
nombre: String,
apellido: String,
cedula: String,
direccion: String,
telefono: String,
avatar: String,
password: { type: String, select: false },
signupDate: { type: Date, default: Date.now() },
lastlogin: Date
})

UserSchema.pre('save', function (next) {
let usuario = this
if (!usuario.isModified('password'))return next()

bcrypt.genSalt(10, (err, salt) => {
if (err) return next(err)

bcrypt.hash(usuario.password, salt, null, (err, hash) => {
if (err) return next(err)

usuario.password = hash
next()
})
})
})

UserSchema.methods.gravatar = function (size) {
if (!size) {
size = 200;
}
if (!this.email) return `https:/gravatar.com/avatar/?s${size}&d=retro`
const md5 = crypto.createHash('md5').update(this.email).digest('hex')
return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
}

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
cb(err, isMatch)
});
}

module.exports = mongoose.model('Usuario', UserSchema)

