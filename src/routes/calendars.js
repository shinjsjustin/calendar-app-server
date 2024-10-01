const express = require('express');
const router = express.Router();
const { createCalendar, getUserCalendars } = require('../controllers/calendars');
const isAuth = require('../middleware/isAuth')

router.post('/', isAuth, createCalendar);

router.get('/:id', isAuth, getUserCalendars)

module.exports = router;