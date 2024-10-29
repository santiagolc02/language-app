const express = require('express');
const wordRoutes = require('./routes/wordRoutes');
const languagesRoutes = require('./routes/languageRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

app.use('/words', wordRoutes);
app.use('/languages', languagesRoutes)

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
