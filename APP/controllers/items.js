'use strict'

const Item = require('../models/items')

//Funcion para obtener datos en función del trabajador
function  getTicketItems (req, res) {

    let ticket = req.params.ticket

    Ticket.find({ticket: ticket}, (err, items) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if(Object.keys(items).length === 0) return res.status(404).send({message: `No existen items`})

      res.status(200).send({items})
    })
}



//Funcion para obtener ticket en función de su Id
function  getItem (req, res) {

    let itemId = req.params.itemId

    Ticket.findById(ticketId, (err, item) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if(Object.keys(ticket).length === 0) return res.status(404).send({message: `No existen items`})

      res.status(200).send({items: [item]})
    })
    
}


//Funcion para crear nuevo ticket en base de datos
function createItem (req, res) {

    console.log('POST /api/items')
    console.log(req.body)

    let item = new Item()
    item.ticket = req.body.ticket
    item.nombre = req.body.nombre
    item.precio = req.body.precio
    

    item.save((err, itemStored) => {
      if (err) res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})

      res.status(200).send({ticket: itemStored})
    })
}

//Funcion para actualizar información en base de datos
function updateitem (req, res) {

    let itemId = req.params.itemId
    let update = req.body

    Ticket.findByIdAndUpdate(itemId, update, (err, itemUpdated) => {
      if (err) res.status(500).send({message: `Error al actualizar ticket: ${err}`})

      res.status(200).send({ item: itemUpdated })
    })
}

module.exports = {
  
  getTicketItems,
  getItem,
  createItem,
  updateitem
}