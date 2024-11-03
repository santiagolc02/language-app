// routes/enumRoutes.js
const express = require('express');
const router = express.Router();
const enumController = require('../controllers/enumController');


router.get('/genders', enumController.getGendersController);
router.get('/levels', enumController.getLevelsController);
router.get('/masteries', enumController.getMasteriesController);
router.get('/wordTypes', enumController.getWordTypesController);

module.exports = router;
