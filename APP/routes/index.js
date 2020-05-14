'use strict'

const express = require('express')
const administradorCtrl = require('../controllers/administrador')
const itemCtrl = require('../controllers/items')
const ticketCtrl = require('../controllers/ticket')
const userCtrl = require('../controllers/user')
const workerCtrl = require('../controllers/worker')
const auth = require('../middlewares/auth')
const api = express.Router()

//Rutas de Administrador
api.get('/administrador/:email', administradorCtrl.getAdministrador)
api.post('/administrador/signup', administradorCtrl.signUpA)
api.post('/administrador/signin', administradorCtrl.signInA)

//Rutas de Usuario
api.get('/user/:email', userCtrl.getUser)
api.post('/user/signup', userCtrl.signUpU)
api.post('/user/signin', userCtrl.signInU)

//Rutas de Trabajador
api.get('/worker/:email', workerCtrl.getWorker)
api.post('/worker/signup', workerCtrl.signUpW)
api.post('/worker/signin', workerCtrl.signInW)

//Rutas de Ticket
api.get('/ticket/worker/:isworker', auth, ticketCtrl.getWorkerTickets)
api.get('/ticket/user/:isuser', auth, ticketCtrl.getUserTickets)
api.get('/ticket/id/:ticketId', auth, ticketCtrl.getTicket)
api.get('/ticket/tickets', auth, ticketCtrl.getAllTickets)
api.post('/ticket', auth, ticketCtrl.createTicket)
api.put('/ticket/:ticketId', auth, ticketCtrl.updateTicket)

//Rutas de Item
api.get('/item/ticket/:ticket', auth, itemCtrl.getTicketItems)
api.get('/item/id/:itemId', auth, itemCtrl.getItem)
api.post('/item', auth, itemCtrl.createItem)
api.put('/item/:itemId', auth, itemCtrl.updateItem)

module.exports = api



/* 'use strict'

const express = require('express')
const administradorCtrl = require('../controllers/ticket')
const userCtrl = require('../controllers/ticket')
const workerCtrl = require('../controllers/ticket')
const ticketCtrl = require('../controllers/ticket')
const itemCtrl = require('../controllers/ticket')

const api = express.Router()
//rutas administador
api.get('/administrador/:email', auth, administradorCtrl.getAdministrador)
api.post('/administrador/signup', auth, administradorCtrl.signUpA)
api.post('/administrador/signin', administradorCtrl.signInA)

//rutas usuario
api.get('/user/:email', auth, userCtrl.getUser)
api.post('/user/signup', auth, userCtrl.getUser.signUpU)
api.post('/user/signin', userCtrl.getUser.singInA)

//rutas Trabajador
api.get('/worker/:email', auth, workerCtrl.getWorker)
api.post('/worker/signup', auth, workerCtrl.getWorker.signUpW)
api.post('/worker/signin', workerCtrl.getWorker.singInW)

//rutas ticket
api.get('/ticket/worker/:isworker', auth, ticketCtrl.getWorkerTickets)
api.get('/ticket/user/:isuser', auth, ticketCtrl.getUserTickets)
api.get('/ticket/id/:TicketId', auth, ticketCtrl.getTickets)
api.post('/ticket/worke/:isworkwr', auth, ticketCtrl.getworkwrTickets)

api.get('/report/user/:isuser', reportCtrl.getUserReports)
api.get('/report/id/:reportId', reportCtrl.getReport)
api.get('/report/reports', reportCtrl.getAllReports)
api.post('/report', reportCtrl.createReport)
api.put('/report/:reportId', reportCtrl.updateReport)
api.get('/user/:email', userCtrl.getUser)
api.post('/user/signup', userCtrl.signUp)
api.post('/user/signin', userCtrl.signIn)
api.get('/driver/:email', driverCtrl.getDriver)
api.post('/driver/signup', driverCtrl.signUpD)
api.post('/driver/signin', driverCtrl.signInD)

module.exports = api */