'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TicketSchema = Schema ({
    area: String,
    isuser: String,
    isworker: String,
    lat_origen: String,
    lng_origen: String,
    lat_destino: String,
    lng_destino: String,
    estado: String,
    fecha: String,
    hora: String,
    calificacion: Number,
    comentarios: String,
    precio:Number,

})

module.exports = mongoose.model('Ticket',TicketSchema)