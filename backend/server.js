const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const adminRoutes= require("./routes/adminRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGOURL;


// app.use(cors());
app.use(
  cors({
    origin: "https://user-data-mern-assement-frontend.vercel.app", // Allow only your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    credentials: true, // Allow cookies or authorization headers
  })
);

app.options("*", cors());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin",adminRoutes);

// Middleware
app.use(bodyParser.json());

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Database Connection
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => console.error("Database connection error:", error));

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
