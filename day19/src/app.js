import express from 'express';

const app = express();
app.use(express.json());

import authRouter from './routes/auth.route.js';
import handleError from './middlewares/error.middleware.js';

app.use('/api/user', authRouter);

app.use(handleError);

export default app;