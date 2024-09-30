const express = require('express');
const router = express.Router();
const { testAPI, createUser, getUserById, checkEmail, getUserByLogin } = require('../controllers/users');

router.post('/', createUser);

router.get('/', getUserByLogin);

router.get('/test', testAPI)

router.get('/check_email/:email', checkEmail)

router.get('/:id', getUserById);

module.exports = router;