require('dotenv').config(); // Load environment variables from .env file only once
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/route/route');

const app = express();
// app.use(cors());
 // Enable CORS for all routes and origins
// const corsOptions = {
//   origin: 'http://localhost:3001',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));

app.use(express.json());

app.use(cors()); 
// Routing setup
app.use('/api', userRoutes);

// Define the port from environment variable or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
