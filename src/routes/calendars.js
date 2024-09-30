const express = require('express');
const router = express.Router();
const { createCalendar, getUserCalendars } = require('../controllers/calendars');

router.post('/', createCalendar);

router.get('/:id', getUserCalendars)

module.exports = router;