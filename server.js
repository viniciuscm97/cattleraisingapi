import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { connectDataBase } from './src/config/database.js';
import { indexRouter } from './src/infra/routes/index.js';
import swaggerSpec from './src/infra/swagger/swaggerJsDoc.js';
import { ErrorMiddleware } from './src/middlewares/error.middleware.js';
import { rateLimiter } from './src/middlewares/rateLimit.middleware.js';
const app = express();

app.use(rateLimiter);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(indexRouter)
app.use(ErrorMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const port = process.env.PORT || 3000;

app.listen(port, async () => {
    try {
        await connectDataBase();
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
    }
});
