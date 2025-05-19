import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import goalRoutes from './routes/goalRoutes.js'
import foodDrinkRoutes from './routes/foodDrinkRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js';
import groupRoutes from './routes/groupRoutes.js';

//Session checker
import sessionChecker from './middleware/sessionChecker.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true,
};

app.use((req, res, next) => {
  console.log('→', req.method, req.path);
  next();
});

app.use(cors(corsOptions));
app.use(express.json());

app.use(cookieParser());

app.use('/api/auth', authRoutes);


app.use('/api/exercise', sessionChecker, exerciseRoutes);
app.use('/api/profile',  sessionChecker, profileRoutes);
app.use('/api/fooddrink', sessionChecker, foodDrinkRoutes);
app.use('/api/dashboard', sessionChecker, dashboardRoutes);
app.use('/api/group', sessionChecker, groupRoutes);
app.use('/api/goal', sessionChecker, goalRoutes);

app.get('/favicon.ico', (req, res) => res.status(204)); 

app.get('/ping', (req, res) => res.json({ pong: true }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("[Server Error]", err.stack);
  res.status(500).json({ error: "Internal server error" });
});