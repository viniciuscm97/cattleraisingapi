import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import { connectDataBase } from './config/database';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { rateLimiter } from './middlewares/rateLimit.middleware';
const app = express();

app.use(rateLimiter);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(ErrorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    try {
        await connectDataBase();
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
    }
});
