var express = require('express');
var router = express.Router();
var models = require('../models')
var wrap = require('../wrap')
const { v4: uuid } = require('uuid');
var payitError = require('../exception/PayitError')

const User = models.user
const Reservation = models.reservation
const Classroom = models.classroom

router.get('/', wrap(async function(req, res) {
    
    const classrooms = await Classroom.findAll()
    return res.send(classrooms)
}));

module.exports = router;
