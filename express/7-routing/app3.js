import express from 'express';
import userRouter from './routes/user.js';
import postRouter from './routes/post.js';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(8080);
