import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import imageRoutes from './routes/imageRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin : "https://tt-img.onrender.com",
  methods : ['POST','GET']
}));
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/images', imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
