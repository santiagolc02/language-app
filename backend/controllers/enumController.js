// controllers/userController.js
const {
  getGendersQuery,
  getLevelsQuery,
  getMasteriesQuery,
  getWordTypesQuery,
} = require('../models/enumsModel');

const getGendersController = async (req, res) => {
  try {
    const genders = await getGendersQuery();
    res.json(genders.map(gender => gender));
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

const getLevelsController = async (req, res) => {
  try {
    const levels = await getLevelsQuery();
    res.json(levels.map(level => level));
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

const getMasteriesController = async (req, res) => {
  try {
    const masteries = await getMasteriesQuery();
    res.json(masteries.map(mastery => mastery));
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

const getWordTypesController = async (req, res) => {
  try {
    const wordTypes = await getWordTypesQuery();
    res.json(wordTypes.map(wordType => wordType));
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

module.exports = {
  getGendersController,
  getLevelsController,
  getMasteriesController,
  getWordTypesController,
};


// // controllers/userController.js
// const { getGendersQuery, getLevelsQuery, getMasteriesQuery, getWordTypesQuery } = require('../models/enumsModel');

// const getGendersController = async (req, res) => {
//   try {
//     const genders = await getGendersQuery();
//     res.json(genders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };

// const getLevelsController = async (req, res) => {
//   try {
//     const levels = await getLevelsQuery();
//     res.json(levels);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };

// const getMasteriesController = async (req, res) => {
//   try {
//     const masteries = await getMasteriesQuery();
//     res.json(masteries);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };

// const getWordTypesController = async (req, res) => {
//   try {
//     const wordTypes = await getWordTypesQuery();
//     res.json(wordTypes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };

// module.exports = { getGendersController, getLevelsController, getMasteriesController, getWordTypesController };
