const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
require('dotenv').config();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Correct route path
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/quote', require('./routes/quoteRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/careers', require('./routes/careerRoutes'));


app.get('/', (req, res) => {
  res.send('Welcome to the Express');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
