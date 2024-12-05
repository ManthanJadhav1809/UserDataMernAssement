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

// Middleware
app.use(bodyParser.json());

const allowedOrigins = [
    "https://user-data-mern-assement-frontend-cl771fa34.vercel.app", // Your frontend URL
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // Allow credentials like cookies, authorization headers
    })
);

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin",adminRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Database Connection
mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((error) => console.error('Database connection error:', error));