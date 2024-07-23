// import dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');
// this wil resolve the path for the debugger
require("dotenv").config({ path : path.resolve(__dirname, '.env') });


const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

// routers
const strainRoutes = require('./routes/strains');
const dispensaryRoutes = require('./routes/dispensaries')

app = express();

app.use(express.json({type: "application/json"}));

app.use(cors({
  origin: 'http://localhost:4200'
}));

// database connection
mongoose.set("strictQuery", false);

const url = `${process.env.DB_CONNECTION}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// routes
app.use('/strains', strainRoutes);
app.use('/dispensaries', dispensaryRoutes);

// server
app.listen(PORT, async () => {
  //  Connect to MongoDB
  try {
      await mongoose.connect(url)
      console.log("MONGO DB Connected:");
      console.log("===============================");
      console.log("Greetings Earthlings, Listening on port:", PORT);
  } catch (err) {
      console.error(err);
  }
});