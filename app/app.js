import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get('/favicon.ico', (req, res) => res.status(204)); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use((req, res) => {
  res.status(400).send("Welcome to the backend!");
});
