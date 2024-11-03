// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');


router.get('/', languageController.getLanguagesController);

module.exports = router;
