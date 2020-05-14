'use strict'

const User = require('../models/user')
const service = require('../services')

const signUpU = (req, res) => {
  const user = new User({
    email: req.body.email,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cedula: req.body.cedula,
    telefono: req.body.telefono,
    password: req.body.password
  })

  user.avatar = user.gravatar();

  user.save(err => {
    if (err) return res.status(500).send({ msg: `Error al crear usuario: ${err}` })
    return res.status(200).send({ token: service.createToken(user) })
  })
}

const signInU = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
    if (!user) return res.status(404).send({ msg: `no existe el usuario: ${req.body.email}` })

    return user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })

      req.user = user
      return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
    });

  }).select('_id email +password');
}


function  getUser (req, res) {

    let email = req.params.email

    User.find({email: email}, (err, user) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if(Object.keys(user).length === 0) return res.status(404).send({message: `No existe Usuario`})

      res.status(200).send({user})
    })
}

module.exports = {
  signUpU,
  signInU,
  getUser
}