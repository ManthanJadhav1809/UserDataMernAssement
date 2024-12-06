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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// CORS
app.use(
  cors({
    origin: "https://user-data-mern-assement-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin",adminRoutes);

app.use((req, res, next) => {
  console.log("Request Method:", req.method);
  console.log("Request Origin:", req.headers.origin);
  console.log("Request Headers:", req.headers);
  next();
});

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
