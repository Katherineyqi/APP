'use strict'

const Ticket = require('../models/ticket')

//Funcion para obtener datos en función del trabajador
function  getWorkerTickets (req, res) {

    let isworker = req.params.isworker

    Ticket.find({isworker: isworker}, (err, tickets) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if(Object.keys(tickets).length === 0) return res.status(404).send({message: `No existen tickets`})

      res.status(200).send({tickets})
    })
}

//Funcion para obtener datos en función del usuario
function  getUserTickets (req, res) {

    let isuser = req.params.isuser

    Ticket.find({isuser: isuser}, (err, tickets) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if(Object.keys(tickets).length === 0) return res.status(404).send({message: `No existen tickets`})

      res.status(200).send({tickets})
    })
}

//Funcion para obtener ticket en función de su Id
function  getTicket (req, res) {

    let ticketId = req.params.ticketId

    Ticket.findById(ticketId, (err, ticket) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if(Object.keys(ticket).length === 0) return res.status(404).send({message: `No existen tickets`})

      res.status(200).send({tickets: [ticket]})
    })
    
}

//Funcion para obtener todos los tickets
function getAllTickets (req, res) {

  Ticket.find({}, (err, tickets) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!tickets) return res.status(404).send({message: `No existen tickets`})

    res.status(200).send({tickets})
  })

}

//Funcion para crear nuevo ticket en base de datos
function createTicket (req, res) {

    console.log('POST /api/ticket')
    console.log(req.body)

    let ticket = new Ticket()
    ticket.area = req.body.area
    ticket.isuser = req.body.isuser
    ticket.isworker = req.body.isworker
    ticket.lat_origen = req.body.lat_origen
    ticket.lng_origen = req.body.lng_origen
    ticket.lat_destino = req.body.lat_destino
    ticket.lng_destino = req.body.lng_destino
    ticket.estado = req.body.estado
    ticket.fecha = Date.now()
    ticket.hora = req.body.hora
    ticket.calificacion = req.body.calificacion
    ticket.comentario = req.body.comentario
    ticket.precio = req.body.precio

    ticket.save((err, ticketStored) => {
      if (err) res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})

      res.status(200).send({ticket: ticketStored})
    })
}

//Funcion para actualizar información en base de datos
function updateTicket (req, res) {

    let ticketId = req.params.ticketId
    let update = req.body

    Ticket.findByIdAndUpdate(ticketId, update, (err, ticketUpdated) => {
      if (err) res.status(500).send({message: `Error al actualizar ticket: ${err}`})

      res.status(200).send({ ticket: ticketUpdated })
    })
}

module.exports = {
  getWorkerTickets,
  getUserTickets,
  getTicket,
  getAllTickets,
  createTicket,
  updateTicket
}