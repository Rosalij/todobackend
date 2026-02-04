require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE)
  .then(() => console.log("MongoDB database connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Use your routes
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});