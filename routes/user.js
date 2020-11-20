var express = require('express');
var router = express.Router();
var models = require('../models')
var wrap = require('../wrap')
const { v4: uuid } = require('uuid');
var payitError = require('../exception/PayitError')

const User = models.user
const Reservation = models.reservation
const Classroom = models.classroom

router.post('/login', wrap(async function(req, res) {
  const { password, email } = req.body

  if (!password || !email) {
    throw payitError('MISSING_PARAMS', 400, 'MISSING_PARAMS')    
  }

  const user = await User.validateCredentials(password, email)

  if(!user) {
    throw payitError('INVALID_CREDENTIALS', 401, 'INVALID_CREDENTIALS')    
  }
  
  return res.send(user)
}));

module.exports = router;
