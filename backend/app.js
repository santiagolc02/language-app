const express = require('express');
const cors = require('cors')
const app = express();

require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

const wordRoutes = require('./routes/wordRoutes');
const languageRoutes = require('./routes/languageRoutes');
const lectureRoutes = require('./routes/lectureRoutes');
const enumRoutes = require('./routes/enumRoutes');

//Main endpoints
app.use('/words', wordRoutes);
app.use('/languages', languageRoutes);
app.use('/lectures', lectureRoutes);
app.use('/enum', enumRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
