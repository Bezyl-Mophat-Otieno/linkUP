import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from './config/db.js';
import userRouter from './routes/users/user.routes.js';
import productRouter from './routes/products/product.routes.js';
import postRouter from './routes/posts/post.routes.js';
import commentRouter from './routes/comments/comment.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || "5000";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/', (req, res) => {
    res.send('Server is running successfully');
});
app.listen(PORT, async () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    await dbConnection();
});
