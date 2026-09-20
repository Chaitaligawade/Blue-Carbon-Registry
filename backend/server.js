import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary';
import connectMongoDB from './config/mongodb.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

const app = express();

await connectMongoDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send("Api working")
})

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})