const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const plotRoutes = require('./routes/plotRoutes');
const leadRoutes = require('./routes/leadRoutes');
const soldRoutes = require('./routes/soldRoutes');

app.use('/api/plots', plotRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/sold', soldRoutes);

app.get('/', (req, res) => {
  res.send('GreenField API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await db.query('SELECT 1');
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
});
