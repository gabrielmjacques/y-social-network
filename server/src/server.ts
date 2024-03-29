import express from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/user", userRoutes);
server.use("/api/post", postRoutes);

server.get('/', (req, res) => {
    res.send('Hello world');
});

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});