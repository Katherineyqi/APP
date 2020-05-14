'use strict'

const Administrador = require('../models/administrador')
const service = require('../services')

const signUpA = (req, res) => {
  const administrador = new Administrador({
    email: req.body.email,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cedula: req.body.cedula,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    password: req.body.password
  })

  administrador.avatar = administrador.gravatar();

  administrador.save(err => {
    if (err) return res.status(500).send({ msg: `Error al crear administrador: ${err}` })
    return res.status(200).send({ token: service.createToken(administrador) })
  })
}

const signInA = (req, res) => {
  Administrador.findOne({ email: req.body.email }, (err, administrador) => {
    if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
    if (!administrador) return res.status(404).send({ msg: `no existe el administrador: ${req.body.email}` })

    return administrador.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })

      req.administrador = administrador
      return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(administrador) })
    });

  }).select('_id email +password');
}


function getAdministrador (req, res) {

    let email = req.params.email

    Administrador.find({email: email}, (err, administrador) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if(Object.keys(administrador).length === 0) return res.status(404).send({message: `No existe administrador`})

      res.status(200).send({administrador})
    })
}

module.exports = {
  signUpA,
  signInA,
  getAdministrador
}

