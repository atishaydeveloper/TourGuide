require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const heritageSitesRouter = require('./routes/heritageSites');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/api/heritage-sites', heritageSitesRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});