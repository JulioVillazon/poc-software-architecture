var express = require('express');
var router = express.Router();
var models = require('../models')
var wrap = require('../wrap')
const { v4: uuid } = require('uuid');
var payitError = require('../exception/PayitError')

const User = models.user
const Reservation = models.reservation
const Classroom = models.classroom

const mapReservations = async (reservations) => {
  const room = await Classroom.getById(reservations.classroom_id)  
  return {
    classroom: room.name + ' (' + room.location + ')',
    date: reservations.start_date.toLocaleDateString(),
    start_time: reservations.start_date.toLocaleTimeString(),
    end_time: reservations.end_date.toLocaleTimeString(),
    description: reservations.description,
    properties: room.properties
  }
}

router.post('/', wrap(async function(req, res) {
    const { user_id, classroom_id, start_date, end_date, description } = req.body

    if (!user_id || !classroom_id || !start_date || !end_date) {
        throw payitError('MISSING_PARAMS', 400, 'MISSING_PARAMS')    
    }
    
    const user = await User.getById(user_id)
  
    if(!user) {
      throw payitError('USER_NOT_FOUND', 400, 'USER_NOT_FOUND')    
    }

    const booking = await Reservation.create({ user_id, classroom_id, start_date, end_date, description})

    return res.send(booking)
}));

router.get('/:user_id', wrap(async function(req, res) {
    const { user_id } = req.params
    if (!user_id) {
      throw payitError('MISSING_PARAMS', 400, 'MISSING_PARAMS')    
    }
  
    const user = await User.getById(user_id)
  
    if(!user) {
      throw payitError('USER_NOT_FOUND', 400, 'USER_NOT_FOUND')    
    }

    const bookings = await Reservation.getByUserId(user_id).map(mapReservations)
  
    return res.send(bookings)
}));

router.delete('/:reservation_id', wrap(async function(req, res) {
    const { reservation_id } = req.params
    if (!reservation_id) {
        throw payitError('MISSING_PARAMS', 400, 'MISSING_PARAMS')    
    }

    const booking = await Reservation.getById(reservation_id)

    if(!booking) {
        throw payitError('RESERVATION_NOT_FOUND', 400, 'RESERVATION_NOT_FOUND')    
    }

    booking.status = 'DELETED'
    booking.save()

    return res.send(booking)
}));

module.exports = router;
