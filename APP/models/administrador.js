'use strict' //tipo de notacion
const mongoose = require('mongosse')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const AdminSchema = new Schema ({
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

AdminSchema.pre('save', function (next) {
let administrador = this
if (!administrador.isModified('password'))return next()

bcrypt.genSalt(10, (err, salt) => {
if (err) return next(err)

bcrypt.hash(administrador.password, salt, null, (err, hash) => {
if (err) return next(err)

administrador.password = hash
next()
})
})
})

AdminSchema.methods.gravatar = function (size) {
if (!size) {
size = 200;
}
if (!this.email) return `https:/gravatar.com/avatar/?s${size}&d=retro`
const md5 = crypto.createHash('md5').update(this.email).digest('hex')
return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
}

AdminSchema.methods.comparePassword = function (candidatePassword, cb) {
bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
cb(err, isMatch)
});
}

module.exports = mongoose.model('Administrador', AdminSchema)









