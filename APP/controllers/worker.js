'use strict'

const Worker = require('../models/worker')
const service = require('../services')

const signUpW = (req, res) => {
  const worker = new Worker({
    email: req.body.email,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cedula: req.body.cedula,
    telefono: req.body.telefono,
    password: req.body.password
  })

  worker.avatar = worker.gravatar();

  worker.save(err => {
    if (err) return res.status(500).send({ msg: `Error al crear usuario: ${err}` })
    return res.status(200).send({ token: service.createToken(user) })
  })
}

const signInW = (req, res) => {
  Worker.findOne({ email: req.body.email }, (err, worker) => {
    if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
    if (!worker) return res.status(404).send({ msg: `no existe el usuario: ${req.body.email}` })

    return worker.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })

      req.worker = worker
      return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(worker) })
    });

  }).select('_id email +password');
}


function  getWorker (req, res) {

    let email = req.params.email

    User.find({email: email}, (err, worker) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if(Object.keys(worker).length === 0) return res.status(404).send({message: `No existe Usuario`})

      res.status(200).send({worker})
    })
}

module.exports = {
  signUpW,
  signInW,
  getWorker
}